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
  <div class="cart-box">
    <div class="header_title">
      Моя коллекция
    </div>

    <div class="good">

      <div class="good-box">
        <div class="good-item" v-for="item in list" :key="item.goodsId" @click="goToDetail(item)">
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



    <div class="empty" v-if="!list.length">
<!--      <van-icon name="smile-o" />-->
      <van-icon name="goods-collect-o" />
      <van-button class="bnt" type="primary" @click="goTo" block>Clique para selecionar produtos</van-button>
    </div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import { Toast } from 'vant'
import navBar from '@/components/NavBar'
import sHeader from '@/components/SimpleHeader'
import { getCart, deleteCartItem, modifyCart } from '../service/cart'
import {formatNum} from '../service/number'
import jsCookie from "js-cookie";
import like_read from "../../static-files/like/love_red.png";
import { getDetail } from '../service/good'
export default {
  data() {
    return {
      checked: false,
      list: [],
      all: false,
      result: [],
      checkAll: true,
      formatNum:formatNum,

    }
  },
  components: {
    navBar,

  },
  mounted() {
    this.init()
  },
  // computed: {
  //   total: function () {
  //     let sum = 0
  //     let _list = this.list.filter(item => this.result.includes(item.cartItemId))
  //     _list.forEach(item => {
  //       sum += item.goodsCount * item.sellingPrice
  //     })
  //     return sum
  //   }
  // },
  methods: {
    async init() {
      const  saveLike  =  jsCookie.get('like')
      if ( saveLike != null && saveLike !== ""){
        this.like = saveLike.split("noe")

        for (const ids of this.like) {
          if(ids === this.goodId){
            const { data } = await getDetail(id)
            this.detail = data

            // this.like_url = like_read
          }

        }


      }




      // Toast.loading({ message: 'Загрузка...', forbidClick: true });
      // const { data } = await getCart({ pageNumber: 1 })
      // if (data == null) {
      //   this.list = []
      //   this.result = []
      // } else {
      //   this.list = data
      //   this.result = data.map(item => item.cartItemId)
      // }
      //
      // Toast.clear()

    },
    goBack() {
      this.$router.go(-1)

    },
    goTo() {
      this.$router.push({ path: 'home' })
    },
    async onChange(value, detail) {
      if (this.list.filter(item => item.cartItemId == detail.name)[0].goodsCount == value) return
      Toast.loading({ message: 'Modificações em andamento...', forbidClick: true });
      const params = {
        cartItemId: detail.name,
        goodsCount: value
      }
      const { data } = await modifyCart(params)
      this.list.forEach(item => {
        if (item.cartItemId == detail.name) {
          item.goodsCount = value
        }
      })
      Toast.clear();
    },
    async getLikeList(){
      const  saveLike  =  jsCookie.get('like')
      if ( saveLike != null && saveLike !== ""){
        this.like = saveLike.split("noe")
        for (const ids of this.like) {
          if(ids === this.goodId){
            this.like_url = like_read
          }
        }
      }
    },
    async onSubmit() {
      if (this.result.length == 0) {
        Toast.fail('Selecione um produto')
        return
      }
      const params = JSON.stringify(this.result)
      // for (let i = 0; i < this.result.length; i++) {
      //   await deleteCartItem(this.result[i])
      // }
      this.$router.push({ path: `create-order?cartItemIds=${params}` })
    },
    async deleteGood(id) {

      Toast.loading({ message: 'Carregando...', forbidClick: true });
      const { data } = await deleteCartItem(id)
      Toast.clear()

      this.$store.dispatch('updateCart')  //更新 navbar 的购物车数据

      this.init()
      // this.$router.go(0)   //刷新整个页面，更列表数据



    },
    groupChange(result) {
      if (result.length == this.list.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
      this.result = result
    },
    allCheck(value) {
      if (!this.checkAll) {
        this.result = this.list.map(item => item.cartItemId)
      } else {
        this.result = []
      }
    }
  }
}
</script>

<style lang="less">
@import '../common/style/mixin';

.cart-box {
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



  .cart-body {
    margin: 10px 0 100px 0;
    padding-left: 10px;

    .good-item {
      display: flex;

      .good-img {
        img {
          .wh(100px, 100px)
        }
      }

      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;

        .good-title {
          display: flex;
          justify-content: space-between;
        }

        .good-btn {
          display: flex;
          justify-content: space-between;

          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }

          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }

    .delete-button {
      width: 50px;
      height: 100%;
    }
  }

  .empty {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;

    .van-icon-goods-collect-o {
      font-size: 50px;
    }

    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .bnt{
      margin-top: 20px;
      padding-right: 5px;
      padding-left: 5px;
      background-color:@primary ;
      color: #ffffff;
    }
  }

  .submit-all {
    width: 100%;
    margin-bottom: 47px;
    display: flex;
    .van-checkbox {
      width: 130px;

    }

    .van-submit-bar__text {
      //margin-right: 10px
      width: 200px;
    }

    .van-submit-bar__button {
      background: @primary;
      margin-left: 50px;
      width: 100px;
    }
  }

  .van-checkbox__icon--checked .van-icon {
    background-color: @primary;
    border-color: @primary;
  }
}
</style>
