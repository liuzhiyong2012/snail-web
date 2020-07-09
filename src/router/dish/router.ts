import VueRouter, {
	RouteConfig
} from 'vue-router';
import DishIndex from '../../views/dish/Index.vue';


/* let PersonCenter = (resolve) => {
	return require.ensure([], () => {
		resolve(require('@/pages/PersonCenter/personCenter'))
	}, 'personCenter')
} */
const routes: Array < RouteConfig > = [{
	path: '/dish/index',
	name: 'dishIndex',
	component: DishIndex,
	children: []
}]


export default routes
