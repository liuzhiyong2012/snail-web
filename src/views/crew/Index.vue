<template>
	<section class="crew-layout-ctn">
		<section class="header-ctn">
			<crew-tab :tabList = "tabList" :active="active" @switchPage="switchPage"></crew-tab>
		</section>
		<section  class="body-ctn">
			 <router-view class="crew-route-view-ctn"/>
		</section>
		<section  class="footer-ctn">
			<crew-footer></crew-footer>
		</section>
	</section>
</template>



<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CrewTab from './components/CrewTab.vue';
import CrewFooter from './components/CrewFooter.vue';


@Component({
	name: 'CrewLayoutCtn',
	components: {
		CrewTab,
		CrewFooter
	}
})
export default class CrewLayoutCtn extends Vue {
	private tabList:Array<any> = [
			{ 
				name:'Catering',
				value:'catering',
				routeName:'crewCatering'
			},
			{
				name:'Data package',
				value:'dataPackage',
				routeName:'crewDataPackage'
			},
			{
				name:'Goods',
				value:'goods',
				routeName:'crewGoods'
			},
			{
				name:'Income statistics',
				value:'incomeStatistics',
				routeName:'crewIncomeStatistics'
			},
			{
				name:'Cabin layout',
				value:'cabinLayout',
				routeName:'crewCabinLayout'
			}
		];
		
	private active:string = 'catering';
	
	private mounted(){
		
	}
	
	public switchPage(value):void{
		this.active = value;
		let routeMap = {
			catering:'crewCatering',
			dataPackage:'crewDataPackage',
			goods:'crewGoods',
			incomeStatistics:'crewIncomeStatistics',
			cabinLayout:'crewCabinLayout'
		};
		
		if(routeMap[value]){
			this.$router.push({
				name:routeMap[value]
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	@function rem($px){//$px为需要转换的字号
	    @return $px / 100px * 1rem; //100px为根字体大小
	} 
	
      .crew-layout-ctn{
		  position: relative;
		  overflow: hidden;
		  width: 100%;
		  height: 100vh;
		  background: #002468;
		  
      	.header-ctn{
      		
      	}
		
      	.body-ctn{
			position: absolute;
			top:rem(182px);
			bottom:rem(120px);
			width:100%;
			
      		.crew-route-view-ctn{
				
			}
      	}
      	.footer-ctn{
      		position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
      	}
      }

</style>
