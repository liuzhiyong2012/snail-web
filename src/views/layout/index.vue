<template>
  <section class="abus-layout-ctn">
	  <section class="abus-layout-main-ctn">
		  <!-- <keep-alive> -->
		    <router-view class="abus-layout-view-ctn"/>
		  <!-- </keep-alive> -->
	  </section>
	  <music-player></music-player>
  </section>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MusicPlayer from '../music/components/player/player.vue';
import FlightService from '../../service/flight';
import {localStore} from '../../utils/data-management';

@Component({
	name
	:'LayoutIndex',
	components:{
		MusicPlayer
	}
})
export default class LayoutIndex extends Vue {
  @Prop() private msg!: string;
  
 private created(){
	  let token = localStore.get('token')||'';
	  if(token){
		 // this.autoLogin(token);
	  }
  }
  
  
  private autoLogin(token){
	 /* var xhr=new XMLHttpRequest();
	   //使用GET方式请求指定网址的页面
	   xhr.open('GET',process.env.VUE_APP_API_URL + '/user/autoLogin',false);
	   xhr.send(null);
	   
	   if(xhr.status===200){//200状态码表示正常
			let res = JSON.parse(xhr.responseText);
			this.$store.dispatch('setFlightInfo',res.data);
	   }else{
	  		this.$toast('获取航班信息失败!');
	   }  */
	   
	   var xhr=new XMLHttpRequest();
	   xhr.open('POST',process.env.VUE_APP_API_URL + '/user/autoLogin',false);
	   // 添加http头，发送信息至服务器时内容编码类型
	   //xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	   xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
	   xhr.setRequestHeader('test','haha');
	 /*  xhr.onreadystatechange=function(){
	   	console.log('readyState:' + xhr.readyState);
	       if (xhr.readyState==4){
	           if (xhr.status==200 || xhr.status==304){
	               // console.log(xhr.responseText);
	               fn.call(xhr.responseText);
	           }
	       }
	   }; */
	   xhr.send(JSON.stringify({token:token}));
	   if(xhr.status===200){
		   let res = JSON.parse(xhr.responseText);
		  if(res.code == '1000'){
			   this.$store.dispatch('setUserInfo', {
			       nickname: res.datas.nickName,
			       token: res.datas.token,
			   	   phone:res.datas.phone,
			       userId: res.datas.id
			     }).then((res: any) => {
			   	  this.$router.push({
			   	    name: 'home'
			   	  });
			     });
		   }
	   }
  }
}
</script>


<style lang="scss">
	@import '../../assets/style/index.scss';
	
	.abus-layout-ctn{
		
	}
</style>