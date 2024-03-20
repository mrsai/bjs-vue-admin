const routerNames = {
  root: 'Root',
  main: 'Main',
  login: 'Login',
  notFound: 'NotFound',
  notAllowed: 'NotAllowed'
}

const staticRoutes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/layout/root.vue'),
    meta: {
      icon: 'i-mdi:home',
      title: '首页'
    }
  },
  {
    path: '/login',
    name: routerNames.login,
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/403',
    name: routerNames.notAllowed,
    component: () => import('@/views/not-allowed/index.vue'),
    meta: {
      title: '禁止访问'
    }
  }
]

const notFoundRoutes = {
  path: '/:path(.*)*',
  name: routerNames.notFound,
  component: () => import('@/views/not-found/index.vue'),
  meta: {
    title: 'Error',
    hideBreadcrumb: true,
    hideMenu: true
  }
}

export default staticRoutes
export { routerNames, notFoundRoutes }
