import { localStore } from '@/utils/data-management'
import { AxiosResponseForZCT, ZCTAPI } from '@/utils/types'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
// import { Message } from 'element-ui'
// 验签---------------
import md5 from 'js-md5'
import StringUtils from './stringUtils'

// AxiosError 只有 message， 接口返回 msg， 故此扩展一下
interface customError extends AxiosError {
  msg: string
}

const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
  withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
	  // const zctToken = window.localStorage.getItem('token')||localStore.get('token');
	  const zctToken = localStore.get('token');
    // const key_token = localStore.get('key_token')
    const authorToken = window.localStorage.getItem('token')
    // config.headers['key-token'] = key_token
    const timestamp = new Date().getTime() + ''
    const nonce = StringUtils.randomStr(32)
    const ZCT_SECRET = '21fa6sd1f95w1133edsafas6'
    const encrptString = `${timestamp}.${ZCT_SECRET}.${nonce}`
    // console.log(encrptString);
    const sign = md5(encrptString)
    // console.log(md5("1584948595244.21fa6sd1f95w1133edsafas6.vJdhenTJOYZ3BPWqMpcFb6tpzhhmeDLj"))
    config.headers = {
      ...config.headers, //@temp
      sign,
      timestamp,
      nonce,
	    Authorization: zctToken,
      AirBus: '4CFC4D33-2C1E-E911-BAD5-F44D307124C0',
      // zctToken: zctToken
    }
    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response:any) => {
	 // AxiosResponse<ZCTAPI.Res>
	  // debugger;
    /**
     * TODO: 补充服务端状态码规范
     */
	//response.data.code === 1000 || response.data.code === 0
	// debugger;
    if (response.status === 200&&(!response.data.error)) {
      return response.data;
    } else {
      // Message.error(response.data.message || '网络错误')
      return Promise.reject(response.data)
    }
  },
  (error: customError) => {
    const { data } = error.response as any
    const res = data as AxiosResponseForZCT
    // Message({
    //   message: error.msg || res.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
export function request<T>(params: object): Promise<T> {
  return service(params) as any
}
