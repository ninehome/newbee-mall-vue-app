<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div class="address-edit-box">
    <s-header :name="`${type == 'add' ? 'Add Address' : 'Editorial address'}`"></s-header>
    <!-- <van-address-edit class="edit" :area-list="areaList" :address-info="addressInfo" :show-delete="type == 'edit'"
      show-set-default show-search-result :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" /> -->

    <van-form @submit="onSubmit">
      <van-field v-model="username" name="username" label="Name" placeholder="Please fill in your name"
        :rules="[{ required: true, message: 'Please fill in your name' }]" />
      <van-field v-model="telphone" name="telphone" label=" Phone number" placeholder="Please enter your  phone number"
        :rules="[{ required: true, message: 'Please enter your  phone number' }]" />
      <van-field v-model="address" name="address" label=" Address" placeholder="Please fill in address"
        :rules="[{ required: true, message: 'Please fill in  address' }]" />


      <div style="margin: 16px; margin-top: 50px;">
        <van-button round block type="info" color="#287FF0" native-type="submit" >Save</van-button>
      </div>

      <div style="margin: 16px; margin-top: 50px;">
        <van-button round block type="info" color="#287FF0" @click="onDelete" v-show="bnt_delet">Delete</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { Toast } from 'vant'
import sHeader from '@/components/SimpleHeader'
import { addAddress, EditAddress, DeleteAddress, getAddressDetail } from '../service/address'
import { tdist } from '@/common/js/utils'
export default {
  components: {
    sHeader
  },
  data() {
    return {
      // areaList: {
      //   province_list: {},

      // },
      // searchResult: [],
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
    this.addressId = addressId
    this.type = type
    this.from = from || ''

    //编辑地址
    if (type == 'edit') {
      const { data: addressDetail } = await getAddressDetail(addressId)

      // console.log(addressDetail)
      this.addressInfo = {
        id: addressDetail.addressId,
        name: addressDetail.userName,
        tel: addressDetail.userPhone,
        province: addressDetail.provinceName,
        addressDetail: addressDetail.detailAddress,
        isDefault: !!addressDetail.defaultFlag

      }

      //數據回顯
      this.username = this.addressInfo.name
      this.telphone = this.addressInfo.tel
      this.address  =this.addressInfo.addressDetail
      this.bnt_delet =true  //显示删除按钮
      this.addressId = this.addressInfo.id
    }
  },

  methods: {


    async onSubmit(content) {
      const params = {
        userName: content.username,
        userPhone: content.telphone,
        detailAddress: content.address,
        defaultFlag: 1,
      }
      if (this.type == 'edit') {
        params['addressId'] = this.addressId
      }

      // console.log(this.type)
      const { message } = await this.type == 'add' ? addAddress(params) : EditAddress(params)
      Toast('Saved success')


      setTimeout(() => {
        this.$router.push({ path: `address?from=${this.from}` })
      }, 1000)


    },

    async onDelete() {
      const { data } = await DeleteAddress(this.addressId)
      Toast('Deleted success')
      setTimeout(() => {
        this.$router.push({ path: 'address' })
      }, 1000)
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
