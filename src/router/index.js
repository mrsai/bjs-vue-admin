import { createRouter, createWebHistory } from 'vue-router'
import staticRoutes from '@/router/static'


import { createRouteGuard } from './guard'
// import { validataRouterName } from '@/utils/plugins/verification.plugin'
// import { isDev } from '@/utils/tools/index'


// if(isDev() && !validataRouterName(staticRoutes)){
//   console.error('路由组件中有未命名的路由，请检查！')
// }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export async function setupRouter(app) {
  app.use(router)
  createRouteGuard(router)
  await router.isReady()
}
