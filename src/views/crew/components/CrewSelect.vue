<template>
	<section class="crew-select">
		  <select >
			  <option v-for="(item,index) in selectList" :value="item.value">{{item.name}}</option>
		  </select>
	</section>
</template>


<script lang = "ts">
	import {Vue,Component,Prop} from 'vue-property-decorator';
	
	@Component({
		name:'CrewTab',
		components: {
		}
	})
	export default class CrewTab extends Vue{
		selectList:Array<any> = [
			{
				name:'未选择',
				value:'未选择'
			},
			{
				name:'未选择1',
				value:'未选择1'
			},
			{
				name:'未选择2',
				value:'未选择2'
			}
		];
		
	}
</script>

<style lang="scss" scoped>
	
	@function rem($px){
	    @return $px / 100px * 1rem; //100px为根字体大小
	} 
	
	.crew-select{
		
		width:rem(288px);
		height:rem(76px);
		
		
		
		select{
			box-sizing: border-box;
			border-radius:rem(20px);
			border:rem(4px) solid rgba(175,213,253,1);
			width: 100%;
			height: 100%;
			padding:0 rem(40px);
			
			font-size:rem(28px);
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:rem(28px);
			background: transparent;
			
			
			option{
				
			}
		}
	}
	
	
		
</style>

