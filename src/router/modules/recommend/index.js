
const recommendRoutes = [
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '推荐',
      icon: 'ic:baseline-assignment',
      privilege: {
      },
    },
    children: [],
  }
]
export default recommendRoutes