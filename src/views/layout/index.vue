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

@Component({
	name:'LayoutIndex',
	components:{
		MusicPlayer
	}
})
export default class LayoutIndex extends Vue {
  @Prop() private msg!: string;
  
  private socket:any = null;
  
  private mounted(){
  	//this.startWebScoket();
  }
  
  private beforeDestroy(){
  	this.socket&&this.socket.close();
  }
  
  private startWebScoket() {
         const opt = {
  			path:process.env.VUE_APP_SOCKET_URL
  		};
  		this.socket = io(process.env.VUE_APP_HOST,opt);
  		
  		//需要获取航班的id.
  		let uid = '4CFC4D33-2C1E-E911-BAD5-F44D307124C0';
  
  		// socket连接后以uid登录
  		this.socket.on('connect', () => {
  			console.log('connect');
  			this.socket.emit('login', uid);
  		});
  
  		// 后端推送来消息时
  		this.socket.on('new_msg', (msg) => {
  			console.log('new_msg');
  			
  			let midMsg = msg.replace(/&quot;/g, '"');
  			let newMessageObj = JSON.parse(midMsg);
  			(this as any).$globalEvent.$emit('new_msg',newMessageObj);
  			
  			if(newMessageObj.type == 'system'){
  				this.showNotify();
  			}
  		});
  
  	}
  
}
</script>


<style lang="scss">
	@import '../../assets/style/index.scss';
	
	.abus-layout-ctn{
		
	}
</style>