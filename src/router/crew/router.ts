import VueRouter, { RouteConfig } from 'vue-router';
import CrewLogin from '../../views/crew/Login.vue';
import CrewIndex from '../../views/crew/Index.vue';

import CrewCatering from '../../views/crew/CrewCatering.vue';

/* let PersonCenter = (resolve) => {
	return require.ensure([], () => {
		resolve(require('@/pages/PersonCenter/personCenter'))
	}, 'personCenter')
} */

const routes: Array<RouteConfig> = [
	{
		path: '/crew/login',
		name: 'crewLogin',
		component: CrewLogin,
		children: []
	},
	{
		path: '/crew/index',
		name: 'crewIndex',
		component: CrewIndex,
		children: [{
			path:'/crew/catering',
			name:'',
			component:CrewCatering
		}]
	}
];

export default routes;
