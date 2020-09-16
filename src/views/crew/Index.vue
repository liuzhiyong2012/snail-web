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
		
		<!--<van-button type="primary" class="message-btn" text="组件调用" @click="showNotify" />-->
		<van-notify v-model="show" class="message-ctn">
		  <div class="notify-ctn">
		  		<div class="notify-head">
		  			<!--<i class="icon"></i>-->
		  			<span class="tip">
		  				You got a new message
		  			</span>
		  		</div>
		  		<div class="notify-content">
		  			  <div class="head-img">
		  			  	Lzy
		  			  </div>
		  			  <div class="content-ctn">
		  			  	<div class="seat-ctn">C21</div>
		  			  	<div class="msg-ctn">我是消息的内容</div>
		  			  </div>
		  		</div>
		  </div>
		</van-notify>
		
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CrewTab from './components/CrewTab.vue';
import CrewFooter from './components/CrewFooter.vue';
declare let io: any;

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
	private socket:any = null;
	
	private show: boolean = false;
	
	private mounted(){
		this.startWebScoket();
	}
	
	private beforeDestroy(){
		this.socket&&this.socket.close();
	}
	
	private startWebScoket() {
		//debugger;
           const opt = {
				path:process.env.VUE_APP_SOCKET_URL
			};
			this.socket = io(process.env.VUE_APP_HOST,opt.path);
			
			//需要获取航班的id.
			let uid = '4CFC4D33-2C1E-E911-BAD5-F44D307124C0';

			// socket连接后以uid登录
			this.socket.on('connect', () => {
				debugger;
				this.socket.emit('login', uid);
			});

			// 后端推送来消息时
			this.socket.on('new_msg', (msg) => {
				let midMsg = msg.replace(/&quot;/g, '"');
				let newMessageObj = JSON.parse(midMsg);
				(this as any).$globalEvent.$emit('new_msg',newMessageObj);
				
				if(newMessageObj.type == 'system'){
					this.showNotify();
				}
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
	
	public showNotify() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 2000);
    }
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	@function rem($px){//$px为需要转换的字号
	    @return $px / 100px * 1rem; //100px为根字体大小
	} 
	
	
	.message-btn{
	 position: relative;
	 z-index: 10000;
	}
	.message-ctn{
		    position: absolute;
    		right: 40px;
		    bottom: 240px;
		    top: auto;
		    left: auto;
		    width: 4.8rem;
		    height: 1.82rem;
		    border-radius: 0.3rem;
		    border: 0.04rem solid #AFD5FD;
		    z-index: 1000;
		    background: #003e81;
		
		 .notify-ctn{
		 	position: relative;
		 	padding:rem(16px) rem(30px) rem(20px);
		 	
		  	.notify-head{
		  		.tip{
					font-size: rem(32px);
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #AFD5FD;
					line-height: rem(32px);
		  		}
		  		margin-bottom:rem(20px);
		  		
		  	}
		  	.notify-content{
		  		position: relative;
		  		
		  		.head-img{
		  			position: absolute;
		  			border-radius: 50%;
		  			width: rem(84px);
					height: rem(84px);
					line-height: rem(84px);
					overflow: hidden;
					text-overflow: ellipsis;
					text-align: center;
					color: #ffffff;
					background: #83abd9;
		  		}
		  		
		  		.content-ctn{
		  			
		  			margin-left: rem(108px);
		  			.seat-ctn{
		  				width: rem(68px);
						height: rem(36px);
						background: #00AEC7;
						border-radius: rem(6px);
						text-align: center;
						line-height: rem(36px);
						font-size: rem(22px);
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #FFFFFF;
						margin-bottom: rem(12px);
		  			}
		  			
		  			.msg-ctn{
		  				   text-align: left;
							font-size: rem(24px);
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							line-height: rem(30px);
		  			}
		  		}
		  	}
		  }
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
