
const logRoutes = [{
  path: '/service/log',
  name: 'log',
  redirect: '/service/log/login',
  component: () => import('@/layout/main.vue'),
  meta: {
    title: '日志管理',
    icon: 'ic:baseline-assignment',
    privilege: {
    },
    order: 2,
  },
  children: [
    {
      path: 'login',
      name: 'log.login',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: '登录日志',
        parentRoute: '',
        breadCrumbs: [],
        privilege: {
        },
      },
      children: [
        {
          path: '/log/login/:id',
          name: 'log.login.detail',
          meta: {
            hideMenu: true,
            title: '明细',
            privilege: {
            },
          },
        },
      ],
    },
    {
      path: 'action',
      name: 'log.action',
      meta: {
        hideMenu: false,
        title: '操作日志',
        privilege: {
        },
      },
    },
  ],
}];

export default logRoutes;
