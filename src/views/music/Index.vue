<template>
	<section class="music-main-ctn">
		<abus-title title="Music"></abus-title>
		
	<!-- 	/* Id: "6a7fe6c5-c622-e911-bd22-c4209d3e3b89"
		 ImgPath: "http://172.16.125.11:8010/96f8cb8a-a189-4baa-a839-2760538db7ac"
		 Link: "airbusife://music?type=1000&id=40e287cd-722f-e911-8e28-c146b55a01ed"
		 Title: "睿明音乐 永恒的魅力" */ -->
		
		<section class="content-ctn">
			<van-swipe :autoplay="3000">
				<van-swipe-item class="dish-recomend-item" v-for="(item, index) in recomendList" :key="index">
					<div class="dish-recomend-img" :style="{ backgroundImage: `url(${item.ImgPath})` }"></div>
				</van-swipe-item>
			</van-swipe>
		</section>
		
	</section>
</template>

<script lang="ts">
	import {Vue,Prop,Component} from 'vue-property-decorator';
	import AbusTitle from '../../components/AbusTitle.vue';
	
	import MusicService from '../../service/music.ts';
	
	@Component({
		name:'MusicIndex',
		components:{
			AbusTitle
		}
	})
	export default class MusicIndex extends Vue {
		 private recomendList:Array<any> = [];
		 
		 private mounted(){
			 this.getMusicBanners();
		 }
		 
		 private getMusicBanners(){
			 MusicService.getMusicBanners({}).then((res:any)=>{
				 if(res.code == '200'){
					 this.recomendList = res.data.Banner;
				 }
			 });
		 }
	}
</script>

<style lang="scss" scoped>
	.music-main-ctn{
		.content-ctn{
			
		}
	}
</style>
