<template>
	<div class="crew-tab">
		  <div class="tab-item" v-for="(item,index) in tabList" :class="{'active':item.value == active}" @click="switchPage(item)">
			  {{item.name}}
		  </div>
	</div>
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
		name:'CrewTab',
		components: {
		}
	})
	export default class CrewTab extends Vue{
		@Prop({
			default:()=>{
				return []
			}
		})
		tabList:Array<any>;
		
		@Prop({
			default:()=>{
				return false
			}
		})
		active:boolean;
		
		
		public switchPage(item){
			this.$emit('switchPage',item.value);
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../assets/style/index.scss';
	@function rem($px){//$px为需要转换的字号
	    @return $px / 100px * 1rem; //100px为根字体大小
	} 
	
		.crew-tab{
			display: flex;
			padding:rem(60px) rem(90px);
			
		
			
			.tab-item{
				position: relative;
				
				font-size:rem(40px);
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(255,255,255,1);
				line-height:rem(40px);
				padding-bottom: rem(22px);
				margin-right: rem(90px);
				
				&.active{
					&:after{
						position: absolute;
						content:'';
						height:rem(6px);
						background:rgba(132,189,0,1);
						left: 0;
						bottom: 0;
						width: 100%;
					}
				}
			}
		}
		
</style>

