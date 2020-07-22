import VueRouter, {
	RouteConfig
} from 'vue-router';
import LoginIndex from '../../views/login/Index.vue';
import ForgotPassword from '../../views/login/ForgotPassword.vue';
import Registery from '../../views/login/Registery.vue';
import SelectSeat from '../../views/login/SelectSeat.vue'

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
	},
	{
		path: '/select/seat',
		name: 'selectSeat',
		component: SelectSeat
	}
]


export default routes
