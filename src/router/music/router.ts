import VueRouter, {
	RouteConfig
} from 'vue-router';
import MusicIndex from '../../views/music/Index.vue';

const routes: Array < RouteConfig > = [
	{
		name:'musicIndex',
		path:'/music/index',
		component:MusicIndex,
		children:[]
	}
]


export default routes
