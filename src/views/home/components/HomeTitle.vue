<template>
	
	<section class="home-title-ctn">
		
		<div class="title-left-ctn">
			<svg aira-hidden="true" class="icon">
				<use xlink:href="#icon-scan"></use>
			</svg>
			<span class="flow-ctn">
				0GB
			</span>
			<!-- <i class="icon"></i> -->
			
			<!-- <svg v-if="active == 'map'" class="icon" aria-hidden="true"><use xlink:href="#icon-map"></use></svg> -->
		</div>
		<div class="logo">
			<img src="../images/logo.png" alt="">
		</div>
	
		<div class="title-right-ctn">
			<i class="icon icon-user"  @click="stepTo('me')"></i>
			<i class="icon icon-message"  @click="stepTo('message')"></i>
		</div>
		
	</section>
	
</template>

<script lang="ts">
	import {Vue,Prop,Component} from 'vue-property-decorator';
    
	@Component({
		name:'HomeTitle',
		components:{
			
		}
	})
	export default class HomeTitle extends Vue{
		
		public stepTo(page:any):void{
			this.$emit('stepTo',page);
		}
		
	}
</script>

<style lang="scss" scoped>
	.home-title-ctn{
		height: 1.00rem;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:0 0.30rem;
		
		.title-left-ctn{
			flex: 1;
			display: flex;
			align-items: center;
			svg.icon{
				width: 0.40rem;
				height: 0.40rem;
				margin-right: 0.20rem;
			}
			
			.flow-ctn{
				line-height: 0.40rem;
				background: #001f5e;
				border-radius: 0.04rem;
				font-size:0.26rem;
				font-family:Helvetica-BoldOblique,Helvetica;
				font-weight:normal;
				color:rgba(255,255,255,1);
				line-height:0.40rem;
				padding:0 0.20rem;
				transform: skewX(-15deg);
			}
			
		}
		.logo{
			flex: 1;
			>img{
				height: 0.40rem;
			}
			
		}
		.title-right-ctn{
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			
			.icon-user{
				font-size: 0.40rem;
				margin-right: 0.20rem;
			}
			
			.icon-message{
				font-size: 0.40rem;
			}
		}
	}
</style>