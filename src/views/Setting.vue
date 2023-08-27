<!--

-->

<template>
  <div class="seting-box">
    <s-header :name="'Gerenciamento de contas'"></s-header>
    <div class="input-item">
      <van-field v-model="nickName" label="Apelido" />
      <van-field v-model="introduceSign" label="Assinatura personalizada" />
      <van-field v-model="password" type='password' label="Alterar senha" />
    </div>
    <van-button class="save-btn" color="#1baeae" type="primary" @click="save" block>Salvar</van-button>
    <van-button class="save-btn" color="#1baeae" type="primary" @click="logout" block>Fazer logout</van-button>
  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
import { getUserInfo, EditUserInfo, logout } from '../service/user'
import { setLocal } from '@/common/js/utils'
import { Toast } from 'vant'
export default {
  components: {
    sHeader
  },
  data() {
    return {
      nickName: '',
      introduceSign: '',
      password: ''
    }
  },
  async mounted() {
    const { data } = await getUserInfo()
    this.nickName = data.nickName
    this.introduceSign = data.introduceSign
  },
  methods: {
    async save() {
      const params = {
        introduceSign: this.introduceSign,
        nickName: this.nickName,
        passwordMd5: this.$md5(this.password)
      }
      const { data } = await EditUserInfo(params)
      Toast.success('Salvo com sucesso')
    },
    async logout() {
      const { resultCode } = await logout()
      if (resultCode == 200) {
        setLocal('token', '')
        window.location.href = '/'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.seting-box {
  .input-item {
    margin-top: 44px;
  }

  .save-btn {
    width: 80%;
    margin: 20px auto;
  }
}
</style>
