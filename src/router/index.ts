import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Layout from '../views/layout/index.vue';
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
