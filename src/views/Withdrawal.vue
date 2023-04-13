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
    <s-header :name="'Снятие средств'" ></s-header>
    <div class="div-content">
      <div>
        <van-cell class="status" title="Остаток на счете" size="large"  >
          <template>
            <p style="margin:0" :style={color:bindcolor}>{{ formatNum(user_money)}} ₽</p>
          </template>
        </van-cell>
      </div>
<!--      @click="show = true"-->
      <div>
        <van-cell is-link title="Выберите банк-получатель"   @click="itemClick" :value="select_bank" />
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect"  />

      </div>


      <van-form @submit="onSubmit">
        <van-field v-model="withdrawal_money"  type="number" name="withdrawal_money" label="Сумма снятия" placeholder="Пожалуйста, заполните сумму снятия"
                   :rules="[{ required: true, message: 'Пожалуйста, заполните сумму снятия' }]" />
<!--        <van-field v-model="telphone" name="telphone" label="手机号码" placeholder="请填写手机号码"-->
<!--                   :rules="[{ required: true, message: '请填写手机号码' }]" />-->
<!--        <van-field v-model="address" name="address" label="收货地址" placeholder="请填写收货地址"-->
<!--                   :rules="[{ required: true, message: '请填写收货地址' }]" />-->
        <div style="margin:50px; margin-top: 50px;">
          <van-button round block type="info" color="#1baeae" native-type="submit" >Отправить</van-button>
        </div>

      </van-form>


    </div>
  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
import {Image, Toast} from 'vant';
import {getChatList} from "@/service/withdrawl";
import {getUserInfo} from "@/service/user";
import { Dialog } from 'vant'
import {getBankList ,createWithdrawal} from "@/service/withdrawl";
import {formatNum} from '../service/number'
export default {

  data(){
    return{
      formatNum:formatNum,
      bindcolor:"#14dad4",
      user_money:'0.00 ',
      user: {},
      lockedFlag:0,
      tg :'',
      msg: '',
      show: false,
      isChoseBank:false,  //是否已经选择银行
      actions:[],
      select_bank:'',
      withdrawal_money: '',
      bank_id:'',
      bankList:[]


    }
  },

  async mounted() {
    const { data } = await getUserInfo()
    this.user_money = data.userMoney
    this.lockedFlag = data.lockedFlag
    await this.initBanks()

    this.initContact()

  },

  components: {
    sHeader,
  },

  methods: {
     //初始化银行
    async initBanks(){

      const { data,resultCode } = await  getBankList({ pageNumber: 1 })

      if (resultCode === 200){

        if(data == null || data.size === 0){

           // this.jump()

        }else {
          this.bankList = data
          data.forEach((value, index) => {
            let c = {name:value.bankName,subname:value.bankNumber}
            this.actions[index]  = c
          })
        }


      }

    },

    async   initContact(){
      //客服号码
      const {   data} = await getChatList()
      for (var v of data) {
        this.TgInit(v)
      }

    }

    ,

    TgInit(v){

      if (v.Type === 1){
        this.tg = v.ChatValue
      }
    },

    itemClick(){

      if (this.bankList == null || this.bankList.length ===0){
        this.$router.push({path: `add-bank?type=add&from=mine`})
      }else {
        this.show = true
      }

    },

    // jump(path){
    //   this.$router.push({path: `add-bank?type=add&from=mine`})
    // },

    // async loadData() {
    //   const { data, data: { list } } = await createWithdrawal({ pageNumber: this.page, status: this.status })
    //   this.list = this.list.concat(list)
    //   this.totalPage = data.totalPage
    //   this.loading = false;
    //   if (this.page >= data.totalPage) this.finished = true
    // },

    //提款
    async onSubmit(content) {
      //先判断是否限制出款

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



      if (this.isChoseBank === false){
        await this.initBanks()
        this.$toast({
          message:"Пожалуйста, выберите банковский счет получателя",
          duration:500
        })

        return
      }

      if (Number(content.withdrawal_money) === 0){

        this.$toast({
          message:"Сумма вывода не может быть равна 0 ₽",
          duration:500
        })

        return
      }

      // console.log( this.select_bank)

      let bankid = 0
      this.bankList.forEach((value, index) => {
        if ( this.select_bank  === value.bankNumber){
          bankid = value.bankId
        }

      })


        const { data , resultCode} = await createWithdrawal({ withdrawMoney: Number(content.withdrawal_money), bankId:  Number(bankid) })
        if (resultCode === 200){
          this.$toast({
            message:"Success",
            duration:500
          })
          await this.$router.push({path: 'user'})

        }else {
          this.$toast({
            message:"fail",
            duration:500
          })
        }





    },

    onSelect(item){
      // console.log(item);
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
