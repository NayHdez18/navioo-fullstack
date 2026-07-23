import './assets/main.css'
import router from './router'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/indez.css'
import App from './App.vue'


import "bootstrap/dist/css/bootstrap.min-css"


const app = createApp(App)
  app.use(router)
  app.mount('#app')
