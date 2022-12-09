<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *-->
<template>
  <div class="bank-box">
    <s-header :name="'提款'"></s-header>


    <div class="div-content">


      <div>

        <van-cell class="status" title="账户余额" size="large"  >
          <template>
            <p style="margin:0" :style={color:bindcolor}>{{user_money}}</p>
          </template>
        </van-cell>

      </div>




      <div>

        <van-cell is-link title="选择收款银行" @click="show = true" :value="select_bank" />
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect"  />

      </div>


      <van-form @submit="onSubmit">
        <van-field v-model="withdrawal_money" name="withdrawal_money" label="提款金额" placeholder="请填写提款金额"
                   :rules="[{ required: true, message: '请填写用户名' }]" />
<!--        <van-field v-model="telphone" name="telphone" label="手机号码" placeholder="请填写手机号码"-->
<!--                   :rules="[{ required: true, message: '请填写手机号码' }]" />-->
<!--        <van-field v-model="address" name="address" label="收货地址" placeholder="请填写收货地址"-->
<!--                   :rules="[{ required: true, message: '请填写收货地址' }]" />-->


        <div style="margin: 16px; margin-top: 50px;">
          <van-button round block type="info" color="#1baeae" native-type="submit" >提交</van-button>
        </div>

      </van-form>



    </div>
  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
import {Image, Toast} from 'vant';

import {getUserInfo} from "@/service/user";
import {addAddress, EditAddress} from "@/service/address";
import {getOrderList} from "@/service/order";
export default {

  data(){
    return{
      bindcolor:"#14dad4",
      user_money:'0.00 ₽',
      user: {},

      msg: '',
      show: false,
      isChoseBank:false,  //是否已经选择银行
      actions:[],
      select_bank:'',
      withdrawal_money: '',


    }
  },

  async mounted() {
    const { data } = await getUserInfo()
    this.user_money = data.userMoney +" ₽"
    this.user = data
    this.actions = [{name: '银行1',subname: '111111111111111'}, {name: '银行2',subname: '222222222222222'}, {name: '银行3', subname: '3333333333'}]
  },

  components: {
    sHeader,
  },

  methods: {


    async loadData() {
      const { data, data: { list } } = await getOrderList({ pageNumber: this.page, status: this.status })
      this.list = this.list.concat(list)
      this.totalPage = data.totalPage
      this.loading = false;
      if (this.page >= data.totalPage) this.finished = true
    },

    async onSubmit(content) {

      if (this.isChoseBank === false){
        this.$toast({
          message:"请选择收款银行账户",
          duration:500
        })
      }


      console.log(content.withdrawal_money)
      // const params = {
      //   userName: content.username,
      //   userPhone: content.telphone,
      //   detailAddress: content.address,
      //   defaultFlag: 1,
      // }
      // if (this.type == 'edit') {
      //   // console.log(333333333333)
      //   params['addressId'] = this.addressId
      // }
      //
      // // console.log(this.type)
      // const { message } = await this.type == 'add' ? addAddress(params) : EditAddress(params)
      // Toast('保存成功')
      //
      //
      // setTimeout(() => {
      //   this.$router.push({ path: `address?from=${this.from}` })
      // }, 1000)


    },

    onSelect(item){
      console.log(item);
      this.show = false;
      if (item.subname !== ""){
        this.select_bank = item.subname
        this.isChoseBank = true
      }



      // this.$toast({
      //   message:item.name,
      //   duration:500
      // })
    },


  }
}
</script>

<style lang="less" scoped>

  .bank-box {
    //margin-top: 44px;
    .div-content{
      margin-top: 44px;
    }


}
</style>
