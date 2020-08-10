import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LayoutIndex from "../views/layout/index.vue";


//import Home from "../views/home/Index.vue";
import Crew from "./crew/router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "layout",
    component: LayoutIndex,
    children: [
		...Crew
    ],
  },
];

const router = new VueRouter({
  routes,
});


export default router;
