import Vue from 'vue'
import Router from 'vue-router'
// 引入 ./routes.js 的默认值
import routes from './routes'
import vuex from '../vuex'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active', // 其默认值是 'router-link-exact-active'，我们这里改为 'active' 以利用 Bootstrap 的激活样式
  // 指定滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // 有锚点时，滚动到锚点
      return { selector: to.hash }
    } else if (savedPosition) {
      // 有保存位置时，滚动到保存位置
      return savedPosition
    } else {
      // 默认滚动到页面顶部
      return { x: 0, y: 0 }
    }
  },
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // const app = router.app
  // const store = app.$options.store // 此处的 store == vuex

  vuex
    .dispatch('checkUserToken')
    .then(() => {
      if (vuex.getters.isLogged && to.path.indexOf('auth') > 0) {
        return next({ name: 'home' })
      }
      return next()
    })
    .catch(() => {
      if (to.meta.auth) {
        // No token, or it is invalid
        return next({ name: 'auth.login' }) // redirect to login
      }
      next()
    })
})

export default router
