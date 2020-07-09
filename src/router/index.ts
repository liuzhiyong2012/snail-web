import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/home/index.vue';
import About from '../views/About.vue';
import Layout from '../views/layout/index.vue';
import Shopping from '../views/shopping/index.vue';
import Login from '../views/login/login.vue';

  Vue.use(VueRouter);

  const routes: Array<RouteConfig> = [
			{
			path: '/',
			name: 'layout',
			component: Layout,
			children:[
				{
					path: '/home',
					name: 'home',
					component: Home
				},
				{
					path: '/about',
					name: 'about',
					component: About
				},
				{
					path: '/shopping',
					name: 'shopping',
					component: Shopping
				},
				{
					path: '/login',
					name: 'login',
					component: Login
				}
			]
			}
	]

const router = new VueRouter({
  routes
})

export default router
