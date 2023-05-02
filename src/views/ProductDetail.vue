
<!--物品详情-->

<template>
  <div class="product-detail">
    <s-header :name="'Детали продукта'"></s-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <div style="height: 50px;width: 100%" class="like-content">
          <img class="img-like" :src='this.like_url'  @click="ClickLike()"/>
        </div>

        <van-swipe class="my-swipe" indicator-color="#1baeae"  style="height:300px" >
          <van-swipe-item v-for="(item, index) in detail.goodsCarouselList" :key="index">

            <van-image
              width="100%"
              height="300px"
              fit="contain"
              :src="prefix(item)"
            />
          </van-swipe-item>

        </van-swipe>


      </div>
      <div class="product-info">
        <div class="product-title">
          {{ detail.goodsName }}
        </div>
        <div class="product-desc">Бесплатная доставка</div>
        <div class="product-price">
          <span>{{  formatNum(detail.sellingPrice) }} ₽</span>
          <!-- <span>库存203</span> -->
        </div>

        <div  v-if="countTime"  class="count-down-div" style="margin-bottom: 5px;margin-top: 5px">
          <van-count-down :time="time" @finish="onFinish">
            <template #default="timeData">
<!--              <span class="block">{{ timeData.hours }}</span>-->
<!--              <span class="colon">:</span>-->
              <span class="block">0{{ timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>

        <van-tag  v-if="countFinish"   type="warning" >Время покупки истекло</van-tag>

      </div>
      <div class="product-intro">
        <ul>
          <li>Обзор</li>
          <li>Параметры</li>
          <li>Услуги</li>
          <li>Рекомендации</li>
        </ul>
        <div class="product-content" v-html="detail.goodsDetailContent"></div>
      </div>
    </div>


    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="   " />
      <van-goods-action-icon icon="cart-o" :info="!count ? '' : count" @click="goTo()" text=" " />
      <van-goods-action-button type="warning" @click="addCart" text="Добавить в корзину" />
      <van-goods-action-button type="danger" @click="goToCart" text="Купить сейчас" />
    </van-goods-action>
  </div>


</template>

<script>
import { getDetail } from '../service/good'
import { addCart } from '../service/cart'
import sHeader from '@/components/HeaderDetaily'
import {Dialog, Toast} from 'vant'
import {formatNum} from '../service/number'
import jsCookie from "js-cookie";
import like_black from '../../static-files/like/love_black.png'
import like_read from  '../../static-files/like/love_red.png'
export default {
  data() {
    return {
      formatNum:formatNum,
      detail: {
        goodsCarouselList: []
      },
      like_url:like_black,
      htmlstr:"",
      active:0,
      time: 5 * 60 * 1000,
      total:3,
      like:[],
      countFinish: false,
      countTime: true,
      goodId:''
    }
  },
  components: {
    sHeader
  },
  async mounted() {
    const { id } = this.$route.params
    this.goodId = id
    const { data } = await getDetail(id)
    this.detail = data

    //读取本地存储的
     await this.getLikeList()
  },
  methods: {


    onFinish() {
      // Toast('倒计时结束');
      this.countFinish = true
      this.countTime = false
    },
    goBack() {
      this.$router.go(-1)
    },
    goTo() {
      this.$router.push({ path: '/cart' })
    },
    async addCart() {

      if(this.countFinish === true){
        Dialog.alert({
          message: 'Время покупки прошло',
          confirmButtonText:"подтверждать",
          confirmButtonColor:'#ee0a24',
          theme: 'round-button',
        }).then(() => {
          //联系客服
        }).catch(() => {
          // on cancel
        });
        return
      }


      const { data, resultCode } = await addCart({ goodsCount: 1, goodsId: this.detail.goodsId })
      if (resultCode === 200) Toast.success('Добавлено успешно')
      await this.$store.dispatch('updateCart')
    },
    async goToCart() {
      if(this.countFinish === true){
        Dialog.alert({
          message: 'Время покупки прошло',
          confirmButtonText:"подтверждать",
          confirmButtonColor:'#ee0a24',
          theme: 'round-button',
        }).then(() => {
          //联系客服
        }).catch(() => {
          // on cancel
        });
        return
      }

      const { data, resultCode } = await addCart({ goodsCount: 1, goodsId: this.detail.goodsId })
      await this.$store.dispatch('updateCart')
      await this.$router.push({path: '/cart'})
    },

    ClickLike(){
      const  saveLike  =  jsCookie.get('like')
      if (saveLike == null || saveLike === ""){
        jsCookie.set('like', this.goodId.toString())
      }else {
        jsCookie.set('like', saveLike.toString() +"noe"+this.goodId.toString())
      }
      this.like_url = like_read

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



    }


  },
  computed: {
    count() {
      return this.$store.state.cartCount
    }
  }
}
</script>

<style lang="less">
@import '../common/style/mixin';

.product-detail {
  .detail-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;

    .product-name {
      font-size: 14px;
    }
  }

  .detail-content {
    margin-top: 44px;

    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }

      .like-content{
        display: flow;
        .img-like{
          width: 33px;
          height: 33px;
          margin-right: 15px;
          margin-top: 10px;
          position: absolute;
          left: 90%;
        }

      }


    }

    .product-info {
      padding: 0 10px;

      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .colon {
        display: inline-block;
        margin: 0 4px;
        color: #1baeae;
      }
      .block {
        display: inline-block;
        width: 22px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color:#1baeae;
      }

      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }

      .product-price {
        .fj();

        span:nth-child(1) {
          color: #F63515;
          font-size: 22px;
        }

        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }

    .product-intro {
      width: 100%;

      ul {
        .fj();
        width: 100%;
        margin: 10px 0;

        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;

          &:last-child {
            border-right: none;
          }
        }
      }

      .product-content {
        padding: 0 20px;
        margin-bottom:60px;
        img {
          width: 100%;
        }
      }
    }
  }

  .van-goods-action-button--warning {
    background: linear-gradient(to right, @primary_start, @primary)
  }

  .van-goods-action-button--danger {
    background: linear-gradient(to right, @primary_start, @primary)
  }
}
</style>
