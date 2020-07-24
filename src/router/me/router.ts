import VueRouter, {
	RouteConfig
} from 'vue-router';
import Me from '@/views/me/Index.vue';
import ThirdAccount from '@/views/me/components/ThirdAccount.vue'
import Address from '@/views/me/components/Address.vue'
import Lang from '@/views/me/components/Lang.vue'
import Payment from '@/views/me/components/Payment.vue'
import MyOrder from '@/views/me/components/MyOrder.vue'

const routes: Array < RouteConfig > = [
	{
		path: '/me',
		name: 'me',
		component: Me,
		children: []
    },
	{
		path: '/address',
		name: 'address',
		component: Address,
		children: []
    },
	{
		path: '/payment',
		name: 'payment ',
		component: Payment,
		children: []
    },
	{
		path: '/my/order',
		name: 'myOrder ',
		component: MyOrder,
		children: []
    },
	{
		path: '/lang',
		name: 'lang',
		component: Lang,
		children: []
    },
    {
        path: '/third/account',
        name: 'thirdAccount',
        component: ThirdAccount
    }
]


export default routes
