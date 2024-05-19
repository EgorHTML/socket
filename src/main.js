import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from './router'
import { io } from 'socket.io-client'
import { createPinia } from 'pinia'

createApp(App)
    .use(ElementPlus)
    .use(router)
    .use(createPinia())
    .mount('#app')
