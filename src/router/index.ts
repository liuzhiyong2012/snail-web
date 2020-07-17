import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/home/index.vue";
import Internet from "../views/home/Internet.vue";
import InternetCart from "../views/home/components/InternetCart.vue";
import About from "../views/About.vue";
import Layout from "../views/layout/index.vue";
import FlightRouter from "./flight/router";
import DishRouter from "./dish/router";
import ShoppingRouter from "./shopping/router";
import VideoRouter from "./video/router";
import LoginRouter from "./login/router";
import NewsRouter from "./news/router";
import GameRouter from "./game/router";
import ChatRouter from "./chat/router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      ...FlightRouter,
      ...DishRouter,
      ...ShoppingRouter,
      ...NewsRouter,
      ...VideoRouter,
	  ...LoginRouter,
    ...GameRouter,
    ...ChatRouter,
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/internet",
        name: "internet",
        component: Internet,
      },
      {
        path: "/internet/cart",
        name: "internetCart",
        component: InternetCart,
      },
      {
        path: "/about",
        name: "about",
        component: About,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
