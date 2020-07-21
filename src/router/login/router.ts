import VueRouter, {
	RouteConfig
} from 'vue-router';
import LoginIndex from '../../views/login/Index.vue';
import ForgotPassword from '../../views/login/ForgotPassword.vue';
import Registery from '../../views/login/Registery.vue';

const routes: Array<RouteConfig> = [
	{
		path: '/login',
		name: 'login',
		component: LoginIndex,
		children: []
	},
	{
		path: '/forgot/password',
		name: 'forgotPassword',
		component: ForgotPassword,
		children: [
			
		]
	},
	{
		path: '/registery',
		name: 'registery',
		component: Registery,
		
	}
]


export default routes
