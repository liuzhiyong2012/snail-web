import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/home/index.vue';
import About from '../views/About.vue';
import Layout from '../views/layout/index.vue';
import Shopping from '../views/shopping/index.vue';
import News from '../views/news/index.vue';
import Login from '../views/login/login.vue';
import FlightRouter from './flight/router';
import DishRouter from './dish/router';
import NewsRouter from './news/router';


  Vue.use(VueRouter);

  const routes: Array<RouteConfig> = [
			{
			path: '/',
			name: 'layout',
			component: Layout,
			children:[
				...FlightRouter,
				...DishRouter,
				...NewsRouter,
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
					path: '/news',
					name: 'news',
					component: News
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
