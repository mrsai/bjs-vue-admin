import useUserStore from '@/store/user'

export function useAuth() {
  function hasPermission(permission) {
    const userStore = useUserStore()
    return userStore.permissions.includes(permission)
  }

  function auth(value) {
    let auth
    if (typeof value === 'string') {
      auth = value !== '' ? hasPermission(value) : true
    }
    else {
      auth = value.length > 0 ? value.some(item => hasPermission(item)) : true
    }
    return auth
  }

  function authAll(value) {
    return value.length > 0 ? value.every(item => hasPermission(item)) : true
  }

  return {
    auth,
    authAll,
  }
}