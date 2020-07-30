import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import filters from './utils/filters/index';
//引入Vant  
import Vant from 'vant';
import 'vant/lib/index.css';
import VueI18n from 'vue-i18n'
import { Lazyload } from 'vant';
// import myCharts from './comm/js/myCharts.js';


filters.forEach((filter: any, index) => {
  Vue.filter(filter.name, filter.handler)
});
   
// Vue.use(myCharts);
Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(VueI18n);

let locale = localStorage.getItem('lang') || 'en';
let i18n = new VueI18n({
  locale: locale,
  silentTranslationWarn: true,
  messages: {
    'zh': require('./assets/i18n/zh.json'),
    'en': require('./assets/i18n/en.json')
  }
});

localStorage.setItem('lang', locale);

Vue.config.productionTip = false;
Vue.prototype.$globalEvent = new Vue;
// Vue.prototype.$globalEvent = new Vue;

// function getHostUrl(){
//    return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
// }
//可根据具体环境配置
/* if(location.href.indexOf('localhost') > -1 ){
  Vue.config.SERVER_API = 'http://kf.vpclub.cn/guangmei/api';
  Vue.config.imgBase = 'http://kf.vpclub.cn';
}else{
  Vue.config.SERVER_API = getHostUrl() +'/guangmei/api';
  Vue.config.imgBase  = getHostUrl();
} */


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
