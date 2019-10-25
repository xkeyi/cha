import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss'
import 'font-awesome/scss/font-awesome.scss'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import http from './utils/http'
import store from './vuex'
import './assets/app.css'
import './assets/markdown.css'
import 'highlight.js/styles/paraiso-dark.css'


Vue.config.productionTip = false

sync(store, router)

Vue.use(ElementUI)

Vue.prototype.$message = Message
Vue.prototype.$loading = Loading
Vue.prototype.$http = http
Vue.prototype.$user = () => {
  return store.getters.currentUser
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
