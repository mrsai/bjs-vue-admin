const staticRoutes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:path(.*)*',
    name: 'NotFound',
    meta: {
      title: 'Error',
      hideBreadcrumb: true,
      hideMenu: true,
    }
  }
]

export default staticRoutes