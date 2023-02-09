
<template>
  <div class="about">
    <s-header :name="'About Us'"></s-header>
    <div class="about-body">
      <van-divider class="van" :style="{  fontSize: '20px', fontWeight: 500 }">Wildberries
      </van-divider>

      <div  >
        Flipkart was founded in 2007 by Sachin Bansal and Binny Bansal, alumni of the Indian Institute of Technology, Delhi, to focus on book sales, after they had accumulated experience working for Amazon.com.
        when it was officially launched in October 2007 as "Flipkart Online Services Pvt. Ltd." [8] became one of the largest e-commerce companies in India after mergers and acquisitions of competitors such as WeRead.
        The merger with eBay's Indian operations (eBay.in) was completed on August 5, 2017.
        May 9, 2018 Walmart-led consortium acquires approximately 77% of Flipkart for $16 billion, with the remaining shares held by Flipkart co-founder Bansal, Tencent, Microsoft, Tiger Global Management, and other shareholders.
        In November 2018, Walmart increased its stake in Flipkart to 81.3 percent
        Translated with www.DeepL.com/Translator (free version).</div>

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
