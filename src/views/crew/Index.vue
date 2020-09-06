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
		this.startWebScoket();
	}
	
	private beforeDestroy(){
		this.socket&&this.socket.close();
	}
	
	private startWebScoket() {
			this.socket = (window as any).io('http://localhost:2120/');

			// uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
			let uid = '4CFC4D33-2C1E-E911-BAD5-F44D307124C0';

			// socket连接后以uid登录
			this.socket.on('connect', () => {
				this.socket.emit('login', uid);
			});

			// 后端推送来消息时
			this.socket.on('new_msg', (msg) => {
				let midMsg = msg.replace(/&quot;/g, '"');
				let newMessageObj = JSON.parse(midMsg);
				 this.$globalEvent.$emit('new_msg',newMessageObj);
			});

			// 后端推送来在线数据时
			this.socket.on('saveNoticeList', function(online_stat) {
				
			});

			this.socket.on('saveChatList', function(online_stat) {
				
			});
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
