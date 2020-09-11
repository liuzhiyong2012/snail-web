<template>
	<section class="homeflight-main-ctn" >
		<div class="abus-scroller-box home-flight-box">
			<div class="home-flight-t">
				<span classs="flight-model">{{ airplane.AirplaneModels }} </span>
				<span classs="flight-number">{{ baseInfo.FlightNumber }}</span>
				<!-- <i class="icon  icon-search"></i> -->
			</div>

			<div class="home-flight-info">
				<span class="home-flight-seat">
					<span>Seat No：</span>
					<span>{{ seatNumber }}</span>
					<span class="home-flight-g">{{seatClass}}</span>
				</span>
				<span class="flight-duration-time">
					<span>Remaining:</span>
					<span>2hours 10min</span>
				</span>
				<span class="home-flight-c">{{weather.Temper +' '+ weather.Desc}} </span>
			</div>

			<div class="home-flight-place">
				<div class="place place-l">
					<div class="time">
						<span>{{ baseInfo.Departure }}</span>
						<span>{{ baseInfo.DepartureTerminal }}</span>
					</div>
					<div class="address">{{ baseInfo.DeparturePlanTimestamp | dateFormate('hh:mm') }}</div>
				</div>
				
				<div class="f1">
					<i class="dot light"></i>
					<i class="dot grey"></i>
					<i class="dot dark"></i>
					<i class="icon icon-plane"></i>
					<i class="dot dark"></i>
					<i class="dot grey"></i>
					<i class="dot light"></i>
				</div>
				
				<div class="place place-r">
					<div class="time">
						<span>{{ baseInfo.Arrival }}</span>
						<span>{{ baseInfo.ArrivalTerminal }}</span>
					</div>
					<div class="address">{{ baseInfo.ArrivalPlanTimestamp | dateFormate('hh:mm') }}</div>
				</div>
			</div>
			<div class="map-box">
				<abus-map zoom = '4'></abus-map>
				<!-- <home-map></home-map> -->
			</div>
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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HomeMap from './HomeMap.vue';
import AbusMap from '../../../components/AbusMap.vue';
import FlightService from '../../../service/flight';
import { localStore } from "../../../utils/data-management";

@Component({
	name: 'HomeFlight',
	components: {
		HomeMap,
		AbusMap
	}
})
export default class HomeFlight extends Vue {
	public flightResData: any = {};
	public baseInfo: any = {};
	public airplane: any = {};
	public flightAltitudes: any = {};
	public weather: any = {};

	private get seatNumber(): string {
		return localStore.get("seatNumber") || this.$store.state.login.voyageInfo.seatNumber;
	}
	
	private get seatClass(): string {
		if(localStore.get("seatType")==1){
			return 'F'
		}else if(localStore.get("seatType")==2){
			return 'Y'
		}else if(localStore.get("seatType")==3){
			return 'C'
		}
	}

	private created() {
		this.getFlightInfo();
	}

	public getFlightInfo(): void {
		FlightService.getFlightInfo().then((res: any) => {
			if(res.code == 200){
				this.flightResData = res.data;
				this.baseInfo = this.flightResData.Flight.BaseInfo;
				this.airplane = this.flightResData.Flight.Airplane;
				this.flightAltitudes = this.flightResData.FlightAltitudes;
				this.weather = this.flightResData.Weather;
			}
			
		});
	}

	
}
</script>

<style lang="scss" scoped>
.homeflight-main-ctn {
	.abus-block-title {
		.block-title-background {
			background-color: #fafafa00;
		}
	}

		/* .van-cell {
	  font-size: 0.36rem;
	} */
		.home-flight-box {
			border-radius: 0.12rem;
			margin: 0 0.3rem;
			padding: 0.32rem 0.3rem;
			height: 5.64rem;
			background: rgba(255, 255, 255, 1);
			box-sizing: border-box;
			.home-flight-t {
				margin-bottom: 0.2rem;
				font-size: 0.38rem;
				// font-weight: bold;
				color: rgba(46, 46, 46, 1);
				line-height: 0.42rem;
				
				// .flight-model{  
				// 	margin-right: 0.16rem;
				// }
			}
			
			.home-flight-info {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 0.26rem;
			
				.home-flight-seat {
					display: flex;
					align-items: center;
					padding:0 0.04rem 0 0.10rem;
					line-height: 0.32rem;
					background:rgba(0,32,91,1);
					border-radius:0.16rem;
					font-size: 0.0rem;
					font-weight: bold;
					color:rgba(255,255,255,1);
					margin-right: 0.16rem;
					> *{
						font-size: 0.20rem;
					}
					/* padding: 0.06rem 0.08rem 0.06rem 0.2rem;
					line-height: 0.32rem;
					font-size: 0.2rem;
					color: #fff;
					background-color: rgb(0, 32, 91);
					border-radius: 0.2rem; */
			
					.home-flight-g {
						margin-left: 0.12rem;
						margin-top: 0.01rem;
						font-size:0.20rem;
						font-weight:bold;
						color:rgba(0,32,91,1);
						border-radius: 50%;
						line-height: 0.24rem;
						text-align: center;
						display: inline-block;
						width: 0.24rem;
						height: 0.24rem;
						background:#ffffff;
					}
				}
			
				.flight-duration-time {
					display: flex;
					border-radius: 0.18rem;
					padding:0 0.12rem;
					background:rgba(0,174,199,1);
					height: 0.32rem;
					line-height: 0.32rem;
					
					font-size:0.20rem;
					font-weight:bold;
					color:rgba(255,255,255,1);
					margin-right: 0.16rem;
					
					>span{
						&:nth-child(1){
							margin-right: 0.20rem;
							
						}
						&:nth-child(2){
							
						}
					}
					
					/* >span:nth-child(1){
						
					}
					>span:nth-child(2){
						
					} */
				}
			
				.home-flight-c {
					border-radius:0.16rem;
					border:2px solid rgba(0,174,199,1);
					height: 0.30rem;
					text-align: center;
					padding:0 0.16rem;
					line-height: 0.30rem;
					box-sizing: border-box;
					background:#ffffff;
					
					font-size: 0.20rem;
					font-weight:bold;
					color:rgba(0,174,199,1);
					
					
				}
			}
			
			.home-flight-place {
				display: flex;
				// align-items: f;
				justify-content: center;
				height: 1.30rem;
				background:#FAFAFA;
				border-radius:4px;
				margin-bottom: 0.26rem;
				padding-top:0.28rem;
				box-sizing: border-box;
				
				.place{
					font-size:0.30rem;
					font-weight:bold;
					color:rgba(46,46,46,1);
					line-height:0.36rem;
					
					.time{
						text-align: center;
						margin-bottom: 0.16rem;
						>span{
							&:nth-child(1){
								margin-right: 0.16rem;
							}
						}
					}
					
					.address{
						text-align: center;
						font-size:0.20rem;
						color:rgba(51,51,51,1);
						line-height:0.24rem;
					}
				}
				
				
			
				
			
				.f1 {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 0.36rem;
					width:1.80rem;
					font-size: 0;
					// border-top: 0.02rem dotted rgb(0, 32, 91);
					
					>i{
						&:not(:last-child){
							margin-right: 0.06rem;
						}
					}
					
					>.dot{
						display: inline-block;
						width:0.04rem;
						height: 0.04rem;
						border-radius: 50%;
						// margin-right: 0.04rem;
						&.dark{
							background:rgba(0,0,0,1);
						}
						&.grey{
							background:rgba(0,0,0,0.3);
						}
						&.light{
							background:rgba(0,0,0,0.1);
						}
						
					}
					
					>.icon{
						color:#000000;
						font-size: 0.14rem;
						line-height: 0.20rem;
						font-size:0.20rem;
					}
				}
			
				
			
				
			}
			.map-box {
				height:2.2rem;
				
			}
	}
}
</style>
