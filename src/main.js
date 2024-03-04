import './assets/main.scss'
import 'virtual:uno.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import '@/assets/styles/dark/css-vars.css'


import App from './App.vue'
import { createApp } from 'vue'

import { setupStore } from './stores'
import { setupRouter } from './router'

const app = createApp(App)
setupStore(app)
setupRouter(app)



app.mount('#app')
