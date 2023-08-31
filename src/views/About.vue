
<template>
  <div class="about">
    <s-header :name="'Perfil da empresa'"></s-header>
    <div class="about-body">
      <van-divider class="van" :style="{  fontSize: '20px', fontWeight: 500 }">
      </van-divider>

      <div  >
        Os descontos em compras são um modelo de comércio eletrônico, também conhecido como cashback, descontos ou abatimentos, que permite que os consumidores recebam uma parte do valor da compra como recompensa pela aquisição de produtos. Esse modelo de negócios geralmente tem vários elementos-chave:

        Plataforma: uma plataforma ou site de compras on-line com um recurso de desconto, geralmente um intermediário que conecta os consumidores aos varejistas.

        Cálculo do desconto: depois que um consumidor compra um item, um valor de desconto é calculado com base em uma porcentagem do preço do item (geralmente uma porcentagem). O valor do desconto pode ser acumulado na conta do consumidor e está esperando para ser retirado ou reutilizado.

        Link para a compra: a plataforma de descontos fornece um link exclusivo para a compra de um item, o que permite que a origem da compra seja rastreada para fins de cálculo do desconto.

        Parceiros de varejo: as plataformas de descontos fazem parcerias com varejistas e marcas para atrair os consumidores a comprar em suas plataformas, oferecendo promoções, descontos em produtos específicos etc.

        Contas de consumidores: os consumidores devem se registrar em uma conta em uma plataforma de descontos, o que lhes permite visualizar seu histórico de descontos e retirar ou reutilizar valores de descontos.

        Métodos de retirada: as plataformas de desconto geralmente permitem que os consumidores retirem seus valores de desconto por meio de transferências eletrônicas, paypal, cheques bancários etc.

        Promoções e marketing: as plataformas geralmente atraem mais consumidores para participarem das compras de descontos por meio de promoções e anúncios.

        Esse modelo de negócios pode ser uma ótima maneira de os consumidores obterem algumas vantagens extras ao comprar produtos, além de ajudar os comerciantes a aumentar as vendas e atrair mais consumidores. No entanto, os consumidores precisam ser cuidadosos ao se envolverem em compras com descontos e garantir que escolham plataformas e parceiros de descontos confiáveis. Os comerciantes também precisam pesar os custos e benefícios para garantir que os programas de descontos tenham um impacto positivo em seus negócios.</div>

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
