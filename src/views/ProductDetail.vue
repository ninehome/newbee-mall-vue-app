
<!--物品详情-->

<template>
  <div class="product-detail">
    <s-header :name="'Детали продукта'"></s-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae"  style="height:300px" >
          <van-swipe-item v-for="(item, index) in detail.goodsCarouselList" :key="index">
<!--            <img :src="prefix(item)" alt=""  STYLE="background-size: auto">-->
<!--            <img :src="item" alt="">-->
            <van-image
              width="100%"
              height="300px"
              fit="contain"
              :src="prefix(item)"
            />

          </van-swipe-item>

<!--          <template #indicator="{ this:active, this:total }">-->
<!--            <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>-->
<!--          </template>-->

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
import { Toast } from 'vant'
import {formatNum} from '../service/number'
export default {
  data() {
    return {
      formatNum:formatNum,
      detail: {
        goodsCarouselList: []
      },
      htmlstr:"",
      active:0,
      total:3
    }
  },
  components: {
    sHeader
  },
  async mounted() {
    const { id } = this.$route.params
    const { data } = await getDetail(id)
    this.detail = data
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goTo() {
      this.$router.push({ path: '/cart' })
    },
    async addCart() {
      const { data, resultCode } = await addCart({ goodsCount: 1, goodsId: this.detail.goodsId })
      if (resultCode == 200) Toast.success('Добавлено успешно')
      this.$store.dispatch('updateCart')
    },
    async goToCart() {
      const { data, resultCode } = await addCart({ goodsCount: 1, goodsId: this.detail.goodsId })
      this.$store.dispatch('updateCart')
      this.$router.push({ path: '/cart' })
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
    }

    .product-info {
      padding: 0 10px;

      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
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
