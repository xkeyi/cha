<template>
  <div class="row pt-3">
    <div class="offset-sm-4 col-sm-4">
      <div class="box">
        <h4 class="text-center font-weight-normal mt-2 mb-4">用户登录</h4>
        <form>
          <div class="form-group">
            <label>用户名<small>（或手机号码）</small></label>
            <input
              type="text"
              class="form-control"
              v-model.trim="username"
              required
            >
          </div>
          <div class="form-group">
            <label>密码</label>
            <input
              type="password"
              class="form-control"
              v-model.trim="password"
              required
            >
          </div>
          <button type="button" :disabled="!formReady" @click="submit" class="my-2 btn btn-primary w-100">登录</button>
        </form>
      </div>
    </div>

    <div class="offset-sm-4 col-sm-4 text-center mt-2 d-flex justify-content-between">
      <p>没有账号？ <router-link class="text-blue" :to="{ name: 'auth.register' }">快速注册</router-link>
      </p>
      <p>
        <router-link class="text-blue" :to="{ name: 'home' }">忘记密码？</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    formReady () {
      return (
        this.username.length >= 5 &&
        this.password.length >= 6
      )
    }
  },
  methods: {
    ...mapActions(['login']),
    async submit () {
      const form_data = {
        username: this.username,
        password: this.password
      }

      try {
        await this.login(form_data)

        this.$message.success('欢迎回来~')
        this.$router.push({ name: 'home' })
      } catch (e) {
        if (e.status !== 422) {
          this.$message.error('账号密码错误！')
        }
      }
    }
  }
}
</script>

<style scoped>
  .box {
    padding: 20px;
    border-radio: 3px;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.1);
    background-color: #fff;
  }
</style>
