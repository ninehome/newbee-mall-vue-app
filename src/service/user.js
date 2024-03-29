/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

import axios from '../utils/axios'
import jsCookie from "js-cookie";
export function getUserInfo() {
  axios.defaults.headers["token"] = jsCookie.get('token')    //    localStorage.getItem("token")
  const  userId =    jsCookie.get('userId') //          localStorage.getItem("userId");
  console.log(userId)
  console.log(222222333)
  return axios.post('/user/info/V2',{
    "userId": userId,
  });
}

export function EditUserInfo(params) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.put('/user/info', params);
}

// return axios.post('/user/login', params);+
export function login(params) {
  axios.defaults.headers["token"] = localStorage.getItem("token")

  return axios.post('/user/login/v2', params);
}

export function logout() {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.post('/user/logout')
}

export function register(params) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.post('/user/register', params);
}

