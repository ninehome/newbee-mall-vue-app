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
            <div class="price">{{formatNum(item.sellingPrice) }} KZT</div>
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
            <div class="price"> {{formatNum(item.sellingPrice) }} KZT</div>
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
            <div class="price">{{ formatNum(item.sellingPrice ) }} KZT</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import CryptoJS from 'crypto-js/crypto-js'
export default {
  name: 'home',
  data() {
    return {

    }
  },
  components: {

  },
  async mounted() {

    this.encrypt();

  },
  methods: {

    async  encrypt() {
     var   keyStr = "sdfg5468wwdfd542sd4asdf4sadfqd12";
     var   ivStr =  "0000000000000000";
      let key = CryptoJS.enc.Utf8.parse(keyStr);
      let iv = CryptoJS.enc.Utf8.parse(ivStr);
      let txt = CryptoJS.enc.Utf8.parse('是一种基础的加密方式密文被分割成分组长度相等的块');

      let encrypted = CryptoJS.AES.encrypt(txt, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      console.log('22121212121212');
      console.log(encrypted.toString());
      console.log('22121212121212');
      this.Decrypt(encrypted.toString())
    },

    async  Decrypt(str) {
      var   keyStr = "sdfg5468wwdfd542sd4asdf4sadfqd12";
      var   ivStr =  "0000000000000000";
      let key = CryptoJS.enc.Utf8.parse(keyStr);
      let iv = CryptoJS.enc.Utf8.parse(ivStr);

      let base64 = CryptoJS.enc.Base64.parse(str);
      let src = CryptoJS.enc.Base64.stringify(base64);

      var decrypt = CryptoJS.AES.decrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,            //这里可以选择AES解密的模式
        padding: CryptoJS.pad.Pkcs7
      });

      var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
      console.log(decryptedStr.toString());
    }





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
