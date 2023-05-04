/**

 */

import axios from "../utils/axios";

export function addCart(params) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.post("/shop-cart", params);
}

export function modifyCart(params) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.put("/shop-cart", params);
}

export function getCart(params) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.get("/shop-cart", { params });
}

export function deleteCartItem(id) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.put(`/shop-cart/${id}`);
}

export function getByCartItemIds(params) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.get("/shop-cart/settle", { params });
}
