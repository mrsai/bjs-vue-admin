
const singleRoutes = [
  {
    path: '/single',
    name: 'single',
    component: () => import('@/views/single/index.vue'),
    meta: {
      title: '单页面',
      icon: 'i-mdi:book-open-page-variant',
    }
  }
]
export default singleRoutes