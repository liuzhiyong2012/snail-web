
export default {
  searchIndexByKey:function(arr:Array<any>,key:string,value:any){
	  let retIndex = -1;
	  
	  arr.forEach((item,index)=>{
		  if(item[key] == value){
			  retIndex = index;
		  }
	  });
	  
	  return retIndex;
  }
}
