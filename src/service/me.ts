import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class MeService {
	static header: any =  window.localStorage.getItem('token')
	constructor() {
	}
	
	
	//用户详情
	static getUserInfo(data?: Object) {

		return request({
			url: '/v1/api/User/Me',
            method: 'GET',
            headers: {
				Authorization: MeService.header
			},
			params: data
		});
	}
	// 修改地址
	static postUpdateAddress(data: Object) {
		return request({
			url: '/v1/api/Address/UpdateAddress',
            method: 'POST',
            headers: {
				Authorization: MeService.header
			},
			data: data
		});
	}
	// 获取地址
	static postAddress(data?: Object) {
		
		return request({
			url: '/v1/api/Address/GetAddress',
            method: 'POST',
            headers: {
				Authorization: MeService.header
			},
			data: data
		});
	}
	// 订单相关--菜品订单
	static getDishOrder(data?:Object){
		return request({
			url: '/v1/api/Dishes/MyOrders',
			method: 'GET',
			headers:{
				Authorization: MeService.header
			},
			params: data
		})
	}
	// 订单相关--购物订单
	static getShoppingOrder(data?:Object){
		return request({
			url: '/v1/api/Shopping/MyOrders',
			method: 'GET',
			params: data
		})
	}
	// 订单相关--流量订单
	static postNetFlowOrder(data?:Object){
		return request({
			url: '/v1/api/NetFlow/MyOrders',
			method: 'POST',
			headers:{
				Authorization: MeService.header
			},
			data: data
		})
	}
}  
