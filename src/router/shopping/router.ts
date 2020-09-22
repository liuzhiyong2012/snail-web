import VueRouter, {
    RouteConfig
} from 'vue-router';
import Shopping from '../../views/shopping/Index.vue';
import ShoppingDetails from '../../views/shopping/ShoppingDetails.vue';
import ShoppingCart from '../../views/shopping/ShoppingCart.vue';


const routes: Array<RouteConfig> = [
    {
        path: '/shopping',
        name: 'shopping',
        component: Shopping,
        meta: {
			keepAlive: false
		},
        children: []
    },
    {
        path: '/shopping/details',
        name: 'shoppingDetails',
        component: ShoppingDetails,
        meta: {
			keepAlive: false
		}
    },
    {
        path: '/shopping/cart',
        name: 'shoppingCart',
        meta: {
			keepAlive: false
		},
        component: ShoppingCart
    }

]

export default routes
