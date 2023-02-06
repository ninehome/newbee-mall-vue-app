<!--
个人中心是 九宫格布局
-->

<template>
  <div class="user-box">
    <!-- <s-header :name="'我的'"></s-header> -->
    <div class="header_title">
      Персональный центр
    </div>

    <div class="user-info">
      <div class="info">
        <img src="//s.weituibao.com/1583583975067/user-graduate%20(1).png" />
        <div class="user-desc">
          <span>Счета：{{ user.loginName }}</span>
          <span>Баланс：{{ user.userMoney }} ₽</span>
          <span>Класс: VIP{{ user.userLevel }}</span>
        </div>
        <img class="img-fresh" :src="require('../../static-files/user/refresh.png')"  @click="getUserInfo(true)"/>

      </div>
    </div>


   <!-- 九宫格布局  Получатель -->

    <van-grid clickable :column-num="3" class="tab-grid" >
      <van-grid-item clickable = "true" :icon="require('../../static-files/user/telemarketer.png')" text="Интернет Сервис" to="recharge" />
      <van-grid-item clickable = "true"  :icon="require('../../static-files/user/money_out.png')" text="Отозвано" to="withdrawal" />
      <van-grid-item clickable = "true"  :icon="require('../../static-files/user/order_list.png')" text="Мои заказы" to="order" />
      <van-grid-item clickable = "true"  :icon="require('../../static-files/user/add_cards.png')" text="Получатель" to="bank" />
      <van-grid-item clickable = "true"  :icon="require('../../static-files/user/location.png')" text="Адрес получения" to="address?from=mine" />
      <van-grid-item clickable = "true"  :icon="require('../../static-files/user/about_us.png')" text="О нас" to="about" />
    </van-grid>



    <div  class="user-list">
      <van-button class="save-btn" color="#1baeae" type="primary" @click="logout" block>Выйти из системы</van-button>

    </div>



    <nav-bar></nav-bar>
  </div>
</template>

<script>
import navBar from '@/components/NavBar'
import sHeader from '@/components/SimpleHeader'
import { getUserInfo, EditUserInfo, logout } from '../service/user'  //需要注册网络请求的方法
import { setLocal } from '@/common/js/utils'
import { Toast } from 'vant'
import {getBankList} from "@/service/withdrawl";
export default {
  components: {
    navBar,
    // sHeader
  },
  data() {
    return {
      nickName: '',
      introduceSign: '',
      password: '',
      bankcard: false,
      timer:null,
      user: {
        loginName:'',
        userMoney:0,
        userLevel:0
      }
    }
  },
  async mounted() {

    const { data } = await getUserInfo(true)
    this.user = data
    await this.initBanks()

    this.timer = window.setInterval(async () => {

      const  token = localStorage.getItem("token");
      if (token !== "undefined" && token !== null && token !=="" ){
        await this.getUserInfo(false)
        await this.initBanks()
      }

    },5000)


  },
  beforeDestroy() {
    if(this.timer){
      clearImmediate(this.timer)
      this.timer = null;
    }
  },
  deactivated() {
    if(this.timer){
      clearImmediate(this.timer)
      this.timer = null;
    }
  },

  methods: {
     async getUserInfo(showLoading) {

       if (showLoading){
         Toast.loading({
           message: 'Данные запроса...',
           forbidClick: true
         });
       }

       const {data} = await getUserInfo()
       this.user = data
       Toast.clear()
     },

    RefreshUserInfo(){
      this.getUserInfo(true)
    },

    goBack() {
      this.$router.go(-1)
    },
    goTo(r) {
      this.$router.push({ path: r })
      if (r === 'withdrawal'){ //先判断 如果没有卡 需要跳转添加卡页面
        if ( this.bankcard){
        this.$router.push({ path: r })
        }else {
          this.$router.push({path: `add-bank?type=add&from=mine`})
        }
      }else {

      this.$router.push({ path: r })
      }

    },
    linkDownload(url) {
      window.open(url, '_blank') // 新窗口打开外链接
    },
    async logout() {
      const { resultCode } = await logout()
      if (resultCode === 200) {
        this.user = null
        setLocal('token', '')
        window.location.href = '/'
      }
    },

    async initBanks(){
      const { data,resultCode } = await  getBankList({ pageNumber: 1 })

      if (resultCode === 200){
        this.bankcard = data.size !== 0;

      }

    },
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.user-box {
  .header_title {

    text-align: center;

    // z-index: 10000;
    // .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    font-size: 14px;
  }



  .user-info {
    width: 94%;
    height: 130px;
    background: linear-gradient(90deg, @primary_start,@primary);
    box-shadow: 0 2px 5px @primary;
    border-radius: 4px;
    margin-top: 20px ;
    margin-right: 10px ;
    margin-left: 10px;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 20px 15px;
      .boxSizing();

      img {
        .wh(55px, 55px);
        border-radius: 50%;
        margin-top: 4px;
      }

      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        line-height: 20px;
        font-size: 16px;
        color: #fff;

        span {
          color: #fff;
          font-size: 15px;
          padding: 2px 0;
        }
      }


      .img-fresh{
        margin-left: auto;
        width: 28px;
        height: 28px;

      }

      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;

        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }

  .tab-grid{
    margin-top: 80px;
  }
  .user-list {
    padding: 0 20px;
    margin-top: 100px;

    .save-btn {
      width: 70%;
      margin: 40px auto;
    }

    li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e9e9e9;
      display: flex;
      justify-content: space-between;
      font-size: 14px;

      .van-icon-arrow {
        margin-top: 13px;
      }
    }
  }
}
</style>
