<template>
	<section class="flight-main-ctn" :class="{ collapsed: isCollapsed }">
		
		<abus-title title="Flight"></abus-title>
		
		<section class="flight-content-ctn">
			<abus-map class="map-ctn" :style="calcStyle('map')"></abus-map>
			<section class="camera-ctn" :style="calcStyle('camera')">
				<div class="camera-switch-ctn">
					<div class="camera-switch-item">
						<svg v-if="activeCamera == 'frontCamera'" class="icon" aria-hidden="true"><use xlink:href="#icon-front-camera"></use></svg>
						<svg v-if="activeCamera != 'frontCamera'" class="icon" aria-hidden="true" @click="toggleCameraTo('frontCamera', false)">
							<use xlink:href="#icon-front-camera-disable"></use>
						</svg>
					</div>
			
					<div class="camera-switch-item">
						<svg v-if="activeCamera == 'centralCamera'" class="icon" aria-hidden="true"><use xlink:href="#icon-central-camera"></use></svg>
						<svg v-if="activeCamera != 'centralCamera'" class="icon" aria-hidden="true" @click="toggleCameraTo('centralCamera', false)">
							<use xlink:href="#icon-central-camera-disable"></use>
						</svg>
					</div>
			
					<div class="camera-switch-item">
						<svg v-if="activeCamera == 'backCamera'" class="icon" aria-hidden="true"><use xlink:href="#icon-back-camera"></use></svg>
						<svg v-if="activeCamera != 'backCamera'" class="icon" aria-hidden="true" @click="toggleCameraTo('backCamera', false)">
							<use xlink:href="#icon-back-camera-disable"></use>
						</svg>
					</div>
				</div>
				<div class="camera-video-ctn">
					<video muted  autoplay loop class="camera-video" v-if="cameraUrl[activeCamera]"  :src="cameraUrl[activeCamera]"  alt="" controls="controls" x5-playsinline="" playsinline="" webkit-playsinline=""></video>
				</div>
			</section>
			
			<section class="content-ctn">
				<div class="switch-ctn">
					<div class="switch-item" @click="switchPageTo('map')">
						<svg v-if="active == 'map'" class="icon" aria-hidden="true"><use xlink:href="#icon-map"></use></svg>
						<svg v-if="active != 'map'" class="icon" aria-hidden="true"><use xlink:href="#icon-map-disable"></use></svg>
					</div>
			
					<div class="switch-item" @click="switchPageTo('camera')">
						<svg v-if="active == 'camera'" class="icon" aria-hidden="true"><use xlink:href="#icon-camera"></use></svg>
						<svg v-if="active != 'camera'" class="icon" aria-hidden="true"><use xlink:href="#icon-camera-disable"></use></svg>
					</div>
				</div>
			
				<div class="voyage-ctn">
					<div class="top-ctn">
						<abus-flight></abus-flight>
					</div>
					<div class="bottom-ctn">
						<div class="chart-ctn" ref="chartCtn"></div>
					</div>
				</div>
			</section>
		</section>
	</section>
</template>

<script lang="ts">
import VoyageInfo from './components/VoyageInfo.vue';
import AbusMap from '../../components/AbusMap.vue';
import AbusTitle from '../../components/AbusTitle.vue';
import AbusFlight from '../../components/AbusFlight.vue';

import { Component, Prop, Vue } from 'vue-property-decorator';
import echarts from 'echarts';

import FlightService from '../../service/flight';
import DateUtils from '../../utils/date-utils';

@Component({
	name: 'FlightIndex',       
	components: {
		AbusMap,
		AbusFlight,
		AbusTitle,
		VoyageInfo
	}
})
export default class FlightIndex extends Vue {
	@Prop() private msg!: string;

	private active: string = 'map'; //"camera,map"
	private dataList: any = [];

	private activeCamera: string = 'frontCamera'; //header,body,footer
	
	private cameraUrl:any = {
		frontCamera:null,
		centralCamera:null,
		backCamera:null
	};
	
	
	private chart: any = {};
	private flightInfo: any = {
		name: '刘志勇'
	};

	private isCollapsed: boolean = false;

	private touchStartHandle: any = null;
	private touchMoveHandle: any = null;
	private touchEndHandle: any = null;

	private created() {}

	private mounted() {
		this.listenScroll();
		this.getFlightInfo();
	}
	
	private destroyed() {
		document.removeEventListener('touchstart', this.touchStartHandle);
		document.removeEventListener('touchmove', this.touchMoveHandle);
		document.removeEventListener('touchend', this.touchEndHandle);
	}
	
	

	public listenScroll(): void {
		var startX:any, startY:any, endX:any, endY:any;

		this.touchStartHandle = (event:any) => {
			var touch = event.touches[0];
			startY = touch.pageY;
			startX = touch.pageX;
		};

		this.touchMoveHandle = (event:any) => {
			var touch = event.touches[0];
			endY = startY - touch.pageY;
			endX = startX - touch.pageX;
		};

		this.touchEndHandle = (event:any) => {
			//100是给定触上下方向摸起始的坐标差
			if (endY > 100) {
				console.log('向上滑动');
				this.isCollapsed = false;
			} else if (endY < -100) {
				console.log('向上滑动');
				this.isCollapsed = true;
			} else {
				//啥也不干
				console.log('啥也不干');
			}
		};

		document.addEventListener('touchstart', this.touchStartHandle, false);
		document.addEventListener('touchmove', this.touchMoveHandle, false);
		document.addEventListener('touchend', this.touchEndHandle, false);
	}

	public getFlightInfo(): void {
		FlightService.getFlightInfo({}).then((res: any) => {
			if (res.code == '200') {
				this.flightInfo = res.data;
				
				this.cameraUrl = {
					frontCamera:this.flightInfo.Flight.Airplane.FrontVideo,
					centralCamera:this.flightInfo.Flight.Airplane.MiddleVideo,
					backCamera:this.flightInfo.Flight.Airplane.RearVideo
				};
				
				this.renderCharts();
			}
		});
	}

	public calcStyle(page: string) {
		if (this.active == 'camera') {
			if (page == 'camera') {
				return {
					visibility: 'visible',
					zIndex: 100
				};
			} else {
				return {
					visibility: 'hidden',
					zIndex: 10
				};
			}
		} else {
			if (page == 'camera') {
				return {
					visibility: 'hidden',
					zIndex: 10
				};
			} else {
				return {
					visibility: 'visible',
					zIndex: 100
				};
			}
		}
	}

	public toggleCameraTo(camera: string): void {
		this.activeCamera = camera;

		// 'centralCamera',false
	}

	public switchPageTo(page: string): void {
		this.active = page;
	}

	public renderCharts() {
		let timesData: Array<any> = [];
		let speedsData: Array<any> = [];
		let altitudesData: Array<any> = [];

		this.flightInfo.FlightAltitudes.forEach((item:any, index:number) => {
			let time = DateUtils.formate(item.TimePoint, 'hh:mm');
			timesData.push(time);
			speedsData.push(this.flightInfo.FlightSpeeds[index].Speed);
			altitudesData.push(item.Altitude);
		});

		this.chart = echarts.init((this as any).$refs.chartCtn);
		this.chart.clear();

		const optionData = {
			grid: {
				left: '10%',
				right: '10%',
				top: '9.6%',
				bottom: '20%'
			},
			legend: {
				orient: 'horizontal',
				x: 'center',
				y: 'bottom',
				// padding:
				padding: [0, 20, 15, 20],
				data: ['Altitude m', 'Speed km/h']
			},
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				type: 'category',
				data: timesData,
				axisTick: {
					show: false
				}
			},
			yAxis: [
				{
					name: '',
					type: 'value',
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: true
					}
				},
				{
					name: '',
					type: 'value',
					axisLine: {
						show: false
					},
					axisLabel: {
						interval:'auto',
						show: true,
						formatter:'{value}%'
					},
					axisTick: {
						show: false
					}
				}
			],
			series: [
				{
					name: 'Altitude m',
					data: altitudesData,
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							color: '#02AEC8', //改变折线点的颜色
							lineStyle: {
								color: '#02AEC8' //改变折线颜色
							}
						}
					}
				},
				{
					name: 'Speed km/h',
					data: speedsData,
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							color: '#00205B', //改变折线点的颜色
							lineStyle: {
								color: '#00205B' //改变折线颜色
							}
						}
					}
				}
			]
		};


		this.chart.setOption(optionData);
	}
}
</script>

<style lang="scss" scoped>
.flight-main-ctn {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	&.collapsed {
		.content-ctn {
			height: 4.4rem !important;

			.voyage-ctn {
				.top-ctn {
					margin-bottom: 0;
				}
				.bottom-ctn {
					display: none;
				}
			}
		}
	}
    
	.flight-content-ctn{
		position: absolute;
		top:1.00rem;
		width:100%;
		bottom:0;
		
		.map-ctn {
			position: absolute;
			width: 100%;
			height: 100%;
		}
		
		.camera-ctn {
			position: absolute;
			width: 100%;
			height: 100%;
			background: black;
			z-index: 10;
			.camera-switch-ctn {
				position: absolute;
				width: 0.5rem;
				top: 0.44rem;
				right: 0.3rem;
				font-size: 0;
				line-height: 0;
				z-index: 100;
				text-align: center;
		
				.camera-switch-item {
					margin-bottom: 0.2rem;
					height: 0.5rem;
		
					> .icon {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}
			
			.camera-video-ctn{
				z-index: 10;
				width: 100%;
				height: 100%;
				
				> video {
				  :focus {
				    overflow: hidden;
				    border: none !important;
				    box-shadow: none !important;
				    outline: none;
				  }
				  :active {
				    overflow: hidden;
				    border: none !important;
				    box-shadow: none !important;
				    outline: none;
				  }
				  // object-fit: fill;
				  outline: none;
				  border: none;
				  display: block;
				  width: 100%;
				  object-fit: cover;
				  object-position: center center;
				}
				
				// .camera-video{
				// 	width: 100%;
				// 	height: 100%;
				// }
			}
		}
		
		.content-ctn {
			position: absolute;
			padding: 0 0.3rem 0.5rem 0.3rem;
			width: 100%;
			height: 7.8rem;
			bottom: 0;
			z-index: 200;
			box-sizing: border-box;
		
			.switch-ctn {
				width: 1.72rem;
				margin-left: auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 0.28rem;
				.switch-item {
					width: 0.76rem;
					height: 0.5rem;
					background: rgba(255, 255, 255, 1);
					border-radius: 0.26rem;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
		
					svg.icon {
						width: 0.42rem;
						height: 0.42rem;
					}
				}
			}
		
			//实不相瞒
			.voyage-ctn {
				.top-ctn {
					width: 100%;
					height: 3.4rem;
					margin-bottom: 0.3rem;
				}
				.bottom-ctn {
					.chart-ctn {
						height: 3.1rem;
						background: rgba(255, 255, 255, 1);
						border-radius: 0.12rem;
					}
				}
			}
		}
	}
	
	
}
</style>
