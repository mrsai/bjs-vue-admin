
import logRoutes from "@/router/modules/service/log"

const serviceRoutes = [
  {
    path: '/service',
    name: 'service',
    redirect: '/service/log',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '日志管理',
      icon: 'ic:baseline-assignment',
      privilege: {
      },
    },
    children: [
      ...logRoutes
    ],
  },
]
export default serviceRoutes