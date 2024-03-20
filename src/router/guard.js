/**
 * 路由的守卫
 */
import { useTitle } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { notFoundRoutes, routerNames } from '@/router/static'
import { useRouteStore } from '@/stores/route'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const createRouteGuard = (router) => {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    const userStore = useUserStore()
    const routerStore = useRouteStore()

    const isToLoginPage = to.name === routerNames.login
    const isToRootPage = to.name === routerNames.root
    const isToNotAllowed = to.name === routerNames.notAllowed
    const isNotFound = to.name === routerNames.notFound
    // 还差 500 的判断

    if (isNotFound || isToNotAllowed) {
      return next()
    }

    if (!userStore.isLogin) {
      if (isToLoginPage) {
        return next()
      }

      if (isToRootPage) {
        return next({
          name: routerNames.login
        })
      }

      return next({
        name: routerNames.login,
        query: {
          redirect: to.name,
          ...to.query
        }
      })
    }

    if (routerStore.permission) {
      if (isToLoginPage || isToRootPage) {
        return next(routerStore.firstAccessibleRoute)
      }
      return next()
    }

    try {
      if (!userStore.userInfo) {
        await userStore.fetchUserInfo()
      }

      if (!routerStore.permission) {
        await routerStore.fetchPermission()
        if (routerStore.permission) {
          const accessRoutes = routerStore.generateAccessRoutes()
          accessRoutes.forEach((route) => router.addRoute(routerNames.root, route))
          router.addRoute(notFoundRoutes)
          return next({ ...to, replace: true })
        } else {
          userStore.resetToken()
          next({
            name: routerNames.login
          })
        }
      }
    } catch (error) {
      userStore.resetToken()
      next({
        name: routerNames.login
      })
    }
  })

  router.afterEach((to) => {
    useTitle(to.meta.title)
    NProgress.done()
  })
}
