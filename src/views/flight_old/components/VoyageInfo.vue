<template>
	<section class="voyage-info-main-ctn">
		<div class="top-ctn">
			<div class="flight-number">Visia line Area</div>
			<div class="baseinfo-ctn">
				<span class="seat-ctn">
					<span>Seat No:</span>
					<span>C30</span>
					<span>G</span>
				</span>

				<span class="temperature-ctn">26'C</span>

				<span class="remaining-ctn">
					<span>Remaining:</span>
					<span>2hours 10min</span>
				</span>
			</div>

			<div class="point-ctn">
				<div class="point-item start-point">
					<div class="address">ShenZhen T3</div>
					<time class="time">09:18</time>
				</div>

				<div class="airplane"><img src="../imgs/index/plane.png" alt="" /></div>

				<div class="point-item end-point">
					<div class="address">ShenZhen T3</div>
					<time class="time">09:18</time>
				</div>
			</div>
		</div>

		<div class="bottom-ctn">
			<van-swipe class="swipe-ctn" :autoplay="3000" indicator-color="#cccccc">
			  <van-swipe-item class="swipe-item">
				   <div id="chart1" class="chart"></div>
			  </van-swipe-item>
			  <van-swipe-item class="swipe-item">
				   <div id="map" ref="rootmap">
				  
				      </div>
			  </van-swipe-item>
			</van-swipe>
			
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
import echarts from 'echarts';

import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";


/* this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line',
                                smooth: true
                            }]
                        };

                        this.chart.setOption(optionData); */

@Component
export default class VoyageInfo extends Vue {
	// @Prop() private msg!: string;
	
	private chart:any;
	private map:any;
	
	mounted() {
	   this.renderCharts();
	   this.renderMap();
	}
	
	private renderMap(){
		 var mapcontainer = this.$refs.rootmap;
		    this.map = new Map({
		      target: "map",
		      layers: [
		        new TileLayer({
		          source: new OSM()
		        })
		      ],
		      view: new View({
		        projection: "EPSG:4326",    //使用这个坐标系
		        center: [114.064839,22.548857],  //深圳
		        zoom: 12
		      })
		    });
	}
	private renderCharts() {
		  this.chart = echarts.init(document.getElementById('chart1'));
		                          this.chart.clear();
		  
		  const optionData = {
			  xAxis: {
				  type: 'category',
				  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			  },
			  yAxis: {
				  type: 'value'
			  },
			  series: [{
				  data: [820, 932, 901, 934, 1290, 1330, 1320],
				  type: 'line',
				  smooth: true
			  }]
		  };
		  
		  this.chart.setOption(optionData);
	}
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* .main-ctn{
		position: relative;
		width: 100%;
		height: 100%;
		background: #ffffff;
	} */

.voyage-info-main-ctn {
	position: relative;
	border-radius: 0.04rem;
	width: 100%;
	height: 100%;
	background: #ffffff;

	.top-ctn {
		padding:0 0.54rem;
		margin-bottom: 0.20rem;
		.flight-number {
			font-size: 0.32rem;
			padding-top:0.24rem;
			line-height: 0.50rem;
			margin-bottom: 0.30rem;
		}
		
		.baseinfo-ctn {
			display: flex;
			align-items: center;
			margin-bottom: 0.40rem;
			.seat-ctn {
				border-radius: 0.20rem;
				padding:0 0.08rem;
				margin-right: 0.20rem;
				display: inline-block;
				line-height: 0.40rem;
				font-size: 0.32rem;
				color:#ffffff;
				background:#00205b;
				line-height: 0;
				padding:0.08rem 0.08rem;
				>span{
					vertical-align: middle;
					&:nth-child(1){
						
					}
					&:nth-child(2){
						
					}
					&:nth-child(3){
						margin:0 0.08rem;
						padding:0 0.08rem;
						color: #00205b;
						line-height: 0.3rem;
						font-size: 0.20rem;
						display: inline-block;
						border-radius: 50%;
						background:#ffffff;
					}
				}
			}
			
			.temperature-ctn {
				border-radius: 0.18rem;
				padding:0 0.12rem;
				font-size: 0.28rem;
				line-height: 0.36rem;
				color:#ffffff;
				background: #00aec7;
				margin-right: 0.20rem;
			}
			.remaining-ctn {
				border-radius: 0.18rem;
				white-space: nowrap;
				padding:0 0.12rem;
				font-size: 0.14rem;
				line-height: 0.36rem;
				color:#00205b;
				background: #f2f4f7;
				margin-right: 0.20rem;
			}
		}
		.point-ctn {
			display: flex;
			.point-item {
				text-align: center;
				
				&.start-point {
				}
				&.end-point {
				}
				.address {
					color:#000000;
					font-size: 0.32rem;
					line-height: 0.40rem;
					margin-bottom: 0.12rem;
				}
				.time {
					color:#999999;
					font-size: 0.20rem;
					line-height: 0.30rem;
					margin-bottom: 0.12rem;
				}
			}
			.airplane {
				margin:0 0.20rem;
				> img {
				}
			}
		}
	}
	.bottom-ctn {
		height: 3.60rem;
		background: #f2f4f7;
		.swipe-ctn{
			height: 100%;
			.swipe-item{
				width: 100%;
				height: 100%;
				// background:blue;
				tetx-align:center;
				font-size: 0.60rem;
				.chart{
					margin:auto;
					width: 6.00rem;
					height: 100%;
				}
			}
		}
		
	}

	/* .flight-chart-ctn{
				  
			  } */
}
</style>
