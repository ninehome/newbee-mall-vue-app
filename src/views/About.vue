
<template>
  <div class="about">
    <s-header :name="'關於Shopee'"></s-header>
    <div class="about-body">
      <van-divider class="van" :style="{  fontSize: '20px', fontWeight: 500 }">Shopee
      </van-divider>

      <div  >
        Shopee是領航跨境電商平台，覆蓋新加坡、馬來西亞、菲律賓、泰國、越南、巴西、墨西哥、哥倫比亞、智利、波蘭等十餘個市場，同時在中國深圳、上海和香港設立跨境業務辦公室。 2021 年 Shopee總訂單量達61億，同比增長116.5%。
        根據權威移動數據分析平台 data.ai，2022年第二季度，Shopee榮登谷歌應用商店用戶使用總時長第一及平均月活數第二，囊括東南亞、台灣及巴西市場購物類App平均月活數、用戶使用總時長第一。同時，Shopee品牌影響力廣泛，入榜YouGov 2022全球最佳品牌榜第五，為前十強中僅有的電商品牌。</div>

      <div>

      </div>
    </div>
  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
export default {
  components: {
    sHeader
  },
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.about {
  box-sizing: border-box;
  padding: 20px;

  .about-body {
    margin-top: 44px;
    font-size: 16px;

    a {
      color: @primary;
    }
    .van{
      color: @primary;
    }
  }
}
</style>
