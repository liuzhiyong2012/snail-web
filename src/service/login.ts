import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class LoginService {
	
	constructor() {
		
    }
    // 注册
    static postUserRegistery(data?: Object) {   
		return request({
			url: '/v1/Register',
			method: 'POST',
			data: data
		});
	}
    // 登录
    static postUserLogin(data?: Object) {   
		return request({
			url: '/v1/Token',
			method: 'POST',
			data: data
		});
	}
    // 校验手机号
	static postCheckPhone(data?: Object) {   
		return request({
			url: '/v1/CheckPhone',
			method: 'POST',
			data: data
		});
	}
    // 校验问题答案
    static postCheckAnswer(data?: object) {
        return request({
            url: '/v1/CheckAnswer',
            method: 'POST',
            data: data
        })
    }
    // 重置密码
    static postResetPassword(data?: object) {
        return request({
            url: '/v1/ResetPassword',
            method: 'POST',
            data: data
        })
    }
    //当前航班座位列表
    // Route::get(':version/api/Crm/SeatInfo', 'api/:version.app.Crm/SeatInfo');
// Route::get(':version/api/Crm/OtherSeatList', 'api/:version.app.Crm/OtherSeatList');//剩余座位。
// Route::get(':version/api/Crm/SelectSeat/:id', 'api/:version.app.Crm/SelectSeat');//选择座位。
    static getCrmSeatInfo(data?: object) {
        return request({
            url: '/v1/api/Crm/SeatInfo',
            method: 'GET',
            params: data
        })
    }
    //剩余座位。
    static getCrmOtherSeatList(data?: object) {
        return request({
            url: '/v1/api/Crm/OtherSeatList',
            method: 'GET',
            params: data
        })
    }
    //选择座位
    static getCrmSelectSeat(id:string,data?: object) {
        return request({
            url: '/v1/api/Crm/SelectSeat/'+id,
            method: 'GET',
            params: data
        })
    }
}  
