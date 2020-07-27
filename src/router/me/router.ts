import VueRouter, {
	RouteConfig
} from 'vue-router';
import Me from '@/views/me/index.vue';
import ThirdAccount from '@/views/me/components/ThirdAccount.vue'
import Address from '@/views/me/components/Address.vue'
import Payment from '@/views/me/components/Payment.vue';

const routes: Array < RouteConfig > = [
	{
		path: '/me',
		name: 'meIndex',
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
        path: '/third/account',
        name: 'thirdAccount',
        component: ThirdAccount
    },
	{
	    path: '/me/payment',
	    name: 'mePayment',
	    component: Payment
	}
]


export default routes
