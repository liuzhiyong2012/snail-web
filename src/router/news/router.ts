import VueRouter, {
	RouteConfig
} from 'vue-router';
import NewsDetail from '@/views/news/components/NewsDetail.vue';


/* let PersonCenter = (resolve) => {
	return require.ensure([], () => {
		resolve(require('@/pages/PersonCenter/personCenter'))
	}, 'personCenter')
} */
const routes: Array < RouteConfig > = [{
	path: '/news/detail',
	name: 'newsDetail',
	component: NewsDetail,
	children: []
}]


export default routes
