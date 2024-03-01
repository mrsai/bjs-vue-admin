import { createRouter, createWebHistory } from 'vue-router'
import staticRoutes from '@/router/static'
import dynamicRoutes from '@/router/dynamic'
import {initRouteGuard} from './guard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...staticRoutes,
    ...dynamicRoutes
  ],
  strict: true,
  scrollBehavior: () => ({left: 0, top: 0}),
})

export function setupRouter(app) {
  initRouteGuard(router);
  app.use(router)
}
