import serviceRoutes from '@/router/modules/service'
import recommendRoutes from '@/router/modules/recommend'
import singleRoutes from '@/router/modules/single'

const dynamicRoutes = [
  ...serviceRoutes, 
  ...recommendRoutes,
  ...singleRoutes
]

export default dynamicRoutes
