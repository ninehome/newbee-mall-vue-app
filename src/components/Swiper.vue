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
  <van-swipe class="my-swipe" :autoplay="5000" indicator-color="#287FF0" >
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  methods: {
    goTo(url) {
      window.open(url)
    }
  }
}
</script>

<style lang='less' scoped>
.my-swipe{
  width: 100%;
  height: 220px; //定高
  .van-swipe-item {
    img {
      height: 220px; //定高
      width: 100%;
      display: block;
      object-fit: cover;
    }

  }


}
</style>
