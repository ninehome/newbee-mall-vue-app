<!--

 *
-->

<template>
  <div class="cart-box">
    <div class="header_title">
      Cesta
    </div>


    <div class="cart-body">
      <van-checkbox-group @change="groupChange" v-model="result" ref="checkboxGroup">
        <van-swipe-cell :right-width="50" v-for="(item, index) in list" :key="index">

          <div class="good-item">
            <van-checkbox :name="item.cartItemId" />
            <div class="good-img"><img :src="prefix(item.goodsCoverImg)" alt=""></div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{ item.goodsName }}</span>
                <span>x{{ item.goodsCount }}</span>
              </div>
              <div class="good-btn">
                <div class="price">{{    formatNum(item.sellingPrice) }} R$</div>
                <van-stepper integer :min="1" :value="item.goodsCount" :name="item.cartItemId" async-change
                  @change="onChange" />
              </div>
            </div>
          </div>
          <van-button slot="right" square icon="delete" type="danger" class="delete-button"
            @click="deleteGood(item.cartItemId)" />
          <div  v-if="allCountTime[index]"  class="count-down-div" style="margin-bottom: 8px;margin-top: 1px ;margin-left: 2px">
            <van-count-down :time="listTime[index]" @finish="onFinish(index)">
              <template #default="timeData">
                <span class="block">0{{ timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds }}</span>
              </template>
            </van-count-down>
          </div>
          <van-tag  v-if="allFinish[index]"  type="warning" >O prazo para compra expirou</van-tag>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar v-if="list.length > 0" class="submit-all"  button-text="Comprar" @submit="onSubmit" >
      <van-checkbox @click="allCheck" v-model="checkAll">Selecionar tudo</van-checkbox>

      <div >
        <span style="color: #1baeae">{{ formatNum(total) }} R$ </span>
      </div>

    </van-submit-bar>


    <div class="empty" v-if="!list.length">
      <van-icon name="smile-o" />
      <div class="title">A cesta está vazia</div>
      <van-button class="bnt" type="primary" @click="goTo" block>Fazer compras</van-button>
    </div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import {Dialog, Toast} from 'vant'
import navBar from '@/components/NavBar'
import sHeader from '@/components/SimpleHeader'
import { getCart, deleteCartItem, modifyCart } from '../service/cart'
import {formatNum} from '../service/number'
export default {
  data() {
    return {
      checked: false,
      list: [],
      all: false,
      result: [],
      checkAll: true,
      formatNum:formatNum,
      haveTimeCount :false,
      // countFinish: false,
      // countTime: true,
      // time: 5 * 60 * 1000,
      listTime:    [5000,10000,15000,18000,14000,5000,10000,15000,18000,14000,5000,10000,15000,18000,14000,5000,10000,15000,18000,14000,5000,10000,15000,18000,14000,14000,5000,10000,15000,18000,14000],
      allFinish:   [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      allCountTime:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
    }
  },
  components: {
    navBar,

  },
  mounted() {
    this.init()
  },
  computed: {
    total: function () {
      let sum = 0
      let _list = this.list.filter(item => this.result.includes(item.cartItemId))
      _list.forEach(item => {
        sum += item.goodsCount * item.sellingPrice
      })
      return sum
    }
  },
  methods: {
    async init() {


      Toast.loading({ message: 'Carregando...', forbidClick: true });
      const { data } = await getCart({ pageNumber: 1 })
      if (data == null) {
        this.list = []
        this.result = []
      } else {

        for(let key = 0; key < data.length; key++){
          const nowTime = Math.floor(Date.now()/1000)

          console.log(data[key].countTime )
          const dataTime = data[key].countTime
          // console.log("现在的时间戳")
          if (dataTime === 0){
            this.$data.allFinish[key] = false
            this.$data.allCountTime[key] = false
          }else {
            if (nowTime >= dataTime){
              this.$data.allFinish[key] = true
              this.$data.allCountTime[key] = false
            }else {
              this.listTime[key] = (dataTime - nowTime) * 1000
              this.$data.allCountTime[key] = true
              this.$data.allFinish[key] = false
            }
          }
        }

        this.list = data
        this.result = data.map(item => item.cartItemId)
      }

      Toast.clear()

    },

    onFinish(index) {
      // Toast('倒计时结束');
      this.allFinish[index] = true
      this.allCountTime[index] = false
      this.init()
      // this.countFinish = true
      // this.countTime = false
    },
    goBack() {
      this.$router.go(-1)

    },
    goTo() {
      this.$router.push({ path: 'home' })
    },
    async onChange(value, detail) {
      if (this.list.filter(item => item.cartItemId === detail.name)[0].goodsCount === value) return
      Toast.loading({ message: 'Modificações em andamento...', forbidClick: true });
      const params = {
        cartItemId: detail.name,
        goodsCount: value
      }
      const { data } = await modifyCart(params)
      this.list.forEach(item => {
        if (item.cartItemId === detail.name) {
          item.goodsCount = value
        }
      })
      Toast.clear();
    },
    async onSubmit() {

      if (this.result.length === 0) {
        Toast.fail('Selecione um produto')
        return
      }

      //判断是否有时间过期商品。如果有不许购买
      for(let key = 0; key <   this.list.length; key++){
        const nowTime = Math.floor(Date.now()/1000)
        const dataTime =  this.list[key].countTime
        console.log(this.result)
        if ( dataTime !== 0 && nowTime > dataTime){
          this.haveTimeCount =  true  //有过期无法购买商品
          break
        }
      }



      if(this.haveTimeCount === true){
        Dialog.alert({
          message: 'O momento de comprar já passou',
          confirmButtonText:"confirmar",
          confirmButtonColor:'#ee0a24',
          theme: 'round-button',
        }).then(() => {
          //联系客服
        }).catch(() => {
          // on cancel
        });
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
      if (result.length === this.list.length) {
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
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;

    .van-icon-smile-o {
      font-size: 50px;
    }

    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .bnt{
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
