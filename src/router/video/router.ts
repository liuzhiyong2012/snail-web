import VueRouter, {
    RouteConfig
} from 'vue-router';
import Video from '../../views/video/index.vue';


const routes: Array<RouteConfig> = [
    {
        path: '/video',
        name: 'video',
        component: Video,
        children: []
    }

]

export default routes
