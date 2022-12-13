

<template>
  <div class="order-box">
    <s-header :name="'Мои заказы'" :back="'/user'"></s-header>
    <van-tabs @change="onChangeTab" :color="'#1baeae'" :title-active-color="'#1baeae'" class="order-tab"
      v-model="status">
      <van-tab title="Все" name=''></van-tab>
      <van-tab title="Неоплаченный" name="0"></van-tab>
      <van-tab title="Не выкуплены" name="1"></van-tab>     <!--      <van-tab title="待确认" name="1"></van-tab>-->
<!--      <van-tab title="待发货" name="2"></van-tab>-->
<!--      <van-tab title="已发货" name="3"></van-tab>-->
      <van-tab title="Статус выкупа" name="5"></van-tab>  <!--      <van-tab title="交易完成" name="4"></van-tab>-->
    </van-tabs>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="order-list-refresh">
      <van-list v-model="loading" :finished="finished" finished-text="no more data..." @load="onLoad" @offset="300">
        <div v-for="(item, index) in list" :key="index" class="order-item-box" @click="goTo(item.orderNo)">
          <div class="order-item-header">
            <span>Время заказа：{{ item.createTime }}</span>
            <span style="color: #1baeae">{{ item.orderStatusString }}</span>
          </div>
          <van-card v-for="one in item.newBeeMallOrderItemVOS"
                    :key="one.orderId"
                    :num="one.goodsCount"
                    :price="one.sellingPrice"
                     currency="₽ "
                     desc="Бесплатная доставка" :title="one.goodsName"
                    :thumb="prefix(one.goodsCoverImg)" />
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

export default {
  data() {
    return {
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
    margin-top: 44px;
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
  }

  .order-list-refresh {
    margin-top: 68px;
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
