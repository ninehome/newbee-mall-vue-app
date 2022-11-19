<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *-->
<template>
  <div class="about">
    <s-header :name="'充值'"></s-header>

    <!-- <van-divider :style="{ color: '#1baeae', borderColor: '#1baeae', fontSize: '20px', fontWeight: 500 }">简介
      </van-divider> -->
    <div class="about-body">请点击选择一个沟通方式与充值客服人员取得联系，并按照客服的指导完成账户充值。</div>
    <!-- <van-divider :style="{ color: '#1baeae', borderColor: '#1baeae', fontSize: '20px', fontWeight: 500 }">开源地址
      </van-divider> -->


    <ul class="user-list">
      <li @click="linkDownload('https://t.me/nine183183')">
        <i class="nbicon nbmenu2"></i>
        <a class="a-style">Telegram</a>
        <van-icon name="arrow" />
      </li>

      <li @click="linkDownload('https://t.me/nine183183')">
        <i class="nbicon nbmenu2"></i>
        <a class="a-style">WhatApp</a>
        <van-icon name="arrow" />
      </li>

    </ul>



  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
import { Image } from 'vant';
export default {
  components: {
    sHeader,

  },
  methods: {
    linkDownload(url) {
      window.open(url, '_blank') // 新窗口打开外链接
    }
  }

}
</script>

<style lang="less" scoped>
.about {
  box-sizing: border-box;
  padding: 10px;

  .about-body {
    margin-top: 68px;
    font-size: 13px;
    color: #e03b3b;
  }

  .user-list {
    padding: 0 10px;
    margin-top: 40px;

    li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e9e9e9;
      display: flex;
      justify-content: space-between;
      font-size: 14px;

      .van-icon-arrow {
        margin-top: 13px;
      }
    }
  }
}
</style>
