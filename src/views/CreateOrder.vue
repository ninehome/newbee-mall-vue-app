<!--
确认支付页面

-->

<template>
  <div class="create-order">
    <s-header :name="'Детали оплаты товара'" @callback="deleteLocal"></s-header>
    <div class="address-wrap">
      <div class="name" @click="goTo">
        <span>{{ address.userName }} </span>
        <span>{{ address.userPhone }}</span>
      </div>
      <div class="address">
        {{ address.provinceName }} {{ address.cityName }} {{ address.regionName }} {{ address.detailAddress }}
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="good">
      <div class="good-item" v-for="(item, index) in cartList" :key="index">
        <div class="good-img"><img :src="prefix(item.goodsCoverImg)" alt=""></div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.goodsName }}</span>
            <span>x{{ item.goodsCount }}</span>
          </div>
          <div class="good-btn">
            <div class="price">{{formatNum(item.sellingPrice)}} ₽ </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>Общая сумма платежа</span>
        <span>₽{{ total }}</span>
      </div>
      <van-button @click="createOrder" class="pay-btn" color="#1baeae" type="primary" block>Подтвердить оплату</van-button>
    </div>
    <!-- <van-popup closeable :close-on-click-overlay="false" v-model="showPay" position="bottom" :style="{ height: '30%' }"
      @close="close">
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block @click="payOrder(1)">支付宝支付</van-button>
        <van-button color="#4fc08d" block @click="payOrder(2)">微信支付</van-button>
      </div>
    </van-popup> -->
  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
import { getCart, getByCartItemIds } from '../service/cart'
import { getDefaultAddress, getAddressDetail } from '../service/address'
import { createOrder, payOrder } from '../service/order'
import { setLocal, getLocal } from '@/common/js/utils'
import {Dialog, Toast} from 'vant'
import {formatNum} from '../service/number'
import {getUserInfo} from "@/service/user";
import { timeout } from 'q'
export default {
  components: {
    sHeader
  },
  data() {
    return {
      cartList: [],
      address: {},
      showPay: false,
      lockedFlag:0,
      orderNo: '',
      cartItemIds: [],
      formatNum:formatNum
    }
  },
  async mounted() {
    const {data} = await getUserInfo()
    this.lockedFlag = data.lockedFlag

    await this.init()
  },
  methods: {
    async init() {
      Toast.loading({ message: 'Данные запроса...', forbidClick: true });
      const { addressId, cartItemIds } = this.$route.query
      const _cartItemIds = cartItemIds ? JSON.parse(cartItemIds) : JSON.parse(getLocal('cartItemIds'))
      setLocal('cartItemIds', JSON.stringify(_cartItemIds))
      const { data: list } = await getByCartItemIds({ cartItemIds: _cartItemIds.join(',') })
      const { data: address, resultCode } = addressId ? await getAddressDetail(addressId) : await getDefaultAddress()

      // console.log(resultCode)
      if (resultCode != 200) {
        setTimeout(() => {
          this.$router.push({ path: '/address' })
        }, 1200);

        return
      }

      this.cartList = list
      this.address = address
      Toast.clear()
    },
    goTo() {
      this.$router.push({ path: `address?cartItemIds=${JSON.stringify(this.cartItemIds)}` })
    },
    deleteLocal() {
      setLocal('cartItemIds', '')
    },

    async createOrder() {
      //先判断是否限制购买


      if(this.lockedFlag ==1){


        Dialog.alert({
          message: 'Счет был заморожен, пожалуйста, свяжитесь с вашем наставником для принятий мер по исправлению ситуации',
          confirmButtonText:"подтверждать",
          confirmButtonColor:'#ee0a24',
          theme: 'round-button',
        }).then(() => {
          //联系客服
          // if(this.tg !=''){
          //   window.open(this.tg, '_blank') // 新窗口打开外链接
          // }


        }).catch(() => {
          // on cancel
          // if(this.tg !=''){
          //   window.open(this.tg, '_blank') // 新窗口打开外链接
          // }

        });



        return
      }





      const params = {
        addressId: this.address.addressId,
        cartItemIds: this.cartList.map(item => item.cartItemId)
      }
      const { data, resultCode, message } = await createOrder(params)  //创建订单

      if (resultCode == 200) {
        // console.log(data)
        // console.log(resultCode)
        setLocal('cartItemIds', '')
        this.orderNo = data
        // console.log(data)


        // console.log('------>>>0000000000000')
        const { paydata, resultCode } = await payOrder({ orderNo: this.orderNo, payType: 1 })  //支付
        if (resultCode === 200) {
          await this.$router.push({path: '/order'})
          await this.$router.push({path: `order-detail?id=${this.orderNo}`})
        }else {
          await this.$router.push({path: '/order'})

        }


      } else {
        //支付失败返回购物车

        if (message != null) {
          Toast.fail(message)

        }


        setTimeout(() => {
          this.$router.push({ path: '/cart' })
        }, 2000);

      }



    },
    close() {
      this.$router.push({ path: 'order' })
    },
    async payOrder(type) {
      Toast.loading
      await payOrder({ orderNo: this.orderNo, payType: type })
      this.$router.push({ path: 'order' })
    }
  },
  computed: {
    total: function () {
      let sum = 0
      this.cartList.forEach(item => {
        sum += item.goodsCount * item.sellingPrice
      })
      return sum
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.create-order {
  background: #f9f9f9;

  .address-wrap {
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    margin-top: 44px;
    font-size: 14px;
    padding: 15px;
    color: #222333;

    .name,
    .address {
      margin: 10px 0;
    }

    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }

    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      background-size: 80px;
      content: '';
    }
  }

  .good {
    margin-bottom: 120px;
  }

  .good-item {
    padding: 10px;
    background: #fff;
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

  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;

    >div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;

      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }

    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
