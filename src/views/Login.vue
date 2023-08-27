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
    <s-header name="Login" :back="'/home'"></s-header>

    <van-image
      class="logo"
      fit="contain"
      :src="require('../../static-files/logo.png')"
    />

    <div class="login-body login">
      <van-form @submit="onSubmit" >
        <van-field
          class="user-name"
          type="number"
          v-model="username"
          name="username"
          label-width = "50px"
          label="+55"
          placeholder="Digite seu número de telefone celular"
          :rules="[{ required: true, message: 'Digite seu número de telefone celular' }]"
        >
          <van-icon class="iconfont" class-prefix="icon" slot="left-icon" :name="require('../../static-files/user/smartphone.png')" > </van-icon>

        </van-field>


        <!--        带眼睛 的密码显示-->
        <van-field
          v-model="password"
          label-width = "50px"
          label=" "
          :type="isPassword? 'password' :'text'"
          name="password"
          :right-icon=" isPassword? 'eye-o' : 'closed-eye' "
          @click-right-icon="showPassword"
          placeholder="Пароль"
          :rules="[{ required: true, message: 'Digite sua senha' }]"
        >

          <van-icon class="iconfont" class-prefix="icon" slot="left-icon" :name="require('../../static-files/user/padlock.png')"  ></van-icon>

        </van-field>


        <div style="margin: 16px;">
          <div class="link-register" @click="toggle('register')">Registre-se agora</div>
          <van-button round block type="info" color="#1baeae" native-type="submit">Login</van-button>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
import { login, register, getUserInfo } from '../service/user'
import {setLocal, getLocal, setCookie} from '@/common/js/utils'
import { Toast } from 'vant'
import jsCookie from "js-cookie";
import Verify from 'vue2-verify'
import axios from "axios";
export default {
  data() {
    return {
      username: '',
      password: '',
      username1: '',
      password1: '',
      type: 'login',
      verify: false,
      isPassword:true

      // imageList: [
      //   require('../../static-files/newbee-mall.png'),
      //   // require('../static-files/newbee-mall.png'),
      //   // require('../static-files/newbee-mall.png'),
      // ],

    }
  },
  components: {
    sHeader,
    // Verify
  },
  methods: {
    // 显示隐藏密码
    showPassword(){
      this.isPassword = !this.isPassword
    },

    toggle(v) {
      // this.verify = false
      // this.type = v
      this.$router.push({ path: `register` })
    },
    async onSubmit(values) {

        const { data, resultCode } = await login({
          "loginName": values.username,
          "passwordMd5": this.$md5(values.password)
        })

        if (resultCode === 200){
          setLocal('token', data.token)
          setLocal('userId', data.userId)
          jsCookie.set('userId', data.userId)
          jsCookie.set('token', data.token)
          window.location.href = '/'
        }else  if(resultCode === 417){
          Toast.fail('Senha e número de conta incorretos inseridos')

        }else {
          Toast.fail('Erro de login, tente novamente mais tarde')

        }


    },

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
    .user-name{
      margin-right: 150px;
    }
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
