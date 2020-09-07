import VueRouter, {
    RouteConfig
} from 'vue-router';
import Video from '../../views/video/Index.vue';
import VideoPlay from '../../views/video/Play.vue';
import LikePlay from '../../views/video/LikePlay.vue';
import Comment from '../../views/video/components/Comment.vue';


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
    },
    {
        path: '/video/play2',
        name: 'likePlay',
        component: LikePlay
    },
    {
        path: '/video/comment',
        name: 'Comment',
        component: Comment
    }

]

export default routes
