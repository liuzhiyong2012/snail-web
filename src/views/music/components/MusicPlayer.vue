<template>
	<section class="music-play-ctn">
		<div class="song-img"></div>
		<div class="song-name">Monsters GO bump-Taylor Swift</div>
		<div class="play-ctn">
			<!-- play -->
			<i class="icon icon-play"></i>
			
		</div>
	</section>
</template>

<script lang="ts">
	import {Vue,Prop,Component} from 'vue-property-decorator';
	
	@Component({
		name:'MusicPlayer',
		components:{
			
		}
	})
	export default class MusicPlayer extends Vue{
		
	}
</script>

<style lang="scss" scoped>
	
	.music-play-ctn{
		width: 100%;
		height: 1.70rem;
		background:#ffffff;
		display: flex;
		box-sizing: border-box;
		padding:0.20rem 0.30rem;
		// align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		background:rgba(255,255,255,1);
		box-shadow:0px -11px 25px 0px rgba(36,37,51,0.06);
		
		.song-img{
			position: relative;
			top:-0.44rem;
			border-radius: 50%;
			border:0.06rem solid #ffffff; 
			width: 1.00rem;
			height: 1.00rem;
			background: blue;
			
			
		}
		.song-name{
			font-size:0.30rem;
			font-family:Helvetica-Bold,Helvetica;
			font-weight:bold;
			color:rgba(46,46,46,1);
			line-height:0.48rem;
			
		}
		.play-ctn{
			.icon{
				font-size: 0.48rem;
			}
		}
	}
	
	
</style>
