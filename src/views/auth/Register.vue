<template>
  <div class="row mt-4">
    <div class="offset-sm-4 col-sm-4">
      <div class="box">
        <h4 class="text-center font-weight-normal mt-2 mb-4">用户注册</h4>
        <form>
          <div class="form-group">
            <label>手机号码</label>
            <input
              type="text"
              class="form-control"
              ref="phoneInput"
              placeholder=""
              v-model="phone"
              @blur="validatePhone"
              required
            >
          </div>
          <div class="form-group">
            <label>手机验证码</label>
            <div class="row">
              <div class="col-sm-7 pr-0">
                <input
                  type="text"
                  class="form-control"
                  ref="usernameInput"
                  placeholder=""
                  v-model="verification_code"
                  @blur="validateUsername"
                  required
                >
              </div>
              <div class="col-sm-5 text-right">
                <button type="button" class="btn btn-success" :disabled="!phoneReady">获取验证码</button>
              </div>
            </div>
            
          </div>
          <div class="form-group">
            <label>用户名</label>
            <input
              type="text"
              class="form-control"
              ref="usernameInput"
              placeholder="5 ~ 12 位字母或数字"
              v-model="username"
              @blur="validateUsername"
              required
            >
          </div>
          <div class="form-group">
            <label>密码</label>
            <input
              type="password"
              class="form-control"
              ref="passwordInput"
              placeholder="6 ~ 32 位安全密码"
              v-model="password"
              required
            >
          </div>
          <button type="submit" :disabled="!formReady" class="my-2 btn btn-primary w-100">注册</button>
        </form>
      </div>
    </div>

    <div class="offset-sm-3 col-sm-6 text-center mt-2">
      <p>已有账号？<router-link :to="{ name: 'auth.login' }">直接登录</router-link></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      phone: '',
      username: '',
      password: '',
      verification_code: '',
      verificationCode: {},
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