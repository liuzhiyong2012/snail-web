import VueRouter, {
	RouteConfig
} from 'vue-router';
import News from '@/views/news/index.vue';
import NewsDetail from '@/views/news/NewsDetail.vue';

const routes: Array < RouteConfig > = [
	{
		path: '/news',
		name: 'news',
		component: News,
		children: []
	},
	{
		path: '/news/detail',
		name: 'newsDetail',
		component: NewsDetail,
	},
]


export default routes
