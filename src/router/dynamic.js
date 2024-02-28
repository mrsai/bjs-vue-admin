import serviceRoutes from '@/router/modules/service'
import recommendRoutes from '@/router/modules/recommend'
const dynamicRoutes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/service',
    component: () => import('@/layout/root.vue'),
    meta: {
      title: 'Root',
      isKeepAlive: true,
    },
    children:[
      ...serviceRoutes,
      ...recommendRoutes
    ]
  }
]

export default dynamicRoutes