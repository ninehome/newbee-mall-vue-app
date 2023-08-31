<!--

-->

<template>
  <div class="login">
    <s-header name="Registro de conta" :back="'/login'"></s-header>


<!--    <van-image-->
<!--      class="logo"-->
<!--      fit="contain"-->
<!--      :src="require('../../static-files/logo.png')"-->
<!--    />-->

    <div  class="login-body login">
      <van-form @submit="onSubmit" >
        <van-field
          type="number"
          v-model="username"
          name="username"
          label="+55"
          label-width = "50px"
          placeholder="Digite seu número de telefone celular"
          :rules="[{ required: true, message: 'Digite seu número de telefone celular' }]"
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
          placeholder="Senha"
          :rules="[{ required: true, message: 'Digite sua senha' }]"
          >
          <van-icon class="iconfont" class-prefix="icon" slot="left-icon" :name="require('../../static-files/user/padlock.png')"  ></van-icon>
        </van-field>

<!--        <van-cell-group inset>-->
        <van-field
          v-model="agentId"
          name="agentId"
          label="convites"
          input-align="center"
          :rules="[{ required: true, message: 'Por favor, digite o código do convite' }]"
        >



        </van-field>
<!--        </van-cell-group>-->
        <div style="margin: 16px;">
          <div class="link-register" @click="toggle('register')">Login</div>
          <van-button round block type="info" color="#1baeae" native-type="submit">Registro</van-button>
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
import Verify from 'vue2-verify'
import _ from "lodash"
import axios from "axios";
import jsCookie from "js-cookie";
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
      console.log(this.agentId)
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
      Toast.loading({
        message: 'Dados de consulta...',
        forbidClick: true
      });


      const { data ,resultCode ,message} = await register({
          "loginName": values.username,
          "password": values.password,
          "agentId": values.agentId
        })
       //注册成功
        if (resultCode === 200){
          //登录
          await this.login(values.username, values.password)
          Toast.clear()
        }else {
          Toast.clear()
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
        jsCookie.set('userId', data.userId)
        jsCookie.set('token', data.token)
        setTimeout(() => {
          this.jump(`user`)
        }, 500);

      }else {
        this.jump(`login`)
      }

      Toast.success('O registro foi bem-sucedido')

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
