
<template>
  <div class="address-box">
    <s-header :name="'Управление банковским счетом для снятия средств'" ></s-header>
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
      return {
        id: item.bankId,
        name: item.userName,
        tel: item.bankName,
        address: item.bankNumber,
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
    margin-top: 44px;

    .van-button {
      background: @primary;
      border-color: @primary;
    }
  }
}
</style>
