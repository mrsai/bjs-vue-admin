const logRoutes = [
  {
    path: '/service/log',
    name: 'log',
    component: () => import('@/views/service/logs/index.vue'),
    meta: {
      title: '日志列表',
      icon: 'ic:baseline-assignment',
      auth: {},
      order: 2,
      invisible: false
    },
    children: [
      {
        path: '/service/log/login',
        name: 'log.login',
        component: () => import('@/views/service/logs/login/index.vue'),
        meta: {
          title: '登录日志',
          parentRoute: '',
          breadCrumbs: [],
          cache: true,
          invisible: false,
          auth: {
            access: {
              txt: '访问',
              val: true
            }
          }
        },
        children: [
          {
            path: '/service/log/login/detail',
            name: 'log.login.detail',
            component: () => import('@/views/service/logs/login/detail.vue'),
            meta: {
              title: '登录日志详情',
              parentRoute: '',
              breadCrumbs: [],
              cache: true,
              invisible: false,
              auth: {
                access: {
                  txt: '访问',
                  val: true
                }
              }
            },
            children: [
              {
                path: '/service/log/login/detail/:id',
                name: 'log.logout.detail1',
                component: () => import('@/views/service/logs/login/detail.vue'),
                meta: {
                  title: '登出日志详情',
                  parentRoute: '',
                  breadCrumbs: [],
                  cache: true,
                  activePath: '/service/log/login/detail/:id',
                  invisible: false,
                  auth: {
                    access: {
                      txt: '访问',
                      val: false
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: '/service/log/logout',
        name: 'log.action',
        component: () => import('@/views/service/logs/logout/index.vue'),
        meta: {
          title: '登出日志',
          auth: {
            access: {
              txt: '访问',
              val: true
            },
            edit: {
              txt: '编辑',
              val: false
            },
            del: {
              txt: '删除',
              val: false
            }
          },
          invisible: true
        }
      }
    ]
  }
]

export default logRoutes
