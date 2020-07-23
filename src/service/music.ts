import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class MusicService {
	
	constructor() {
		
	}
    // 音乐轮播图
	static getMusicBanners(data: Object) {   
		return request({
			url: '/v1/api/Music/Banners',
			method: 'GET',
			data: data
		});
	}
    // 热门歌单
	static getMusicPlaylistHot(data?: Object) {   
		return request({
			url: '/v1/api/Music/Playlist/Hot',
			method: 'GET',
			data: data
		});
	}
	// FM
	static getMusicFM(data?: Object){
		return request({
			url: '/v1/api/Music/FM',
			method: 'GET',
			data: data
		})
	}
    // 榜单
	static getMusicTop(data?: Object) {   
		return request({
			url: '/v1/api/Music/Top',
			method: 'GET',
			data: data
		});
	}
    // 我收藏的歌曲列表(歌单对象)
	static getMusicSongSubscribePlaylist(data?: Object) {   
		return request({
			url: '/v1/api/Music/Song/Subscribe/Playlist',
			method: 'GET',
			data: data
		});
	}
	

	
}  
