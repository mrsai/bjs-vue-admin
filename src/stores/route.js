import { defineStore } from 'pinia'
import { ref } from 'vue'
import { deepClone } from '@/utils/tools'
import dynamicRoutes from '@/router/dynamic'
import { request } from '@/utils/tools/request'

export const useRouteStore = defineStore('routeStore', () => {
  // 用户的权限{path:auth}
  const permission = ref(null)

  // keep-alive的缓存
  const routeCaches = ref(null)

  // 所有的动态路由列表
  const routesRaw = ref(null)

  // 可访问路由列表(未初始化为 null，初始化之后为 Array)
  const accessRoutes = ref(null)

  // 菜单列表
  const menus = ref(null)

  // 第一个有权限的路由地址
  const firstAccessibleRoute = ref(null)

  /**
   * 初始化权限路由
   * 这一系列的函数执行顺序不可以改变，有些地方没有做深度拷贝
   * @returns
   */
  function generateAccessRoutes() {
    try {
      // 生成一份全量的路由权限的 tree 结构，为自定义角色分配权限的时候做处理
      routesRaw.value = deepClone(dynamicRoutes)

      // 把权限合并到路由上
      const routers = mergeAccessRouters(dynamicRoutes, permission.value)

      // 过滤掉无权限的路由地址，找到需要缓存的路由名字和第一个有权限访问的菜单
      const { accessRoutes, firstAccessible, cached } = filterNoAccessRouters(routers)
      accessRoutes.value = accessRoutes
      firstAccessibleRoute.value = firstAccessible
      routeCaches.value = cached
      // 生成菜单，可以延迟到组件中实现
      const t = setTimeout(() => {
        menus.value = generateMenusByAccessRouter(accessRoutes)
        clearTimeout(t)
      })
      return accessRoutes
    } catch (error) {
      console.log('generateAccessRoutes:', error)
    }

    // TODO:: 是否过滤掉不可访问的路由[done]
    // TODO:: 将路由生成菜单[done]
    // TODO:: 找到第一个可以访问的路由[done]
    // TODO:: 为每一个路由查找redirect（如果有的话）
    // TODO:: 收集需要缓存的页面[done]
    // TODO:: 为每一个动态ID的路由生成[done] activePath
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

  /**
   * 服务端的权限合并到路由地址上
   * @param {*} accessRoutes
   * @param {*} accessRoutes
   * @returns
   */
  function mergeAccessRouters(routers, permission) {
    const queue = [...routers]
    while (queue.length) {
      let node = queue.shift()
      if (node.meta && node.meta.auth) {
        // Object.assign(node.menus, permission.value[node.path])
        Object.assign(node.meta.auth, {})
      }

      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          queue.push(node.children[i])
        }
      }
    }
    return routers
  }

  /**
   * 根据有访问权限的路由，生成菜单，过滤掉不能在导航栏显示的菜单
   * @param {*} accessRoutes
   * @returns
   */
  function generateMenusByAccessRouter(routers) {
    let data = deepClone(routers)
    data = data.filter((it) => visiable(it))
    const queue = [...data]
    while (queue.length) {
      let node = queue.shift()
      if (node.children) {
        let newChildren = []
        for (let i = 0; i < node.children.length; i++) {
          let child = node.children[i]
          if (visiable(child)) {
            newChildren.push(child)
            queue.push(child)
          }
        }
        node.children = newChildren
      }
    }
    return data
  }

  /**
   * 根据动态路由，过滤掉无权限的路由
   * 同时找到第一个有权限的路由地址（登录之后默认跳转的路由）
   * 收集需要缓存的路由（给keep-alive的include来使用）
   * 为子路由添加对父路由的引用，方便面包屑的生成
   * 为动态路由添加 activePath 属性。可以解决如果包含参数的路由，刷新无法高亮当前菜单的问题
   * @param {*} routers
   * @returns
   */
  function filterNoAccessRouters(routers) {
    let firstAccessible = null
    let accessRoutes = [...routers]
    const cached = []

    filterNodesByAccess(accessRoutes)

    function filterNodesByAccess(data, parentRoute) {
      return data.filter((it) => {
        if (it.children) {
          it.children = filterNodesByAccess(it.children, it)
        }
        // 查找第一个具有权限的菜单
        if (
          !firstAccessible &&
          accessible(it) &&
          visiable(it) &&
          (!it.children || (it.children && !it.children.length))
        ) {
          firstAccessible = it
        }
        // 关联父路由
        if (parentRoute) {
          const { path, name, meta } = parentRoute
          it.meta.parentRoute = { path, name, meta }
        }

        // 收集 keepalive 缓存
        if (it.meta && it.meta.cache) {
          cached.push(it.name)
        }

        // 检查 path 是否为动态路由，如果是的话，则为其添加 activePath 属性
        if (it.path && it.path.includes(':')) {
          it.meta.activePath = it.path
        }
        return accessible(it)
      })
    }

    return {
      accessRoutes,
      firstAccessible,
      cached
    }
  }

  /**
   * 判断路由是否可访问
   * @param {*} route
   * @returns boolean
   */
  function accessible(route) {
    return !(
      route.meta &&
      route.meta.auth &&
      route.meta.auth.access &&
      route.meta.auth.access.val === false
    )
  }

  /**
   * 判断路由是否可见(是否在菜单中显示)
   * @param {*} route
   * @returns boolean
   */
  function visiable(route) {
    return !(route.meta && route.meta.invisible === true)
  }

  return {
    permission,
    routeCaches,
    accessRoutes,
    routesRaw,
    menus,
    accessible,
    fetchPermission,
    generateAccessRoutes,
    firstAccessibleRoute,
    mergeAccessRouters
  }
})
