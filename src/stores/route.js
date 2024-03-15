import { defineStore } from 'pinia'
import { ref } from 'vue'
import { deepClone } from '@/utils/tools'
import dynamicRoutes from '@/router/dynamic'
import { request } from '@/utils/tools/request'

export const useRouteStore = defineStore('routeStore', () => {
  const permission = ref(null)

  // keep-alive的缓存
  const routeCaches = new Set()

  // 所有的动态路由列表
  const routes = ref(deepClone(dynamicRoutes))

  // 可访问路由列表(未初始化为 null，初始化之后为 Array)
  const accessRoutes = ref(null)

  // 菜单列表
  const menus = ref(null)

  // 第一个有权限的路由地址
  const firstAccessibleRoute = ref({
    path: '/service/log/login',
  })

  function generateAccessRoutes() {
    menus.value = deepClone(dynamicRoutes)
    console.log(dynamicRoutes)
    // TODO:: 是否过滤掉不可访问的路由
    // TODO:: 将超过三级的路由，转化为三级的路由
    // TODO:: 将路由生成菜单
    // TODO:: 找到第一个可以访问的路由
    // TODO:: 为每一个路由查找redirect（如果有的话）
    // TODO:: 为每一个生成面包屑
    // TODO:: 收集需要缓存的页面
    // TODO:: 为每一个动态ID的路由生成 activePath
    return dynamicRoutes
  }

  function addCaches(routeName) {
    this.routeCaches.add(routeName)
  }
  function removeCaches(routeName) {
    this.routeCaches.delete(routeName)
  }
  function cleanCaches() {
    this.routeCaches.clear()
  }

  async function fetchPermission() {
    try {
      const resp = await request.get('/api/auth/')
      if (resp.data && resp.data.success) {
        permission.value = resp.data.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  function accessible(route) {
    return (
      !route.meta ||
      !route.meta.auth ||
      !route.meta.auth.access ||
      (route.meta && route.meta.auth && route.meta.auth.access.val === true)
    )
  }

  return {
    permission,
    routeCaches,
    accessRoutes,
    routes,
    menus,
    addCaches,
    removeCaches,
    cleanCaches,
    accessible,
    fetchPermission,
    generateAccessRoutes,
    firstAccessibleRoute
  }
})
