import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss';
import router from './router'
import 'font-awesome/scss/font-awesome.scss'

Vue.use(iView);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
