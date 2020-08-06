import {Vue} from 'vue-property-decorator';

export default {
  addBaseUrl:function(url:string){
	  if (!url) return url;
	  
	  if (url.indexOf('https://') < 0 && url.indexOf('http://') < 0 && url.indexOf('data:image') < 0) {
	  	let baseUrl = (Vue.config as any).imgBase;
	  	url = `${baseUrl}/${url}`
	  }
	  
	  return url;
  },
  delBaseUrl:function(url:string){
  	  if (!url) return url;
	  
  	  // let baseUrl = (Vue.config as any).imgBase + '/'
  	  
  	  let index = url.lastIndexOf('/');
	  
	  let ret = url.slice(index + 1);
  	  //debugger;
  	  //let ret =  arr[0] || arr[1];
  	  /* let retIndex  = ret.indexOf('group');
  	   if(retIndex > 0){
  	     ret = ret.slice(retIndex);
  	   } */
  	  
  	  return ret;
  	  
  	  // return url;
  }
  
}
