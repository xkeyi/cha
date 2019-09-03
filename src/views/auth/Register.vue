<template>
  <div class="row mt-5">
    <div class="offset-sm-4 col-sm-4">
      <div class="box">
        <h4 class="text-center font-weight-normal mt-2 mb-4">用户注册</h4>
        <Form ref="formTop" :model="formTop" :rules="ruleValidate" label-position="top">
              <FormItem label="手机号码" prop="name" size="14">
                  <Input v-model="formTop.name" placeholder="Enter your name"></Input>
              </FormItem>
              <FormItem label="E-mail" prop="mail">
                  <Input v-model="formTop.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
              <FormItem label="City" prop="city">
                  <Select v-model="formTop.city" placeholder="Select your city">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                  </Select>
              </FormItem>
              <FormItem label="Date">
                  <Row>
                      <Col span="11">
                          <FormItem prop="date">
                              <DatePicker type="date" placeholder="Select date" v-model="formTop.date"></DatePicker>
                          </FormItem>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                          <FormItem prop="time">
                              <TimePicker type="time" placeholder="Select time" v-model="formTop.time"></TimePicker>
                          </FormItem>
                      </Col>
                  </Row>
              </FormItem>
              <FormItem label="Gender" prop="gender">
                  <RadioGroup v-model="formTop.gender">
                      <Radio label="male">Male</Radio>
                      <Radio label="female">Female</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="Hobby" prop="interest">
                  <CheckboxGroup v-model="formTop.interest">
                      <Checkbox label="Eat"></Checkbox>
                      <Checkbox label="Sleep"></Checkbox>
                      <Checkbox label="Run"></Checkbox>
                      <Checkbox label="Movie"></Checkbox>
                  </CheckboxGroup>
              </FormItem>
              <FormItem label="Desc" prop="desc">
                  <Input v-model="formTop.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formTop')">Submit</Button>
                  <Button @click="handleReset('formTop')" style="margin-left: 8px">Reset</Button>
              </FormItem>
          </Form>
      </div>
    </div>

    <div class="offset-sm-3 col-sm-6 text-center mt-2">
      <p>已有账号？<a href="">直接登录</a></p>
    </div>
  </div>
</template>
<script>
    export default {
      name: 'Register',
        data () {
            return {
                formTop: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                },
                top: 'top'
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
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
  .ivu-form .ivu-form-item-label {
    font-size: 14px;
  }
  .ivu-form-label-top .ivu-form-item-label {
    font-size: 14px;
  }
</style>