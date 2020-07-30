<template>
	<section class="music-main-ctn">
		<abus-title title="Music"></abus-title>
		我是FM
		<section class="content-ctn">
			
			<div class="content-main-ctn">
				
			</div>
			
		</section>
	</section>
</template>

<script lang="ts">
	import {Vue,Prop,Component} from 'vue-property-decorator';
	import AbusTitle from '../../components/AbusTitle.vue';
	import MusicService from '../../service/music';
	
	@Component({
		name:'MusicPlaylistDetail',
		components:{
			AbusTitle
		}
	})
	export default class MusicPlaylistDetail extends Vue {
		 private recomendList:Array<any> = [];
		 
		 private mounted(){
			
		 }
		
	}
</script>


<style lang="scss" scoped>
	.music-main-ctn{
		
	}
</style>
