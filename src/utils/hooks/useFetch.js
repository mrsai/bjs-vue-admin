import { reactive } from 'vue'
import { request } from '@/utils/tools/request'

export function useFetch({ url, method = 'get', data = null }, delay) {
  const response = reactive({
    loading: false,
    success: false,
    data: null,
    message: ''
  })

  function fetchData() {
    response.loading = true
    return request({ url, method, data })
      .then((res) => {
        response.loading = false
        response.success = res.data.success
        response.data = res.data.data
        response.message = res.data.msg
        return res
      })
      .catch((err) => {
        response.loading = false
        response.success = false
        response.message = err.message
        return err
      })
  }

  if (!delay) {
    fetchData()
  }

  return { response, fetchData }
}
