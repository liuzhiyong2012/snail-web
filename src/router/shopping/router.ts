import VueRouter, {
    RouteConfig
} from 'vue-router';
import Shopping from '../../views/shopping/index.vue';
import ShoppingDetails from '../../views/shopping/ShoppingDetails.vue';
import ShoppingCart from '../../views/shopping/ShoppingCart.vue';


const routes: Array<RouteConfig> = [
    {
        path: '/shopping',
        name: 'shopping',
        component: Shopping,
        children: []
    },
    {
        path: '/shopping/details',
        name: 'shoppingDetails',
        component: ShoppingDetails
    },
    {
        path: '/shopping/cart',
        name: 'shoppingCart',
        component: ShoppingCart
    }

]

export default routes
