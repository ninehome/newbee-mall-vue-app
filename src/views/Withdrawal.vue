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

import {getBankList ,createWithdrawal} from "@/service/withdrawl";
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
      bank_id:''


    }
  },

  async mounted() {
    const { data } = await getUserInfo()
    this.user_money = data.userMoney +" ₽"

    await this.initBanks()


  },

  components: {
    sHeader,
  },

  methods: {
     //初始化银行
    async initBanks(){
      const { data,resultCode } = await  getBankList({ pageNumber: 1 })

      if (resultCode === 200){

        if(data.size()===0){

          await this.$router.push({path: `add-bank?type=add&from=${this.from}`})

          return
        }


        data.forEach((value, index) => {
          var c = {name:value.bankName,subname:value.bankNumber}
          this.actions[index]  = c
        })
      }

    },

    // async loadData() {
    //   const { data, data: { list } } = await createWithdrawal({ pageNumber: this.page, status: this.status })
    //   this.list = this.list.concat(list)
    //   this.totalPage = data.totalPage
    //   this.loading = false;
    //   if (this.page >= data.totalPage) this.finished = true
    // },

    async onSubmit(content) {
      if (this.isChoseBank === false){
        await this.initBanks()
        this.$toast({
          message:"请选择收款银行账户",
          duration:500
        })

        return
      }

      this.actions.forEach((value, index) => {
        if ( this.select_bank  === value.bankNumber){
          this.bank_id = value.bank_id
        }

      })


        console.log(content.withdrawal_money)
        const { data , resultCode} = await createWithdrawal({ withdrawMoney: Number(content.withdrawal_money), bankId:  Number(this.bank_id) })
        if (resultCode === 200){
          setTimeout(() => {
            this.$router.push({ path: 'user' })
          }, 500)

        }
        console.log(data)


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
