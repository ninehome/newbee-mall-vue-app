
<template>
  <div class="address-box">
    <s-header :name="'Менеджмент банковских карт'" ></s-header>
    <div class="address-item">
      <van-address-list v-if="from != 'mine'" v-model="chosenAddressId" :list="list" default-tag-text="По умолчанию" @add="onAdd"
                        @edit="onEdit" @select="select"  add-button-text ="Добавить банковский счет"	 />
      <van-address-list v-else v-model="chosenAddressId" :list="list" default-tag-text="По умолчанию" @add="onAdd"
                        @edit="onEdit"   add-button-text = "Добавить банковский счет"	/>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import sHeader from '@/components/SimpleHeader'
import { getBankList } from '../service/bank'
export default {
  components: {
    sHeader
  },
  data() {
    return {
      chosenAddressId: '1',
      list: [],
      from: this.$route.query.from,
    }
  },
  async mounted() {
    const { data } = await getBankList()
    this.list = data.map(item => {
      let show = false
      if (item.default==1){
        show =true
      }

      let back =  item.bankNumber.substr(0,4)
      let front =  item.bankNumber.substr(-4)
      let bank = back +" **** **** **** "+front
      return {
        id: item.bankId,
        name: item.userName,
        tel: item.bankName,
        address: bank,
        isDefault:show
      }

    })
  },
  methods: {
    onAdd() {
      this.$router.push({ path: `add-bank?type=add&from=${this.from}` })
    },
    onEdit(item, index) {
      this.$router.push({ path: `add-bank?type=edit&addressId=${item.id}&from=${this.from}` })
    },
    select(item, index) {
      this.$router.push({ path: `add-bank?type=edit&addressId=${item.id}&from=${this.from}` })
      // this.$router.push({ path: `add-bank?addressId=${item.id}&from=${this.from}` })
    }


  }
}
</script>

<style lang="less">
@import '../common/style/mixin';

.address-box {
  .van-radio__icon {
    display: none;
  }

  .address-item {
    margin-top: 60px;

    .van-button {
      background: @primary;
      border-color: @primary;
    }
  }
}
</style>
