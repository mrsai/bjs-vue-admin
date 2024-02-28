import './assets/main.css'
import 'virtual:uno.css'




import App from './App.vue'
import { createApp } from 'vue'
import { setupRouter } from './router'
import { setupStore } from './stores'

const app = createApp(App)

setupRouter(app)

setupStore(app)

app.mount('#app')
