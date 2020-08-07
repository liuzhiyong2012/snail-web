<template>
	<section class="abustitle-main-ctn">
		<div class="back-ctn" @click="back()">
			<i class="icon icon-back"></i>
		</div>
		<div class="title"> {{title}}</div>
		
		<div class="right-ctn" >
			<slot></slot>
		</div>
	</section>
</template>

<i18n>
	{
		"zh":{
			
		},
		"en":{
			
		}
	}
</i18n>

<script lang = "ts">
	
	import {Vue,Component,Prop} from 'vue-property-decorator';
	
	@Component({
		name:'AbusTitle',
		components:{
			
		}
	})
	export default class AbusTitle extends Vue{
		@Prop({default:'默认标题'})
		private title?:string;
		
		@Prop({default:''})
		private backRouteName?:string;
			
		@Prop({default:()=>{
			return {};
		}})
		private params?:object;
		
		public back():void {
			if(!this.backRouteName){
				this.$router.go(-1);
			}else{
				(this as any).$router.push({
					name:this.backRouteName,
					params:this.params
				});
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.abustitle-main-ctn{  
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0.30rem 0.30rem;
		height: 0.40rem;
		background: #ffffff;
		
		.back-ctn{
			.icon{
				font-size: 0.32rem;
				color:#000000;
			}
		}
		
		.title{
			font-size:0.38rem;
			font-weight:bold;
			color:rgba(51,51,51,1);
			line-height:0.46rem;
		}
		
		.right-ctn{
			position: relative;
		}
	}
</style>
