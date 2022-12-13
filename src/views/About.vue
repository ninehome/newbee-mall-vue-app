
<template>
  <div class="about">
    <s-header :name="'Профиль компании'"></s-header>
    <div class="about-body">
      <van-divider class="van" :style="{  fontSize: '20px', fontWeight: 500 }">Wildberries
      </van-divider>

      <div  >
         крупнейший российский онлайн-ритейлер, основанный Татьяной Бакальчук в 2004 году. Помимо России,
        компания предлагает свои услуги в 15 других странах: Армении, Беларуси, Франции, Германии,
        Израиле, Италии, Казахстане, Кыргызстане, Молдове, Польше, Словакии, Испании, Турции, США и Узбекистане,
        в которых работают более 48 000 сотрудников.</div>

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
