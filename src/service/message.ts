import request, { request as http } from "@/utils/request";
import { AxiosPromise } from "axios";

export default class MessageService {
  constructor() {}

  // 用户给空乘发送消息
  static sendToManager(data?: Object) {
    return request({
      url: "/v1/api/Message/SendToManager",
      method: "POST",
      data: data,
    });
  }
  // 空乘给用户发送消息
  static sendToUser(data?: Object) {
    return request({
      url: "/v1/api/Message/SendToUser",
      method: "POST",
      data: data,
    });
  }
  // 用户当前航班的消息
  static getUserMessage(data?: Object) {
    return request({
      url: "/v1/api/Message/getUserMessage",
      method: "POST",
      data: data,
    });
  }

  // 系统通知
  static getSystemNoticeList(data?: Object) {
    return request({
      url: "/v1/api/notice/List",
      method: "POST",
      data: data,
    });
  }
}
