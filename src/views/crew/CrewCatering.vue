<template>
	<section class="crew-catering">
		 <section class="top-ctn">
			  <crew-select></crew-select>
			  <crew-search></crew-search>
		 </section>
		 <section class="item-ctn">
			 <crew-catering-item v-for="(item,index) in dataList"></crew-catering-item>
		 </section>
	</section>
</template>



<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CrewSelect from './components/CrewSelect.vue';
import CrewSearch from './components/CrewSearch.vue';
import CrewCateringItem from './components/CrewCateringItem.vue';

@Component({
	name: 'CrewCatering',
	components: {
		CrewSelect,
		CrewSearch,
		CrewCateringItem
	}
})
export default class CrewCatering extends Vue {
	private dataList:Array<any> = [
		{name:'测试1'},
		{name:'测试1'},
		{name:'测试1'},
		{name:'测试1'},
		{name:'测试1'}
		];
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
    @function rem($px){//$px为需要转换的字号
	    @return $px / 100px * 1rem; //100px为根字体大小
	} 
// 订餐页面统计
// 流量服务
// 购物  //IFE端的

.crew-catering{
	
	padding: 0 rem(90px);
	
	.top-ctn{
		display: flex;
		padding:rem(60px) 0;
		justify-content: space-between;
	}
}
</style>
