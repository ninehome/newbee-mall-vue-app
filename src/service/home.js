import axios from "../utils/axios";

export function getHome(params) {
  return axios.get("/index-infos");
}



export function getList(params) {
  return axios.get("/goods/list");
}
