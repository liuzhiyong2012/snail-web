import VueRouter, {
	RouteConfig
} from 'vue-router';
import Me from '@/views/me/index.vue';

const routes: Array < RouteConfig > = [
	{
		path: '/me',
		name: 'Me',
		component: Me,
		children: []
	}
]


export default routes
