import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss';
import router from './router'
import 'font-awesome/scss/font-awesome.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
