import VueRouter, {
	RouteConfig
} from 'vue-router';
import MusicIndex from '../../views/music/Index.vue';
import MusicFavourites from '../../views/music/MusicFavourites.vue';
import MusicAirFm from '../../views/music/MusicAirFm.vue';
import MusicTopRanks from '../../views/music/MusicTopRanks.vue';

const routes: Array < RouteConfig > = [
	{
		name:'musicIndex',
		path:'/music/index',
		component:MusicIndex,
		children:[]
	},
	{
		name:'musicFavourites',
		path:'/music/index',
		component:MusicFavourites,
		children:[]
	},
	{
		name:'musicAirFm',
		path:'/music/airfm',
		component:MusicAirFm,
		children:[]
	},
	{
		name:'musicTopRanks',
		path:'/music/topranks',
		component:MusicTopRanks,
		children:[]
	}
]

export default routes
