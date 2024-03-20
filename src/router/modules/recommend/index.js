const recommendRoutes = [
  {
    path: '/recommend',
    name: 'recommend',
    meta: {
      title: '推荐',
      icon: 'i-mdi:palette-advanced',
      auth: {}
    },
    children: [
      {
        path: '/recommend/customer',
        name: 'recommend-customer',
        component: () => import('@/views/recommend/customer/index.vue'),
        meta: {
          title: '推荐客户',
          icon: 'ic:baseline-assignment'
        }
      },
      {
        path: '/recommend/product',
        name: 'recommend-product',
        component: () => import('@/views/recommend/product/index.vue'),
        meta: {
          title: '推荐商品',
          icon: 'ic:baseline-assignment'
        }
      }
    ]
  }
]
export default recommendRoutes
