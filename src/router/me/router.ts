import VueRouter, {
	RouteConfig
} from 'vue-router';
import Me from '@/views/me/index.vue';
import ThirdAccount from '@/views/me/components/ThirdAccount.vue'
import Address from '@/views/me/components/Address.vue'

const routes: Array < RouteConfig > = [
	{
		path: '/me',
		name: 'Me',
		component: Me,
		children: []
    },
	{
		path: '/address',
		name: 'Address',
		component: Address,
		children: []
    },
    {
        path: '/third/account',
        name: 'thirdAccount',
        component: ThirdAccount
    }
]


export default routes
