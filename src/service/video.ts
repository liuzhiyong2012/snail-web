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
			params: data
		});
	}
	// Route::get(':version/api/Video/:id', 'api/:version.app.Video/detail');//根据Id获取Video
	static getVideo(id:string,data?: object) {
        return request({
			url: '/v1/api/Video/'+id,
            method: 'GET',
            params: data
        })
	}
	
// 	Route::post(':version/api/Video/Comments', 'api/:version.app.Video/comments');//评论视频
// Route::delete(':version/api/Video/Comments/:id', 'api/:version.app.VideoComment/del');//删除评论
// Route::post(':version/api/Video/IsLike', 'api/:version.app.VideoComment/is_like');//是否已收藏
// Route::post(':version/api/Video/Like', 'api/:version.app.VideoComment/like');//收藏视频
// Route::post(':version/api/Video/MyLike', 'api/:version.app.VideoComment/MyLike');//我收藏的视频
// Route::post(':version/api/Video/UnLike', 'api/:version.app.VideoComment/un_like');//取消视频收藏
static postVideoMyLike(data?: object) {
	return request({
		url: '/v1/api/Video/MyLike',
		method: 'POST',
		data: data
	})
}
}  
