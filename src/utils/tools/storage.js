import { Profix } from '@/stores/constants'
import { variate } from './index'

export const storage = Object.create(null)

storage.session = Object.create(null)
storage.session.get = function (key) {
  const keys = Profix + key
  const value = sessionStorage.getItem(keys)
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

storage.session.set = function (key, value) {
  const keys = Profix + key
  if (variate.isArray(value) || variate.isObject(value)) {
    value = JSON.stringify(value)
  }
  return sessionStorage.setItem(keys, value)
}

storage.session.remove = function (key) {
  const keys = Profix + key
  return sessionStorage.removeItem(keys)
}

storage.session.clear = function () {
  return sessionStorage.clear()
}

storage.local = Object.create(null)
storage.local.get = function (key) {
  const keys = Profix + key
  const value = localStorage.getItem(keys)
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

storage.local.set = function (key, value) {
  const keys = Profix + key
  if (variate.isArray(value) || variate.isObject(value)) {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(keys, value)
}

storage.local.remove = function (key) {
  const keys = Profix + key
  return localStorage.removeItem(keys)
}

storage.local.clear = function () {
  return localStorage.clear()
}

storage.cookie = Object.create(null)
