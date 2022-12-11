

<template>
  <div class="address-edit-box">
    <s-header :name="`${type == 'add' ? '新增提现账户' : '编辑提现账户'}`"></s-header>
    <!-- <van-address-edit class="edit" :area-list="areaList" :address-info="addressInfo" :show-delete="type == 'edit'"
      show-set-default show-search-result :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" /> -->

    <van-form @submit="onSubmit">

      <van-field v-model="telphone" name="telphone" label="银行名称" placeholder="请填写银行名称"
        :rules="[{ required: true, message: '请填写银行名称' }]" />
      <van-field v-model="address" name="address" label="银行账户号" placeholder="请填写银行账户号"
        :rules="[{ required: true, message: '请填写银行账号' }]" />
      <van-field v-model="username" name="username" label="账户姓名" placeholder="请填写姓名"
                 :rules="[{ required: true, message: '请填写用户名' }]" />

      <div style="margin: 16px; margin-top: 100px;">
        <van-button round block type="info" color="#1baeae" native-type="submit"  >保存</van-button>
      </div>

<!--      <div style="margin: 16px; margin-top: 50px;">-->
<!--        <van-button round block type="info" color="#1baeae" @click="onDelete" v-show="bnt_delet">删除</van-button>-->
<!--      </div>-->
    </van-form>
    <div style="margin: 16px; margin-top: 50px;">
      <van-button round block type="info" color="#1baeae" @click="onDelete" v-show="bnt_delet">删除</van-button>
    </div>


  </div>
</template>

<script>
import { Toast } from 'vant'
import sHeader from '@/components/SimpleHeader'
import {addAddress, EditAddress, DeleteBank,  getBankDetail} from '../service/bank'
import { tdist } from '@/common/js/utils'
export default {
  components: {
    sHeader
  },
  data() {
    return {
      type: 'add',
      addressId: '',
      addressInfo: {},
      // from: ''
      username: '',
      telphone: '',
      address: '',
      bnt_delet:false

    }
  },
  async mounted() {
    //http://localhost:8080/#/address-edit?type=edit&addressId=5&from=mine
    const { addressId, type, from } = this.$route.query   //获取地址后面的参数
    // this.addressId = addressId
    this.type = type
    this.from = from || ''
    console.log(addressId)
    console.log(445555)
    this.addressId  = addressId
    console.log(  this.addressId)
    //编辑地址
    if (type == 'edit') {
      const { data: addressDetail } = await getBankDetail(addressId)

      this.addressInfo = {
        id: addressDetail.addressId,
        name: addressDetail.userName,
        tel: addressDetail.bankName,
        province: addressDetail.provinceName,
        addressDetail: addressDetail.bankNumber,
        isDefault: !!addressDetail.defaultFlag

      }

      //數據回顯
      this.username = this.addressInfo.name
      this.telphone = this.addressInfo.tel
      this.address  =this.addressInfo.addressDetail
      this.bnt_delet =true  //显示删除按钮
      // this.addressId = this.addressInfo.id
    }
  },

  methods: {

    //新增 或者 修改 银行账户
    async   onSubmit(content) {

      const params = {
        userName: content.username,
        bankName: content.telphone,
        BankNumber: content.address,
        // defaultFlag: 1,
      }
      if (this.type == 'edit') {
        params['addressId'] = this.addressId
      }


      console.log(4434444444444)
      const { resultCode } =  this.type == 'add' ?await addAddress(params) :await EditAddress(params)
      // Toast('保存成功')
      console.log(resultCode)
      if (resultCode === 200) {
        Toast('Success')
      } else {
        Toast('Fail')
      }


      setTimeout(() => {
      this.$router.push({ path: 'bank' })
      }, 600)


    },

     async onDelete() {
       console.log(2233333333)
       console.log(this.addressId)

       const { resultCode} = await DeleteBank(this.addressId)


       console.log(resultCode)
       if (resultCode === 200) {
         Toast('Success')
       } else {
         Toast('Fail')
       }

       setTimeout(() => {
         this.$router.push({ path: 'bank' })
       }, 300)
     }
  }
}
</script>

<style lang="less">
@import '../common/style/mixin';

.address-edit-box {
  margin-top: 44px;

  .van-address-edit {
    .van-button--danger {
      background: @primary;
      border-color: @primary;
    }

    .van-switch--on {
      background: @primary;
    }
  }
}
</style>
