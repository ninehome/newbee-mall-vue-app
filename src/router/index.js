

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Category from "../views/Category.vue";
import ProductList from "../views/ProductList.vue";
import ProductDetail from "../views/ProductDetail.vue";
import User from "../views/User.vue";
import Order from "../views/Order.vue";
import OrderDetail from "../views/OrderDetail.vue";
import Setting from "../views/Setting.vue";
import Address from "../views/Address.vue";
import AddressEdit from "../views/AddressEdit.vue";
import Login from "../views/Login.vue";
import About from "../views/About.vue";
import CreateOrder from "../views/CreateOrder.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homes",
    meta: {
      index: 1,
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Register"),
  },
  {
    path: "/home",
    name: "home",
    meta: {
      index: 1,
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    meta: {
      index: 1,
    },
    component: () => import(/* webpackChunkName: "cart" */ "../views/Cart.vue"),
  },
  {
    path: "/category",
    name: "category",
    meta: {
      index: 1,
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "category" */ "../views/Category.vue"),
  },
  {
    path: "/product-list",
    name: "product-list",
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "product-list" */ "../views/ProductList.vue"),
  },
  {
    path: "/product/:id",
    name: "product",
    meta: {
      index: 3,
    },
    component: () =>
      import(/* webpackChunkName: "product" */ "../views/ProductDetail.vue"),
  },
  {
    path: "/user",
    name: "user",
    meta: {
      index: 1,
    },
    component: () => import(/* webpackChunkName: "user" */ "../views/UserV2Grid.vue"),
  },
  {
    path: "/bank",
    name: "bank",
    meta: {
      index: 1,
    },
    component: () => import(/* webpackChunkName: "user" */ "../views/BankView.vue"),
  },
  {
    path: "/add-bank",
    name: "add-bank",
    meta: {
      index: 1,
    },
    component: () => import(/* webpackChunkName: "user" */ "../views/AddNewBank.vue"),
  },
  {
    path: "/order",
    name: "order",
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "order" */ "../views/Order.vue"),
  },
  {
    path: "/order-detail",
    name: "order-detail",
    meta: {
      index: 3,
    },
    component: () =>
      import(/* webpackChunkName: "order-detail" */ "../views/OrderDetail.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "setting" */ "../views/Setting.vue"),
  },
  {
    path: "/address",
    name: "address",
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "address" */ "../views/Address.vue"),
  },
  {
    path: "/address-edit",
    name: "address-edit",
    meta: {
      index: 3,
    },
    component: () =>
      import(/* webpackChunkName: "address-edit" */ "../views/AddressEdit.vue"),
  },
  {
    path: "/address-edit-v2",
    name: "address-edit-v2",
    meta: {
      index: 3,
    },
    component: () =>
      import(
        /* webpackChunkName: "address-edit" */ "../views/AddressEditV2.vue"
      ),
  },
  {
    path: "/about",
    name: "about",
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/create-order",
    name: "create-order",
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "create-order" */ "../views/CreateOrder.vue"),
  },
  {
    path: "/recharge",
    name: "recharge",
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "create-order" */ "../views/Recharge.vue"),
  },
  {
    path: "/withdrawal",
    name: "withdrawal",
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "create-order" */ "../views/Withdrawal.vue"),
  },

  {
    path: "/like",
    name: "like",
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "create-order" */ "../views/Like.vue"),
  },

];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
