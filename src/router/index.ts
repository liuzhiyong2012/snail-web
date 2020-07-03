import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue';
import Layout from '../views/layout/index.vue';

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
				}
			]
			}
	]

const router = new VueRouter({
  routes
})

export default router
