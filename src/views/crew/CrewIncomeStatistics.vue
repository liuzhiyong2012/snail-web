<template>
	<section class="crew-income-statistics">
		<div class="charts-statistic-ctn">
			<crew-statistic-chart ref="dishStatisticChart"    title="Catering"></crew-statistic-chart>
		</div>
		<div class="charts-statistic-ctn">
			<crew-statistic-chart ref="netFlowStatisticChart" title="Data package" type="dataPackage"></crew-statistic-chart>
		</div>
		<div class="charts-statistic-ctn">
			<crew-statistic-chart ref="shoppingStatisticChart" title="Goods"></crew-statistic-chart>
		</div>
	</section>
</template>



<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CrewStatisticChart from './components/CrewStatisticChart.vue';
import IncomeStatisticsService from '../../service/crew/income-statistics';

@Component({
	name: 'CrewCatering',
	components: {
		CrewStatisticChart
	}
})
export default class CrewCatering extends Vue {
	private dishStatistic:any = {};
	private netFlowStatistic:any = {};
	private shoppingStatistic:any = {};
	
	
	private mounted():void{
		this.getAccountForDish();
		this.getAccountForNetFlow();
		this.getAccountForShopping();
	}
	
	private getAccountForDish():void{
		IncomeStatisticsService.getAccountForDish({}).then((resData:any)=>{
			if(resData.code == '200'){
				(this.$refs.dishStatisticChart as any).renderCharts(resData.data);
			}else{
				this.$toast('获取数据失败!');
			}
		});
	}
	
	private getAccountForNetFlow():void{
		IncomeStatisticsService.getAccountForNetFlow({}).then((resData:any)=>{
			if(resData.code == '200'){
				(this.$refs.netFlowStatisticChart as any).renderCharts(resData.data);
			}else{
				this.$toast('获取数据失败!');
			}
		});
	}
	
	private getAccountForShopping():void{
		IncomeStatisticsService.getAccountForShopping({}).then((resData:any)=>{
			if(resData.code == '200'){
				(this.$refs.shoppingStatisticChart as any).renderCharts(resData.data);
			}else{
				this.$toast('获取数据失败!');
			}
		});
	}
	
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
    @function rem($px){//$px为需要转换的字号
	    @return $px / 100px * 1rem; //100px为根字体大小
	} 
	
	.crew-income-statistics{
		display: flex;
		position: relative;
		padding:0 rem(90px);
		justify-content: space-between;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		
		.charts-statistic-ctn{
			width: 6.00rem;
			// background: grey;
			height: 100%;
		}
	}

</style>
