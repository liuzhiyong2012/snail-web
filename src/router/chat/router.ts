import VueRouter, {
	RouteConfig
} from 'vue-router';
import Chat from '@/views/chat/index.vue';
// import SystemNotice from '@/views/chat/SystemNotice.vue';
// import SystemDetail from '@/views/chat/SystemDetail.vue';

const routes: Array < RouteConfig > = [
	{
		path: '/chat',
		name: 'chat',
		component: Chat,
		children: []
	},
	// {
	// 	path: '/systemNotice',
	// 	name: 'systemNotice',
	// 	component: SystemNotice,
	// },
	// {
	// 	path: '/system/detail',
	// 	name: 'systemDetail',
	// 	component: SystemDetail,
	// },
]


export default routes
