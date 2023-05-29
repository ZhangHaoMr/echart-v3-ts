import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { globalRegister } from '@/global'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(globalRegister)

app.mount('#app')
