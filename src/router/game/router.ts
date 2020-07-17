import VueRouter, {
	RouteConfig
} from 'vue-router';
import Game from '@/views/game/index.vue';
// import GameDetail from '@/views/game/GameDetail.vue';

const routes: Array < RouteConfig > = [
	{
		path: '/game',
		name: 'game',
		component: Game,
		children: []
	},
	// {
	// 	path: '/game/detail',
	// 	name: 'gameDetail',
	// 	component: GameDetail,
	// },
]


export default routes
