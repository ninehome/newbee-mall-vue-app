/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */
import axios from "axios";
import { Toast } from "vant";
import router from "../router";
// "http://backend-api-01.newbee.ltd/api/v1";
//发布服务器
//http://154.198.224.126/

//发布服务器  导弹
// axios.defaults.baseURL = "https://wildberr.online/api/v1";


//飞哥
// axios.defaults.baseURL = "https://wildberries.cool/api/v1";

//海王
// axios.defaults.baseURL = "https://wildberries.plus/api/v1"

 //阿正
// axios.defaults.baseURL = "https://wildberries.la/api/v1";


// 俄罗斯
axios.defaults.baseURL = "https://wildber.info/api/v1";


//哈萨克斯坦
// axios.defaults.baseURL = "https://ushop.ws/api/v1";



//发布服务器
// axios.defaults.baseURL ="http://154.198.224.126:9191/api/v1";

//本地环境
// axios.defaults.baseURL ="http://localhost:9191/api/v1";
axios.defaults.uid = 100
  // 会影响跨域
// axios.defaults.withCredentials = true;
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["token"] = localStorage.getItem("token");
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use((res) => {
  console.log("-----------start---------");
  console.log(res.data);
  console.log("----------end----------");
  // if (typeof res.data !== "object") {
  //   Toast.fail("Ошибка сети, попробуйте еще раз！");
  //   return Promise.reject(res);
  // }
  if (res.data.resultCode !== 200) {
    if (res.data.message) Toast.fail(res.data.message);
    if (res.data.resultCode === 416) {
      localStorage.removeItem("token")
      router.push({ path: "/login" });
    }
    // console.log(res.data);
    // Promise.reject(res.data);
    return res.data;
  }

  return res.data;
});

export default axios;
