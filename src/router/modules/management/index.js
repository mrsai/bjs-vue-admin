const managementRoutes = [
  {
    path: '/management',
    name: 'management',
    meta: {
      title: '管理',
      icon: 'i-mdi:book-open-page-variant'
    },
    children: [
      {
        path: '/management/role',
        name: 'management-role',
        component: () => import('@/views/management/roles/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'i-mdi:account-group'
        }
      }
    ]
  }
]
export default managementRoutes
