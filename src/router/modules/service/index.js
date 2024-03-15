
import logRoutes from "@/router/modules/service/log"

const serviceRoutes = [
  {
    path: '/service',
    name: 'service',
    meta: {
      title: '日志',
      icon: 'i-mdi:database-clock',
      cache: false,
      auth: {
      },
    },
    children: [
      ...logRoutes
    ],
  },
]
export default serviceRoutes