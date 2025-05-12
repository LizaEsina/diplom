import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.withCredentials = true

axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        alert('Сессия истекла. Пожалуйста, войдите снова.')
        store.commit('CLEAR_TOKEN')
        router.push('/login')
      }
      return Promise.reject(error)
    }
  )

function getTokenFromCookies() {
  const match = document.cookie.match(/token=([^;]+)/)
  return match ? match[1] : null
}
const token = getTokenFromCookies()
if (token) {
  store.commit('SET_TOKEN', token)
}

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(store)
app.use(router)
app.mount('#app')
