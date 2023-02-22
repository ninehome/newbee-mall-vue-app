<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div class="login">
    <s-header name="Account Signup" :back="'/login'"></s-header>


    <van-image
      class="logo"
      fit="contain"
      :src="require('../../static-files/logo.png')"
    />

    <div  class="login-body login">
      <van-form @submit="onSubmit" >
        <van-field
          type="number"
          v-model="username"
          name="username"
          label="+91"
          label-width = "50px"
          placeholder="Please enter your  phone number"
          :rules="[{ required: true, message: 'Please enter your  phone number' }]"
        >
          <van-icon class="iconfont" class-prefix="icon" slot="left-icon" :name="require('../../static-files/user/smartphone.png')"  ></van-icon>

        </van-field>


        <van-field
          v-model="password"
          :type="isPassword? 'password' :'text'"
          name="password"
          label=" "
          label-width = "50px"
          :right-icon=" isPassword? 'eye-o' : 'closed-eye' "
          @click-right-icon="showPassword"
          placeholder="Password"
          :rules="[{ required: true, message: 'Please enter your password' }]"
          >
          <van-icon class="iconfont" class-prefix="icon" slot="left-icon" :name="require('../../static-files/user/password.png')"  ></van-icon>
        </van-field>

<!--        <van-cell-group inset>-->
        <van-field
          v-model="agentId"
          name="agentId"
          label="Invited Code"
          input-align="center"
          :rules="[{ required: true, message: 'Please enter the invitation code' }]"
        >



        </van-field>
<!--        </van-cell-group>-->
        <div style="margin: 16px;">
          <div class="link-register" @click="toggle('register')">Login In</div>
          <van-button round block type="info" color="#287FF0" native-type="submit">Sign up</van-button>
        </div>
      </van-form>


    </div>






  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
import { login, register, getUserInfo } from '../service/user'
import { setLocal, getLocal } from '@/common/js/utils'
import { Toast } from 'vant'
import Verify from 'vue2-verify'
export default {
  data() {
    return {
      username: '',
      password: '',
      type: 'login',
      verify: false,
      isPassword:true,
      agentId:''


    }
  },
  mounted(){
      this.username = "",
      this.password =""
      this.initAgent()
  },

  components: {
    sHeader,
    // Verify
  },

  methods: {
    initAgent(){
      this.agentId = this.$route.query.agent
      // console.log(this.agentId)
    },
    showPassword(){ // 显示隐藏密码
      this.isPassword = !this.isPassword
    },

    toggle(v) {
      this.$router.push({ path: `login` })
      // this.verify = false
      // this.type = v
    },
    async onSubmit(values) {

        const { data ,resultCode ,message} = await register({
          "loginName": values.username,
          "password": values.password,
          "agentId": values.agentId
        })
       //注册成功
        if (resultCode === 200){
          //登录
          await this.login(values.username, values.password)
        }else {
          Toast.fail('!! '+message)
        }



    },

    async login(name,psw) {

      const {data, resultCode} = await login({
        "loginName": name,
        "passwordMd5": this.$md5(psw)
      })

      // 登录成功
      if (resultCode === 200 && data !== null) {
        setLocal('token', data.token)
        setLocal('userId', data.userId)
        setTimeout(() => {
          this.jump(`user`)
        }, 500);

      }else {
        this.jump(`login`)
      }

      Toast.success('Registration was successful')

    },

    jump(v){
       this.$router.push({path: v})

    }

  },
}
</script>

<style lang="less">
.login {
  .logo {
    width: 160px;
    height: 46px;
    display: block;
    margin: 80px auto 80px;
  }
  .login-body {
    padding: 0 20px;
  }
  .login {
    .link-register {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  .register {
    .link-login {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  .verify-bar-area {
    margin-top: 24px;
    .verify-left-bar {
      border-color: #1baeae;
    }
    .verify-move-block {
      background-color: #1baeae;
      color: #fff;
    }
  }
  .verify {
    >div {
      width: 100%;
    }
    display: flex;
    justify-content: center;
    .cerify-code-panel {
      margin-top: 16px;
    }
    .verify-code {
      width: 40%!important;
      float: left!important;
    }
    .verify-code-area {
      float: left!important;
      width: 54%!important;
      margin-left: 14px!important;
      .varify-input-code {
        width: 90px;
        height: 38px!important;
        border: 1px solid #e9e9e9;
        padding-left: 10px;
        font-size: 16px;
      }
      .verify-change-area {
        line-height: 44px;
      }
    }
  }
}
</style>
