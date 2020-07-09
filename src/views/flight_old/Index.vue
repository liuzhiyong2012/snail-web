<template>
  <section class="main-ctn">
	 <section class="header-ctn">
		 <div class="camera-ctn" :class="{active:activeCamera == 'header'}">
			 <img src="./imgs/index/camera_header.png" alt="">
		 </div>
		 <div class="camera-ctn" :class="{active:activeCamera == 'header'}">
		 	<img src="./imgs/index/camera_body.png" alt="">
		 </div>
		 <div class="camera-ctn" :class="{active:activeCamera == 'header'}">
		 	<img src="./imgs/index/camera_footer.png" alt="">
		 </div>
	 </section>
	 <section class="content-ctn">
		 <div class="switch-ctn">
			 <div class="switch-item album">
				 <img src="./imgs/index/album.png" alt="">
			 </div>
			 <div class="switch-item camera">
			 	 <img src="./imgs/index/camera.png" alt="">
			 </div>
		 </div>
		 <div class="voyage-ctn">
			 <voyage-info></voyage-info>
		 </div>
	 </section>
	 
  </section>
</template>


<script lang="ts">
import VoyageInfo from './components/VoyageInfo.vue'; 
import { Component, Prop, Vue } from 'vue-property-decorator';  

@Component({
  name: 'Pagination',
  components:{
	  VoyageInfo
  }
})
export default class FlightIndex extends Vue {
  @Prop() private msg!: string;
  
  private dataList: any = [];
  private activeCamera: string = ''; //header,body,footer
  
  created() {
    // this.getRuleList()
  }
  
  private handleSetting(data?: any) {
	  
  }
  
  private getRuleList() {
	  
  }
}

</script>



<style lang="scss" scoped>
.main-ctn{
	position: fixed;
	top:0;
	right: 0;
	bottom: 0;
	left: 0;
	background: grey;
	
	.header-ctn{
		position: absolute;
		top:0.40rem;
		right: 0.26rem;
		width: 0.56rem;
		
		.camera-ctn{
			margin-bottom: 0.20rem;
			&.active{
				
			}
			>img{
				display: block;
				width: 100%;
				border-radius:50% ;
			}
		}
		
	}
	.content-ctn{
		position: absolute;
		padding:0 0.30rem 0.50rem 0.30rem;
		width: 100%;
		height: 7.00rem;
		bottom: 0;
		box-sizing: border-box;
		
		.switch-ctn{
			display: none;
				 .switch-item{
					 &.album{
						 
					 }
					 &.camera{
					 				 
					 }
				 }
		}
		.voyage-ctn{
			width: 100%;
			height: 100%;
				 
		}
		
	}
}

</style>