<template>
	<div class="crew-footer" v-if="flightResData">
		  <div class="info-ctn first">
			  <i class="icon icon-crew-flight"></i>
			  <span class="seat-number">
				  {{flightResData.Flight.Airplane.AirplaneModels}}
			  </span>
		  </div>
		  <div class="info-ctn second">
			  <i class="icon icon-location"></i>
			  <span class="start-position"> {{flightResData.Flight.BaseInfo.Departure}}</span>
			  <span>-</span>
			  <i class="icon icon-flight-horizatal"></i>
			  <span>-</span>
			  <span class="end-position"> {{flightResData.Flight.BaseInfo.Arrival}}</span>
		  </div>
		  
		  <div class="info-ctn third">
			  <i class="icon icon-time"></i>
			  <span class="start-time">{{flightResData.Flight.BaseInfo.DeparturePlanTimestamp| dateFormate('hh:mm')}}</span>
			  <div class="progress-ctn">
				  <div class="progress"></div>
			  </div>
			  <span class="end-time">{{flightResData.Flight.BaseInfo.ArrivalPlanTimestamp| dateFormate('hh:mm')}}</span>
		  </div>
		  
		  <div class="info-ctn fourth">
			  <i class="icon icon-weather"></i>
			  <span class="temperature-ctn">
			  {{flightResData.Weather.Desc}} {{flightResData.Weather.Temper}}
			  </span>  
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
	import FlightService from '../../../service/flight';
	
	@Component({
		name:'crew-footer',
		components: {
		}
	})
	export default class CrewFooter extends Vue{
		@Prop({
			default:()=>{
				return [];
			}
		})
		tabList:Array<any>;
		
		@Prop({
			default:()=>{
				return false;
			}
		})
		active:boolean;
		
		private flightResData:any = null;
		
		private mounted(){
			this.getFlightInfo();
		}
		
		
		public getFlightInfo(): void {
			FlightService.getFlightInfo().then((res: any) => {
				if(res.code == 200){
					this.flightResData = res.data;
				}
			});
		}
		
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
	
	.crew-footer{
		display: flex;
		align-items: center;
		width: 100%;
		height:120px;
		box-sizing: border-box;
		padding:0.60rem;
		
		font-size:rem(24px);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:rem(24px);
		background:rgba(0,55,126,1);
		
		.info-ctn{
			display: flex;
			align-items: center;
			margin-right: rem(60px);
			.icon{
				margin-right: rem(4px);
				font-size: 0.36rem;
				color:#ffffff;
			}
			&.first{
				
			}
			&.second{
				.icon-flight-horizatal{
					margin:0;
				}
			}
			&.third{
				.progress-ctn{
					position: relative;
					margin:0 rem(4px);
					width:rem(200px);
					height:rem(16px);
					background:rgba(255,255,255,1);
					border-radius:rem(8px);
					opacity:0.2;
					overflow: hidden;
					
					.progress{
						overflow: hidden;
						width:rem(130px);
						height:100%;
						background:#00AEC7;
						border-radius:rem(8px);
					}
				}
			}
			&.fourth{
				.temperature-ctn{
					
				}
			}
		}
	}
	
		
</style>

