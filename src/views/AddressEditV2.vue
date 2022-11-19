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
    <s-header :name="`${type == 'add' ? '新增地址' : '编辑地址'}`"></s-header>
    <!-- <van-address-edit class="edit" :area-list="areaList" :address-info="addressInfo" :show-delete="type == 'edit'"
      show-set-default show-search-result :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" /> -->

    <van-form @submit="onSubmit">
      <van-field v-model="username" name="username" label="姓名" placeholder="请填写姓名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="telphone" name="telphone" label="手机号码" placeholder="请填写手机号码"
        :rules="[{ required: true, message: '请填写手机号码' }]" />
      <van-field v-model="address" name="address" label="收货地址" placeholder="请填写收货地址"
        :rules="[{ required: true, message: '请填写收货地址' }]" />



      <div style="margin: 16px; margin-top: 50px;">
        <!-- <div class="link-register" @click="toggle('register')">立即注册</div> -->
        <van-button round block type="info" color="#1baeae" native-type="submit">保存</van-button>
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
      address: ''

    }
  },
  async mounted() {
    //   // 省市区列表构造
    //   let _province_list = {}

    //   tdist.getLev1().forEach(p => {
    //     _province_list[p.id] = p.text

    //   })
    //   this.areaList.province_list = _province_list


    //   //http://localhost:8080/#/address-edit?type=edit&addressId=5&from=mine 
    const { addressId, type, from } = this.$route.query   //获取地址后面的参数
    this.addressId = addressId
    this.type = type
    this.from = from || ''

    //编辑地址
    if (type == 'edit') {
      const { data: addressDetail } = await getAddressDetail(addressId)
      let _areaCode = ''
      // const province = tdist.getLev1()
      // Object.entries(this.areaList.county_list).forEach(([id, text]) => {
      //   // 先找出当前对应的区
      //   if (text == addressDetail.regionName) {
      //     // 找到区对应的几个省份
      //     const provinceIndex = province.findIndex(item => item.id.substr(0, 2) == id.substr(0, 2))
      //     // 找到区对应的几个市区
      //     const cityItem = Object.entries(this.areaList.city_list).filter(([cityId, cityName]) => cityId.substr(0, 4) == id.substr(0, 4))[0]
      //     // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
      //     if (province[provinceIndex].text == addressDetail.provinceName && cityItem[1] == addressDetail.cityName) {
      //       _areaCode = id
      //     }
      //   }
      // })
      this.addressInfo = {
        id: addressDetail.addressId,
        name: addressDetail.userName,
        tel: addressDetail.userPhone,
        province: addressDetail.provinceName,
        addressDetail: addressDetail.detailAddress,
        areaCode: _areaCode,
        isDefault: !!addressDetail.defaultFlag
      }
    }
  },

  methods: {


    async onSubmit(content) {

      console.log(content.username, content.telphone, content.address)

      const params = {
        userName: content.username,
        userPhone: content.telphone,
        // provinceName: content.province,
        // cityName: content.city,
        // regionName: content.county,
        detailAddress: content.address,
        defaultFlag: 1,
      }
      if (this.type == 'edit') {
        console.log(333333333333)
        params['addressId'] = this.addressId
      }

      console.log(this.type)
      const { message } = await this.type == 'add' ? addAddress(params) : EditAddress(params)
      Toast('保存成功')


      setTimeout(() => {
        this.$router.push({ path: `address?from=${this.from}` })
      }, 1000)


    },


    async onSave(content) {
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0,
      }
      if (this.type == 'edit') {
        params['addressId'] = this.addressId
      }
      const { message } = await this.type == 'add' ? addAddress(params) : EditAddress(params)
      Toast('保存成功')
      setTimeout(() => {
        this.$router.push({ path: `address?from=${this.from}` })
      }, 1000)

    },
    async onDelete() {
      const { data } = await DeleteAddress(this.addressId)
      Toast('删除成功')
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
