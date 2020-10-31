<template>
  <div class="home-index-ctn">
       <!-- <van-uploader
                     :max-size="10000000"
                     :after-read="uploadImg"  
                     :before-read="beforeRead"  
                     :max-count="1"
                     v-model="fileList"
                     multiple
            />
				   <van-button type="default" @click="sendGet()">发送Get请求</van-button>
				   <van-button type="primary" @click="sendPost()">发送Post请求</van-button>
				  <div class="file-upload-ctn">
					   <input type="file" @change="fileChange($event)">
		</div> -->
	<abus-title :title="蜗牛文化" >
	</abus-title>
		<div class="main-ctn">
			<div class="menu-ctn">
				<div class="menu-row" v-for="(itemRow,rowIndex) in menuList" :key="rowIndex">
					<div class="menu-item" v-for="(item,index) in itemRow" :key="index" >
						  <div>{{item.name}}</div>
						  <div></div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>
<i18n>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MessageService from '../../service/message';
import AbusTitle from '../../components/AbusTitle.vue';

@Component({
  name: 'Home',
  components: {
   AbusTitle
  },
})
export default class Home extends Vue {
  private menuList:Array<any> = [
	  [
	  		  {name:'通信',value:'message'},
	  		  {name:'直播',value:'liveTelecast'},
	  		  {name:'3D',value:'chat'},
	  ],
	  [
		  {name:'音乐',value:'music'},
		  {name:'视频',value:'video'},
		  {name:'图片',value:'image'}
	  ],
	
	  
  ];

  private created() {
	  //https://blog.csdn.net/liuyalu_/article/details/105836451
  }

  private mounted() {
	  
  }
  
  private beforeDestroy() {
	  
  }

 
  public stepToPage(pageType: any) {
	  
  }

  // 初始化websocket
  public initWebSocket() {
	  
  }
  
  private uploadImg(){
	  
  }
  
  private beforeRead(){} 
  
  
  private fileChange(e){
	 let files = e.target.files;
	 if(files.length == 0){
		 return ;
	 }
	 let file = files[0];
	 
	 let xmlRequest = new XMLHttpRequest();

	 
	  
	  var formData = new FormData();
	  formData.append('file',file);
	  
	  xmlRequest.onreadystatechange = (e)=>{
		  console.log('ready');
	  };
	  
	  xmlRequest.upload.onprogress = (e)=>{
		  
	  };
	  
	  let url = process.env.VUE_APP_API_URL + '/common/upload/';
	   xmlRequest.open('post', url);
	   // xmlRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	   xmlRequest.send(formData);
  }
  
  public sendGet(){
	  this.request({
		  url:'http://localhost:9080/user/login',
		  method:'GET',
		  callback:function(res){
			  
		  }
	  });
  }
  
  public sendPost(){
	  this.request({
	  		  url:'http://localhost:9080/user/login',
	  		  method:'POST',
			  data:{
				  phone:'13580415609',
				  password:'123456'
			  },
			  callback:function(res){
			  			  
			  }
	  });
  }
  
  public request(option){
	  
	  
	var Ajax = {
	    get: function(url,fn){
	        // XMLHttpRequest对象用于在后台与服务器交换数据
	        var xhr=new XMLHttpRequest();
	        xhr.open('GET',url,false);
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			xhr.setRequestHeader('test','haha');
	        xhr.onreadystatechange=function(){
				console.log('readyState:' + xhr.readyState);
	            // readyState == 4说明请求已完成
	            if(xhr.readyState==4){
	                if(xhr.status==200 || xhr.status==304){
	                    console.log(xhr.responseText);
	                    fn.call(xhr.responseText);
	                }
	            }
	        };
	        xhr.send();
	    },
	
	    // data应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
	    post: function(url,data,fn){
	        var xhr=new XMLHttpRequest();
	        xhr.open('POST',url,false);
	        // 添加http头，发送信息至服务器时内容编码类型
	        //xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	        xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
			 xhr.setRequestHeader('test','haha');
	        xhr.onreadystatechange=function(){
				console.log('readyState:' + xhr.readyState);
	            if (xhr.readyState==4){
	                if (xhr.status==200 || xhr.status==304){
	                    // console.log(xhr.responseText);
	                    fn.call(xhr.responseText);
	                }
	            }
	        };
	        xhr.send(JSON.stringify(data));
	    }
	};
	
	if(option.method == 'GET'){
		Ajax.get(option.url,option.callback);
	}else if(option.method == 'POST'){
		Ajax.post(option.url,option.data||{},option.callback);
	}
	
  }

  public getChatUnread(req: any) {
	  
  }

  public getNoticeUnread(req: any) {
	  
  }
}
</script>

<style scoped lang="scss">
	.home-index-ctn{
		.main-ctn{
			.menu-ctn{
				// background: #ffffff;
				    margin: 0.20rem;
				    border-radius: 0.12rem;
				    
				.menu-row{
					display: flex;
					position: relative;
					justify-content: space-between;
					margin-bottom: 0.20rem;
					.menu-item{
						box-shadow: 0px 0px 6px #eae9ea;
						font-size: 0.48rem;
						line-height: 2.00rem;
						width:2.00rem;
						height: 2.00rem;
						background: #ffffff;
						text-align: center;
					}
				}
			}
		}
	}
   
</style>
