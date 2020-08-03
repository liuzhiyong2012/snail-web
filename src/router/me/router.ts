import VueRouter, {
	RouteConfig
} from 'vue-router';
import Me from '@/views/me/Index.vue';
import ThirdAccount from '@/views/me/components/ThirdAccount.vue'
import Address from '@/views/me/components/Address.vue'
import Payment from '@/views/me/components/Payment.vue'
import Lang from '@/views/me/components/Lang.vue'
import MyOrder from '@/views/me/components/MyOrder.vue'
import PointsExchange from '@/views/me/components/PointsExchange.vue'
import PointsDetails from '@/views/me/components/PointsDetails.vue'
import PointsCart from '@/views/me/components/PointsCart.vue'

const routes: Array<RouteConfig> = [
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
		path: '/my/order',
		name: 'myOrder',
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
	},
	{
		path: '/me/payment',
		name: 'payment',
		component: Payment
	},
	{
		path: '/me/pointsexchange',
		name: 'pointsExchange',
		component: PointsExchange,
		children: []
	},
	{
		path: '/me/pointsdetails',
		name: 'pointsDetails',
		component: PointsDetails,
		children: []
	},
	{
		path: '/me/pointscart',
		name: 'pointsCart',
		component: PointsCart,
		children: []
	},
]


export default routes
