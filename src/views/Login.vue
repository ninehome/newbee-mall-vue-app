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
    <s-header :name="type == 'login' ? 'Вход в систему' : 'Регистрация'" :back="'/home'"></s-header>

<!--    <van-swipe-item class="imglogo" v-for="(image, index) in imageList" :key="index" >-->
<!--      <img :src="image" style="width:100%;height:150px;" />-->
<!--    </van-swipe-item>-->
<!--    <van-image class="logo"  :src="require('../../static-files/newbee-mall.png')" />-->
    <van-image
      class="logo"
      fit="contain"
      :src="require('../../static-files/logo.png')"
    />

<!--    <img class="logo" src="require('../../static-files/newbee-mall.png')"     alt="">-->
    <div v-if="type == 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="Мобильные телефоны"
          placeholder="Пожалуйста, введите номер вашего мобильного телефона"
          :rules="[{ required: true, message: 'Пожалуйста, введите номер вашего мобильного телефона' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="Пароль"
          placeholder="Пароль"
          :rules="[{ required: true, message: 'Пожалуйста, введите ваш пароль' }]"
        />

<!--        <div class="verify">-->
<!--          <Verify ref="loginVerifyRef" @error="error" :showButton="false" @success="success" :width="'100%'" :height="'40px'" :fontSize="'16px'" :type="picture"></Verify>-->
<!--        </div>-->
<!--        -->

        <div style="margin: 16px;">
          <div class="link-register" @click="toggle('register')">Зарегистрируйтесь сейчас</div>
          <van-button round block type="info" color="#1baeae" native-type="submit">Вход в систему</van-button>
        </div>
      </van-form>
    </div>
    <div v-else class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username1"
          name="username1"
          label="Мобильные телефоны"
          placeholder="Пожалуйста, введите номер вашего мобильного телефона"
          :rules="[{ required: true, message: 'Пожалуйста, введите номер вашего мобильного телефона' }]"
        />
        <van-field
          v-model="password1"
          type="password"
          name="password1"
          label="Пароль"
          placeholder="Пароль"
          :rules="[{ required: true, message: 'Пожалуйста, введите ваш пароль' }]"
        />


<!--        <div class="verify">-->
<!--          <Verify ref="loginVerifyRef" @error="error" :showButton="false" @success="success" :width="'100%'"  :height="'40px'" :fontSize="'16px'" :type="picture"></Verify>-->
<!--        </div>-->


        <div style="margin: 16px;">
          <div class="link-login" @click="toggle('login')">Уже есть логин</div>
          <van-button round block type="info" color="#1baeae" native-type="submit">Регистрация</van-button>
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
      username1: '',
      password1: '',
      type: 'login',
      verify: false,

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
    dealTriVer() {
      // 执行验证码的验证，通过 this.verify 知道验证码是否填写正确
      this.$refs.loginVerifyRef.$refs.instance.checkCode()
    },
    toggle(v) {
      this.verify = false
      this.type = v
    },
    async onSubmit(values) {
      // this.dealTriVer()

      // if (!this.verify) {
      //   Toast.fail('Проверочный код не заполнен или заполнен неправильно!')
      //   return
      // }
      //

      if (this.type == 'login') {
        const { data, resultCode } = await login({
          "loginName": values.username,
          "passwordMd5": this.$md5(values.password)
        })
        setLocal('token', data)
        window.location.href = '/'
      } else {
        const { data } = await register({
          "loginName": values.username1,
          "password": values.password1
        })
        Toast.success('Регистрация прошла успешно')
        this.type = 'login'
      }
    },
    // success(obj) {
    //   this.verify = true
    //   // 回调之后，刷新验证码
    //   obj.refresh()
    // },
    // error(obj) {
    //   this.verify = false
    //   // 回调之后，刷新验证码
    //   obj.refresh()
    // }
  },
}
</script>

<style lang="less">
.login {
  .logo {
    width: 160px;
    height: 46px;
    display: block;
    margin: 80px auto 0px;
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
