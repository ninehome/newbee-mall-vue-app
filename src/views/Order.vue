

<template>
  <div class="order-box">
    <s-header :name="'Orders'" :back="'/user'"></s-header>
    <van-tabs @change="onChangeTab"
              :color="'#287FF0'"
              :title-active-color="'#287FF0'"
              class="order-tab"
              v-model="status">

      <van-tab  title="All" name='' ></van-tab>
      <van-tab title="Unpaid" name="0"  ></van-tab>
      <van-tab title="Not Repurchased" name="1"></van-tab>
      <van-tab title="Finish" name="5"></van-tab>

      <!--      <van-tab title="待发货" name="2"></van-tab>-->
      <!--      <van-tab title="已发货" name="3"></van-tab>-->
    </van-tabs>


    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="order-list-refresh" loading-text	="loading ...." loosing-text	="Refresh data" pulling-text	="Pull down and refresh the data">
      <van-list v-model="loading" :finished="finished" finished-text="no more data..." @load="onLoad" @offset="300"  loading-text	="loading ....">
        <div v-for="(item, index) in list" :key="index" class="order-item-box" @click="goTo(item.orderNo)">
          <div class="order-item-header">
            <span style="color: #287FF0">{{ item.orderStatusString }}</span>
          </div>
          <div class="order-item-header">
            <span> {{ item.createTime }}</span>
          </div>

<!--          :price="one.sellingPrice"-->
<!--          currency="₽ "-->
          <van-card v-for="one in item.newBeeMallOrderItemVOS"
                    :key="one.orderId"
                    :num="one.goodsCount"
                     desc="Free Delivery"
                    :title="one.goodsName"
                    :thumb="prefix(one.goodsCoverImg)" >

                <template #footer>
                  <span style="color: #287FF0">₹{{ formatNum(one.sellingPrice) }}  </span>

                </template>
            </van-card>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
import { getOrderList } from '../service/order'
import { prefix } from '@/common/js/utils'
import {getBankList} from "@/service/withdrawl";
import {formatNum} from '../service/number'
export default {
  data() {
    return {
      formatNum:formatNum,
      status: '',
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1
    }
  },
  components: {
    sHeader
  },
  async mounted() {
    // this.onLoad()
  },
  methods: {
    async loadData() {
      // console.log("loadData")
      // console.log("*****************")
      const { data, data: { list } } = await getOrderList({ pageNumber: this.page, status: this.status })

      this.list = this.list.concat(list)
      this.list .sort(function(a, b){return a.orderStatus - b.orderStatus});
      this.totalPage = data.totalPage
      //数据去重


      this.loading = false;
      if (this.page >= data.totalPage) this.finished = true
    },
    onChangeTab(name, title) {
      // console.log(name, "===>", title)
      this.status = name   //查询数据的type
      this.onRefresh()
    },
    goTo(id) {
      this.$router.push({ path: `order-detail?id=${id}` })
    },
    goBack() {
      this.$router.go(-1)
    },
    onLoad() {
      // console.log("onLoad()")
      // console.log("*****************")
      if (!this.refreshing && this.page < this.totalPage) {
        this.page = this.page + 1
      }
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.loadData()
    },
    onRefresh() {
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.page = 1
      this.onLoad()
    },
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.order-box {
  .order-header {
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
    .order-name {
      font-size: 14px;
    }
  }

  .order-tab {
    margin-top: 0px;
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
    .title{
      font-size: 10px;
    }
  }

  .order-list-refresh {
    margin-top: 44px;
    padding-top:20px;
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .van-pull-refresh__head {
      background: #f9f9f9;
    }

    .van-list {
      min-height: calc(100vh - 88px);
      background: #f9f9f9;
      margin-top: 20px;
    }

    .order-item-box {
      margin: 20px 10px;
      background-color: #fff;
      .order-item-header {
        padding: 10px 20px 0 20px;
        display: flex;
        justify-content: space-between;
      }

      .van-card {
        background-color: #fff;
        margin-top: 0;
      }
    }
  }
}
</style>
