let _baseURL = 'http://localhost:9080';

// console.log('process:env' +process.env);

/* if(window.loc){
} */

if(window.location.href.indexOf('poeticsnail') > -1){
  _baseURL = 'http://www.poeticsnail.com:8080/snailweb';
}


export default {
  baseURL: _baseURL
}
