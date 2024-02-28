import { createRouter, createWebHistory } from 'vue-router'
import staticRoutes from '@/router/static'
import dynamicRoutes from '@/router/dynamic'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...staticRoutes,
    ...dynamicRoutes
  ]
})

export function setupRouter(app) {
  app.use(router)
}
