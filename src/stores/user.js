import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/utils/tools/request'
import { storage } from '@/utils/tools/storage'

const useUserStore = defineStore(
  // 唯一ID
  'userStore',
  () => {
    const token = ref(storage.session.get('token') || '')
    const userInfo = ref()
    const isLogin = computed(() => !!token.value)

    // 登录
    async function login(data) {
      try {
        const resp = await request.post('/api/login', data)
        if (resp.data && resp.data.success) {
          token.value = resp.data.data.token
          storage.session.set('token', resp.data.data.token)
        }
        return resp
      } catch (error) {
        console.error(error)
      }
    }

    // 获取登录用户信息
    async function fetchUserInfo(data) {
      try {
        const resp = await request.get('/api/user/', data)
        if (resp.data && resp.data.success) {
          userInfo.value = resp.data.data
        }
      } catch (error) {
        console.error(error)
      }
    }

    // 登出
    async function logout() {
      try {
        await request.post('/api/logout')
        userInfo.value = null
        resetToken()
      } catch (error) {
        console.error(error)
      }
    }

    // 清理token
    function resetToken() {
      token.value = ''
      storage.session.remove('token')
    }

    return {
      userInfo,
      token,
      isLogin,
      login,
      logout,
      resetToken,
      fetchUserInfo
    }
  }
)

export { useUserStore }
