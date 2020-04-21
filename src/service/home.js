import axios from 'axios'
import config from './config'
import Vue from 'vue'
axios.defaults.baseURL = config.baseURL

export default {
  getUserInfo() {
    return new Promise(function (resolve, reject) {
      let url = '/index/hello';
      let opt = {};

      axios.post(url, opt)
        .then(function (response) {
          resolve(response.data)
        }).catch(function (reason) {
          reject(reason)
        });

    })
  }

}
