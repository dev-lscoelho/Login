import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3333'

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
