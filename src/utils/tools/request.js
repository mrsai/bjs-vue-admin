// https://axios-http.com/zh/docs/api_intro

import axios from 'axios'
import { variate } from '@/utils/tools'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

// 生成唯一的请求标识
class AbortRequest {
  constructor() {
    this.pendingRequest = new Map()
  }
  generateRequestIdentify = (config) => {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
  }
  add(config) {
    const requestIdentify = this.generateRequestIdentify(config)
    const controller = new AbortController()
    config.signal = controller.signal
    if (this.pendingRequest.has(requestIdentify)) {
      this.pendingRequest.get(requestIdentify).abort()
      this.pendingRequest.delete(requestIdentify)
    } else {
      this.pendingRequest.set(requestIdentify, controller)
    }
  }

  remove(config) {
    const requestIdentify = this.generateRequestIdentify(config)
    this.pendingRequest.delete(requestIdentify)
  }

  getPendingRequest() {
    return this.pendingRequest
  }
}

// 处理 http 请求错误
const httpErrorMessage = (error) => {
  let message = ''
  switch (error.response?.status) {
    case 400:
      message = '客户端错误，请求格式或参数有误！'
      break
    case 403:
      message = '您没有访问该资源的权限！'
      break
    case 500:
      message = '服务器错误，请稍后再试！'
      break
    case 401:
      message = '您尚未登录，请登录！'
      break
    case 404:
      message = '服务器未找到您访问的资源！'
      break
    case 503:
      message = '服务器错误！'
      break
    default:
      message = error.message || '请求失败！'
      break
  }
  return message
}

// 服务返回的错误信息
const serverErrorMessage = {
  notMatched: '返回数据格式不符合预先约定！',
  default: '请求数据失败！'
}

//验证返回的数据格式是否符合要求
const verifyResponseFormat = (data = {}) => {
  return (
    variate.hasProperty(data, 'success') &&
    variate.hasProperty(data, 'data') &&
    variate.hasProperty(data, 'msg')
  )
}

export class Server {
  constructor(config) {
    this.errorInterceptors = []
    this.requestInterceptors = []
    this.responseInterceptors = []
    this.defaultRequestConfig = config
    this.axiosInstance = axios.create(this.defaultRequestConfig)
    this.requestInterceptor()
    this.responseInterceptor()
  }

  getInstance() {
    return this.axiosInstance
  }

  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor)
    return this
  }
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor)
    return this
  }
  addErrorInterceptor(interceptor) {
    this.errorInterceptors.push(interceptor)
    return this
  }

  requestInterceptor() {
    this.axiosInstance.interceptors.request.use((config) => {
      this.requestInterceptors.forEach(async (interceptor) => (config = interceptor(config)))
      return config
    })
  }

  responseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.responseInterceptors.forEach(async (interceptor) => (response = interceptor(response)))
        return response
      },
      (error) => {
        this.errorInterceptors.forEach(async (interceptor) => (error = interceptor(error)))
        return error
      }
    )
  }
}

// 创建实例
const server = new Server({
  baseURL: '',
  timeout: 1000 * 60
})
// 创建取消请求实例
const abortRequest = new AbortRequest()

// 增加请求拦截，添加 token
server.addRequestInterceptor((config) => {
  const { token } = useUserStore()
  config.headers && (config.headers['Authorization'] = `JWT ${token}`)
  abortRequest.add(config)
  return config
})

// 正常数据返回处理，如果上次发送的数据还没有返回，则取消上次请求。
server.addResponseInterceptor((response) => {
  abortRequest.remove(response.config)
  return response
})

// 返回约定的数据格式的验证
server.addResponseInterceptor((response) => {
  if (response.data && !verifyResponseFormat(response.data)) {
    throw new Error(serverErrorMessage.notMatched)
  }
  return response
})

// 处理业务失败的提示信息
server.addResponseInterceptor((response) => {
  if (response.data && !response.data.success) {
    ElMessage.error(response.data.msg || serverErrorMessage.default)
  }
  return response
})

// 错误处理
server.addErrorInterceptor((err) => {
  abortRequest.remove(err.config)
  ElMessage.error(httpErrorMessage(err))
  return err
})

// 返回实例
export const request = server.getInstance()
