import './assets/main.scss'
import 'virtual:uno.css'
import '@/utils/plugins/preload-icons'

import App from './App.vue'
import { createApp } from 'vue'

import { setupStore } from './stores'
import { setupRouter } from './router'

const app = createApp(App)
setupStore(app)
setupRouter(app)

app.mount('#app')
