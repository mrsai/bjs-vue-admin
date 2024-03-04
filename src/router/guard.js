/**
 * 路由的守卫
 */
import { useRouteStore } from '@/stores/route'


export const initRouteGuard = (router) => {
  router.beforeEach((to, from, next) => {
    console.log('to:', to)
    console.log('from:', from)
    next()
  })

  router.afterEach((to, from) => {
    
    /**
     * 处理普通页面的缓存
     */
    // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
    if (to.meta.cache) {
      const componentName = to.matched.at(-1)?.components?.default.name
      if (componentName) {
        const routeStore = useRouteStore()
        routeStore.addCaches(componentName)
      } else {
        console.warn('请为该组件设置 name 属性，否则无法进行缓存')
      }
    }
    console.log('from:', from)
  })
}
