import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class ShoppingService {
	
	constructor() {
		
	}
    
	static getShoppingRecommendedList(data: Object) {   
		return request({
			url: '/v1/api/shopping/Recommended',
			method: 'GET',
			data: data
		});
	}
	
	static getShoppingList(data: Object) {
		return request({
			url: '/v1/api/shopping/List',
			method: 'GET',
			data: data
		});
	}
	// 商品种类
	static getShoppingCategory(data?: Object) {
		return request({
			url: '/v1/api/shopping/Category',
			method: 'GET',
			data: data
		});
	}

	
}  
