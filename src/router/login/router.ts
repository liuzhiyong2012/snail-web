import VueRouter, {
	RouteConfig
} from 'vue-router';
import LoginIndex from '../../views/login/Index.vue';

const routes: Array < RouteConfig > = [{
	path: '/login/index',
	name: 'loginIndex',
	component: LoginIndex,
	children: []
}]


export default routes
