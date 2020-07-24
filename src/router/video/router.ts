import VueRouter, {
    RouteConfig
} from 'vue-router';
import Video from '../../views/video/Index.vue';
import VideoPlay from '../../views/video/Play.vue';


const routes: Array<RouteConfig> = [
    {
        path: '/video',
        name: 'video',
        component: Video,
        children: []
    },
    {
        path: '/video/play',
        name: 'videoPlay',
        component: VideoPlay
    }

]

export default routes
