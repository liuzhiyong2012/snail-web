import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class VideoService {
	
	constructor() {
		
	}
    // 获取评论列表
	static getVideoCommentsList(data: Object) {   
		return request({
			url: '/v1/api/Video/Comments/List',
			method: 'GET',
			data: data
		});
	}
    // 推荐视频
	static getVideoList(data?: Object) {   
		return request({
			url: '/v1/api/Video/List',
			method: 'GET',
			data: data
		});
	}
	

	
}  
