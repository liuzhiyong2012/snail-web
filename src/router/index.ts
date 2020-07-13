import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/home/index.vue';
import About from '../views/About.vue';
import Layout from '../views/layout/index.vue';
import Login from '../views/login/login.vue';
import FlightRouter from './flight/router';
import DishRouter from './dish/router';
import ShoppingRouter from './shopping/router'
import VideoRouter from './video/router'


  Vue.use(VueRouter);

  const routes: Array<RouteConfig> = [
			{
			path: '/',
			name: 'layout',
			component: Layout,
			children:[
				...FlightRouter,
				...DishRouter,
				...ShoppingRouter,
				...VideoRouter,
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
