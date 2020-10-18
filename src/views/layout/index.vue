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

@Component({
	name:'LayoutIndex',
	components:{
		MusicPlayer
	}
})
export default class LayoutIndex extends Vue {
  @Prop() private msg!: string;
  

  

  
  /* isDemo */
  
 private created(){
  	
  }
  
  private mounted(){
	  console.log('index:mounted');
  }
  
  private beforeDestroy(){
	  console.log('beforeDestroy');
  }
  
  private getFlightInfo(){
	  var xhr=new XMLHttpRequest();
	   //使用GET方式请求指定网址的页面
	   xhr.open('GET',process.env.VUE_APP_API_URL + '/v1/api/FlightInfo',false);
	   //发送空内容请求
	   xhr.send(null);
	   
	   if(xhr.status===200){//200状态码表示正常
			let res = JSON.parse(xhr.responseText);
			this.$store.dispatch('setFlightInfo',res.data);
	   }else{
	  		this.$toast('获取航班信息失败!');
	   }  
  }
  
  
}
</script>


<style lang="scss">
	@import '../../assets/style/index.scss';
	
	.abus-layout-ctn{
		
	}
</style>