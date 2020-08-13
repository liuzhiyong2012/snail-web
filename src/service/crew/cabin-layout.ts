import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';



export default class CateringService {
	
	constructor() {
		
	}
	
	//完成菜品
	static getFlightSeatInfo(data: Object={}) {
		return request({
			url: '/v1/api/Crm/SeatInfo',
			method: 'GET',
			data: data
		});
	}
	
	//完成菜品
	static getSeatMessageInfo(data: Object={}) {
		return request({
			url: '/v1/api/Message/SeatMessageInfo',
			method: 'POST',
			data: data
		});
	}
	
	//获取最新的未读信息与用户的对应消息。
	// /api/Message/SeatMessageInfo
	
}  
