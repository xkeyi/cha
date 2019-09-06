<template>
  <div class="row pt-3">
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
              placeholder="手机号码"
              v-model.trim="phone"
              @blur="validatePhone"
              :disabled="phoneDisabled"
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
                  placeholder="手机验证码"
                  v-model.trim="verification_code"
                  required
                >
              </div>
              <div class="col-sm-5 text-right">
                <button type="button" class="btn btn-success" :disabled="!phoneReady" @click="showCaptchaDialog">获取验证码</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>用户名</label>
            <input
              type="text"
              class="form-control"
              ref="usernameInput"
              placeholder="5 ~ 20 位字母或数字"
              v-model.trim="username"
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
              v-model.trim="password"
              required
            >
          </div>
          <button type="button" :disabled="!formReady" @click="submit" class="my-2 btn btn-primary w-100">注册</button>
        </form>
      </div>
    </div>

    <div class="offset-sm-3 col-sm-6 text-center mt-2">
      <p>已有账号？<router-link :to="{ name: 'auth.login' }">直接登录</router-link></p>
    </div>

    <el-dialog
      title="填写图片验证码"
      :visible.sync="captchaDialogVisiable"
      width="30%">
      <form>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-6 pr-0">
              <input
                type="text"
                class="form-control"
                ref="captchaInput"
                placeholder=""
                v-model.trim="captcha_code"
                required
              >
            </div>
            <div class="col-sm-6" style="margin-top: -3px;">
              <img :src="captcha.captcha_image_content" @click="getCaptcha" style="cursor:pointer;">
            </div>
          </div>
        </div>
      </form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendVerificationCode" class="">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      phone: '',
      phoneDisabled: false,
      username: '',
      password: '',
      verification_code: '',
      // 短信验证码 key 及过期时间
      verification: {},
      error: true,
      regex: {
        phone: /^1[3456789]\d{9}$/,
        username: /^[a-zA-Z]+[a-zA-Z0-9_-]+$/
      },
      captchaDialogVisiable: false,
      captcha_code: '',
      // 图片验证码 key 及过期时间
      captcha: {},
    }
  },
  mounted () {
  },
  watch: {
    phone () {
      this.$refs['phoneInput'].classList.remove('is-invalid')
      this.captcha = {}
      this.captcha_code = ''
    },
    captcha_code () {
      this.$refs['captchaInput'].classList.remove('is-invalid')
    },
    username () {
      this.$refs['usernameInput'].classList.remove('is-invalid')
    }
  },
  computed: {
    phoneReady () {
      return this.phone.match(this.regex.phone)

    },
    formReady () {
      return (
        !this.error &&
        this.verification_code &&
        this.verification.key &&
        this.phone.match(this.regex.phone) &&
        this.username.match(this.regex.username) &&
        this.username.length >= 5 &&
        this.username.length <= 20 &&
        this.password.length >= 6 &&
        this.password.length <= 32
      )
    }
  },
  methods: {
    ...mapActions(['register']),
    validatePhone () {
      this.error = false

      if (!this.phone.match(this.regex.phone)) {
        this.error = true
        this.$refs['phoneInput'].classList.add('is-invalid')
        this.$message.error('请输入正确的手机号码')
        return
      }

      return

      this.$http
          .post('/user/exists', { phone: this.phone })
          .then(response => {
            if (!response.success) {
              this.error = true
              this.$refs['phoneInput'].classList.add('is-invalid')
              this.$message.error('手机号码已存在')
              return
            }
          })
    },
    showCaptchaDialog () {
      if (!this.phoneReady) {
        return
      }

      this.getCaptcha()
    },
    async getCaptcha () {
      await this.$http
          .post('/captchas', { phone: this.phone })
          .then(response => {
            this.captchaDialogVisiable = true
            this.captcha = response
          })
    },
    async sendVerificationCode () {
      if (!this.captcha.captcha_key) {
        this.$message.error('请先获取验证码')
        return;
      }

      if (!this.captcha_code) {
        this.$refs['captchaInput'].classList.add('is-invalid')
        this.$message.error('请输入图片验证码')
        return
      }

      // 检查验证码是否过期，重置流程
      if (new Date().getTime() > new Date(this.captcha.expired_at).getTime()) {
        this.$message.error('图片验证码已过期')
        this.resetRegister()
        return
      }


      await this.$http
          .post('/verificationCodes', { captcha_key: this.captcha.captcha_key,  captcha_code: this.captcha_code})
          .then(response => {
            this.verification = response
            this.captcha_code = ''
            this.captcha = {}
            this.captchaDialogVisiable = false
            this.phoneDisabled = true
          })
    },
    resetRegister () {
      this.phone = ''
      this.phoneDisabled = false
      this.username = ''
      this.password = ''
      this.verification_code = ''
      this.verification = {}
      this.error = true
      this.captchaDialogVisiable = false
      this.captcha_code = ''
      this.captcha = {}
    },
    validateUsername () {
      this.error = false

      if (!this.username.match(this.regex.username) ||
          this.username.length < 5 ||
          this.username.length > 20) {
        this.error = true
        this.$refs['usernameInput'].classList.add('is-invalid')
        this.$message.error('请输入 5 ~ 20 位正确格式用户名')
        return
      }

      this.$http
          .post('/user/exists', { username: this.username })
          .then(response => {
            if (!response.success) {
              this.error = true
              this.$refs['usernameInput'].classList.add('is-invalid')
              this.$message.error('用户名已经存在！')
              return
            }
          })
    },
    async submit () {
      if (!this.verification.key) {
        this.$message.error('请先获取短信验证码')
        return
      }

      if (new Date().getTime() > new Date(this.verification.expired_at).getTime()) {
        this.$message.error('短信验证码已过期')
        this.resetRegister()
        return
      }

      const form_data = {
        username: this.username,
        password: this.password,
        verification_code: this.verification_code,
        verification_key: this.verification.key,
      }

      try {
        await this.register(form_data)

        this.$message.success('注册成功！')
        this.$router.push({ name: 'home' })
      } catch (e) {
        if (e.status !== 422) {
          this.$message.error('注册失败！')
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
