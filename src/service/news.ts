import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class NewsService {
	
	constructor() {
		
	}
    // 推荐新闻
	static getNewsRecommended(data?: Object) {   
		return request({
			url: '/v1/api/News/Recommended',
			method: 'GET',
			data: data
		});
	}
    // 新闻列表
	static getVideoList(data: Object) {   
		return request({
			url: '/v1/api/News/List',
			method: 'GET',
			data: data
		});
	}
	

	
}  
