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
  <div>

    <header class="home-header wrap" :class="{ 'active': headerScroll }">
      <router-link tag="i" to="./category"><i class="nbicon nbmenu2"></i></router-link>


      <div class="header-search" @click="serach">
        <!-- <span class="app-name">新蜂</span> -->
        <!-- <router-link tag="span" class="search-title" to="./product-list?from=home"> <span class="app-name">新蜂</span>
          </router-link> -->
        <router-link tag="span" class="search-title" to="./product-list?from=home"></router-link>
      </div>


      <router-link class="login" tag="span" to="./login" v-if="!isLogin">Login</router-link>
      <router-link class="login" tag="span" to="./user" v-else>
        <van-icon name="manager-o" />
      </router-link>
    </header>
    <nav-bar></nav-bar>
    <swiper :list="swiperList"></swiper>

    <!-- 头部功能模块布局 -->
    <div class="category-list">
      <div v-for="item in categoryList" v-bind:key="item.categoryId">
        <img :src="item.imgUrl">
        <span>{{ item.name }}</span>
      </div>
    </div>

    <div class="good">
      <header class="good-header">Новые продукты онлайн</header>
      <div class="good-box">
        <div class="good-item" v-for="item in newGoodses" :key="item.goodsId" @click="goToDetail(item)">
<!--          <img :src="prefix(item.goodsCoverImg)" alt="">-->
          <van-image
            lazy-load
            :src="prefix(item.goodsCoverImg)"
          />

          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">{{formatNum(item.sellingPrice) }} ₽ </div>
          </div>
        </div>
      </div>
    </div>
    <div class="good">
      <header class="good-header">Популярные товары</header>
      <div class="good-box">
        <div class="good-item" v-for="item in hots" :key="item.goodsId" @click="goToDetail(item)">
<!--          <img :src="prefix(item.goodsCoverImg)" alt="">-->

          <van-image
            lazy-load
            :src="prefix(item.goodsCoverImg)"
          />


          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price"> {{formatNum(item.sellingPrice) }} ₽</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good" :style="{ paddingBottom: '100px' }">
      <header class="good-header">Последние рекомендации</header>
      <div class="good-box">
        <div class="good-item" v-for="item in recommends" :key="item.goodsId" @click="goToDetail(item)">
<!--          <img :src="prefix(item.goodsCoverImg)" alt="">-->

          <van-image
            lazy-load
            :src="prefix(item.goodsCoverImg)"
          />

          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">{{ formatNum(item.sellingPrice ) }} ₽</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import navBar from '@/components/NavBar'
import swiper from '@/components/Swiper'
import { getHome } from '../service/home'
import { getUserInfo } from '../service/user'
import { getLocal } from '@/common/js/utils'
import {Dialog, Toast} from 'vant'
import {formatNum} from '../service/number'
import {addCart} from "@/service/cart";
import jsCookie from "js-cookie";
import axios from "../utils/axios";
export default {
  name: 'home',
  data() {
    return {
      formatNum:formatNum,
      swiperList: [],
      isLogin: false,
      headerScroll: false,
      hots: [],
      newGoodses: [],
      recommends: [],
      categoryList: [
        {
          name: 'Глобальный',  //全球购
          imgUrl: '//s.weituibao.com/1583585285470/qq.png',
          categoryId: 100002
        },
        {
          name: 'Покупки',  //新蜂超市
          imgUrl: '//s.weituibao.com/1583585285461/cs.png',
          categoryId: 100001
        },
        {
          name: 'Удобный',  //新蜂生鲜
          imgUrl: '//s.weituibao.com/1583585285472/sx.png',
          categoryId: 100004
        },
        {
          name: 'Быстрый',  //新蜂到家
          imgUrl: '//s.weituibao.com/1583585285467/dj.png',
          categoryId: 100005
        }
      ],
    }
  },
  components: {
    navBar,  //底部导航
    swiper, //列表
  },
  async mounted() {
    const token = getLocal('token')
    if (token) {
      this.isLogin = true
    }
    window.addEventListener('scroll', this.pageScroll)
    Toast.loading({
      message: 'Данные запроса...',
      forbidClick: true
    });
    const { data } = await getHome()
    this.swiperList = data.carousels
    this.newGoodses = data.newGoodses
    this.hots = data.hotGoodses
    this.recommends = data.recommendGoodses
    // console.log(this.newGoodses)

    Toast.clear()

    this.start()
  },
  methods: {
    pageScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      scrollTop > 100 ? this.headerScroll = true : this.headerScroll = false
    },
    goToDetail(item) {
      this.$router.push({ path: `product/${item.goodsId}` })
    },
    serach() {
      this.$router.push({ path: `./product-list?from=home` })


    },

    start(){
      const  userId =    jsCookie.get('userId') //

      this.timer = setInterval(async () => {
        axios.post('/get/user/msg', {
          "userId":Number(userId),

        }).then(res => {

          // {UserId: 0, MsgText: '', ShowFlag: 0}
          if (res.data.ShowFlag === 0 && res.data.MsgText !== ""){
            this.ShowMsg(res.data.MsgText)
          }

          console.log(res)


        })


      },10000)

    },
    async ShowMsg(text) {

        Dialog.alert({
          message: text,
          confirmButtonText:"подтверждать",
          confirmButtonColor:'#ee0a24',
          theme: 'round-button',
        }).then(() => {
          //联系客服
        }).catch(() => {
          // on cancel
        });

    },




  }
}
</script>

<style lang="less" scoped >
@import '../common/style/mixin';

.home-header {
  position: fixed;
  left: 0;
  top: 0;
  .wh(100%, 50px);
  .fj();
  line-height: 50px;
  padding: 0 15px;
  .boxSizing();
  font-size: 15px;
  color: #fff;
  z-index: 10000;

  .nbmenu2 {
    color: @primary;
  }

  &.active {
    background: @primary;

    .nbmenu2 {
      color: #fff;
    }

    .login {
      color: #fff;
    }
  }

  .header-search {
    display: flex;
    .wh(74%, 20px);
    line-height: 20px;
    margin: 10px 0;
    padding: 5px 0;
    color: #232326;
    background: rgba(255, 255, 255, .7);
    border-radius: 20px;

    .app-name {
      padding: 0 10px;
      color: @primary;
      font-size: 20px;
      font-weight: bold;
      border-right: 1px solid #666;
    }

    .icon-search {
      padding: 0 10px;
      font-size: 17px;
    }

    .search-title {
      font-size: 12px;
      color: #666;
      line-height: 21px;
    }
  }

  .icon-iconyonghu {
    color: #fff;
    font-size: 22px;
  }

  .login {
    color: @primary;
    line-height: 52px;

    .van-icon-manager-o {
      font-size: 20px;
      vertical-align: -3px;
    }
  }
}

.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 13px;

  div {
    display: flex;
    flex-direction: column;
    width: 25%;
    text-align: center;

    img {
      .wh(40px, 40px);
      margin: 13px auto 8px auto;
    }
  }
}

.good {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }

  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .good-item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1PX solid #e9e9e9;
      padding: 10px 10px;

      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }

      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;

        .title {
          color: #222333;
        }

        .price {
          color: @primary;
        }
      }

      &:nth-child(2n + 1) {
        border-right: 1PX solid #e9e9e9;
      }
    }
  }
}

.floor-list {
  width: 100%;
  padding-bottom: 50px;

  .floor-head {
    width: 100%;
    height: 40px;
    background: #F6F6F6;
  }

  .floor-content {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    .boxSizing();

    .floor-category {
      width: 50%;
      padding: 10px;
      border-right: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      .boxSizing();

      &:nth-child(2n) {
        border-right: none;
      }

      p {
        font-size: 17px;
        color: #333;

        &:nth-child(2) {
          padding: 5px 0;
          font-size: 13px;
          color: @primary;
        }
      }

      .floor-products {
        .fj();
        width: 100%;

        img {
          .wh(65px, 65px);
        }
      }
    }
  }
}
</style>
