/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

import axios from '../utils/axios'

export function createWithdrawal(params) {
  return axios.post('/user/withdrawal', params);
}

export function getBankList(params) {
  return axios.post('/user/bankList', { params });
}

// 客服联系方式
export function getChatList(params) {
  return axios.post('/user/chatList', { params });
}


//
// export function getOrderDetail(id) {
//   return axios.get(`/order/${id}`);
// }
//
// export function cancelOrder(id) {
//   return axios.put(`/order/${id}/cancel`);
// }
//
// export function confirmOrder(id) {
//   return axios.put(`/order/${id}/finish`)
// }
//
// export function payOrder(params) {
//   return axios.get('/paySuccess', { params })
// }




