import axios from 'axios'
/* import config from './config' */
import Vue from 'vue'
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  getWeixinAuth(params) {
    return new Promise(function(resolve, reject) {
      let url = '/wechar/getWxApiAuth';
      let opt = params||{};

      axios.post(process.env.VUE_APP_API_URL + url, opt)
        .then(function(response) {
          resolve(response.data)
        }).catch(function(reason) {
          reject(reason)
        })
    })
  }
}
