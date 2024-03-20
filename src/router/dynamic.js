import serviceRoutes from '@/router/modules/service'
import recommendRoutes from '@/router/modules/recommend'
import singleRoutes from '@/router/modules/single'
import managementRoutes from '@/router/modules/management'

const dynamicRoutes = [...singleRoutes, ...serviceRoutes, ...recommendRoutes, ...managementRoutes]

export default dynamicRoutes
