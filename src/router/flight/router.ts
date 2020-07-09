import VueRouter, {
	RouteConfig
} from 'vue-router';
import FlightIndex from '../../views/flight_old/Index.vue';


/* let PersonCenter = (resolve) => {
	return require.ensure([], () => {
		resolve(require('@/pages/PersonCenter/personCenter'))
	}, 'personCenter')
} */
const routes: Array < RouteConfig > = [{
	path: '/flight',
	name: 'flight',
	component: FlightIndex,
	children: []
}]


export default routes
