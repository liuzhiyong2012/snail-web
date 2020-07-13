import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/home/index.vue';
import About from '../views/About.vue';
import Layout from '../views/layout/index.vue';
import Shopping from '../views/shopping/index.vue';
import ShoppingDetails from '../views/shopping/ShoppingDetails.vue';
import Login from '../views/login/login.vue';
import FlightRouter from './flight/router';
import DishRouter from './dish/router';


  Vue.use(VueRouter);

  const routes: Array<RouteConfig> = [
			{
			path: '/',
			name: 'layout',
			component: Layout,
			children:[
				...FlightRouter,
				...DishRouter,
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
					path: '/shopping-details',
					name: 'shopping-details',
					component: ShoppingDetails
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
