import {Vue} from 'vue-property-decorator';

let filter = {
	name:'addBaseUrl',
	handler:function(url:any){
		if (!url) return url;
		
		if (url.indexOf('https://') < 0 && url.indexOf('http://') < 0 && url.indexOf('data:image') < 0) {
			let baseUrl = Vue.config.imgBase;
			url = `${baseUrl}/${url}`
		}
		return url
	}
}

export default filter;

