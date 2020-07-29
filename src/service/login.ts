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
    // Route::get(':version/api/Crm/SeatInfo', 'api/:version.app.Crm/SeatInfo');//当前航班座位列表
    static getCrmSeatInfo(data?: object) {
        return request({
            url: '/v1/api/Crm/SeatInfo',
            method: 'GET',
            params: data
        })
    }
}  
