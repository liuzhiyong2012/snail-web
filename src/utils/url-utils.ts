import {Vue} from 'vue-property-decorator';

export default {
  addBaseUrl:function(url:string){
	  if (!url) return url;
	  
	  if (url.indexOf('https://') < 0 && url.indexOf('http://') < 0 && url.indexOf('data:image') < 0) {
	  	let baseUrl = (Vue.config as any).imgBase;
	  	url = `${baseUrl}/${url}`
	  }
	  
	  return url;
  }
  
}
