
<template>
  <div class="about">
    <s-header :name="'Профиль компании'"></s-header>
    <div class="about-body">
      <van-divider class="van" :style="{  fontSize: '20px', fontWeight: 500 }">
      </van-divider>

      <div  >
        O maior varejista on-line da Rússia, fundado por Tatiana Bakalchuk em 2004. Além da Rússia,
        a empresa oferece seus serviços em outros 15 países: Armênia, Belarus, França, Alemanha,
        Israel, Itália, Israel, Cazaquistão, Quirguistão, Moldávia, Polônia, Eslováquia, Espanha, Turquia, EUA e Uzbequistão,
        com mais de 48.000 funcionários.</div>

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
