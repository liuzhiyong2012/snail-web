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
	//云端处理一下
	
}  
