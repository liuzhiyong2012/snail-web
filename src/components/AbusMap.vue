<template>
  <section class="homeflight-main-ctn">
	 
        <div  id="homeMap" class="map-ctn" ref="mapCtn">
        	<div id="geo-marker">
				<i class="icon icon-plane"></i>
			</div>
        </div>
  </section>
</template>

<script lang="ts">
import {Component,Prop,Vue} from 'vue-property-decorator';
import  FlightService from '../service/flight';

import "ol/ol.css";
import View from 'ol/View'
import Map from 'ol/Map'
import Feature from 'ol/Feature'  
import Overlay from 'ol/Overlay';
import Tile from 'ol/layer/Tile'
import Image from 'ol/layer/Image'
import  VectorLayer from 'ol/layer/Vector' 
import XYZ from 'ol/source/XYZ'
import WMTS from 'ol/source/WMTS' 
import VectorSource from 'ol/source/Vector'
import WFS from 'ol/format/WFS'
import GeoJSON from 'ol/format/GeoJSON'
import OSM from 'ol/source/OSM.js'
import TileWMS from 'ol/source/TileWMS.js'
import ImageWMS from 'ol/source/ImageWMS.js'
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke'
import Fill from 'ol/style/Fill'
import {transform, fromLonLat, toLonLat} from 'ol/proj'
import ImageStyle from 'ol/style/Image';
import Icon from 'ol/style/Icon';
import Circle from 'ol/style/Circle';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { buffer } from 'ol/extent';


// import { buffer }  from 'ol/layer';
/* import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import LineString from 'ol/geom/LineString';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import {Stroke, Style} from 'ol/style'; */
// import {getVectorContext} from 'ol/render';


@Component({
  name: 'AbusMap',  
  components:{    
	     
  }  
})
export default class AbusMap extends Vue{
	
	private chart:any;
	private map:any;
	
	private flightInfo:any;
	
	created(){
		let a = this.flightInfo;
		
	}
	
	mounted() {
	   this.getFlightInfo();
	   // this.renderMap();
	}
	
	
	public getFlightInfo():void{
		  FlightService.getFlightInfo({}).then((res:any)=>{
			  if(res.code == '200'){
				  this.flightInfo = res.data;
				  this.renderMap();
			  }
		  });
	}
	
	public renderMap():void{
		//1:
		 let route_style = new Style({
		            stroke:new Stroke({
		                width:2,
		                color: '#007cbf'
		            }),
		            zIndex:2
		        });
		        //创建轨迹线
		        let trackLine = new LineString([]);   
		        //矢量图层层
		        let aircfaftLayer = new VectorLayer({
		            source:new VectorSource(),
		        })
				
		        let flightTrackLayer = new VectorLayer({
		            source:new VectorSource({
		                features:[
		                    new Feature({
		                        geometry:trackLine
		                    })
		                ]
		            }),
		            style:route_style,
		            updateWhileInteracting: true,//拖拽时自动更新位置 顺滑拖拽
		        });
				
		
				  
				
		var mapcontainer = this.$refs.mapCtn;
		   this.map = new Map({
		     target: "homeMap",
		     layers: [
		        new Tile({
		         source: new OSM({url:"http://172.16.8.69:8084/{z}/{x}/{y}.png"})
		       }),
			  flightTrackLayer,
			   aircfaftLayer
		     ],
			 renderer: 'canvas',
		     view: new View({
		       projection: "EPSG:4326",    //使用这个坐标系
		       center: [114.064839,22.548857],  //深圳
		       zoom: 8
		     })
		   });
		   
		   
		    let markerEl = document.getElementById('geo-marker');
		           let marker = new Overlay({
		               positioning: 'bottom-center',
		               stopEvent: false,
		               dragging: false,
		               offset: [0, 0],
		               element: markerEl,
		               stopEvent: false
		           });
		           this.map.addOverlay(marker);
		           
		           //飞机图标样式
		          function createGoodStyle(aircraftNum) {
		               return new Style({
		                   image:new Circle({
		                       radius:4,
		                       snapToPixel:false,
		                       fill:new Fill({
		                           color:'yellow'
		                       }),
		                       stroke:new Stroke({
		                           color:"#333",
		                           width:2
		                       })
		                   })
		               });
		           }
		    
		           //设置地图中心
		           let centerAir = val => {
					   
		               this.map.getView().setCenter(val);
		           }
				   
				   this.drawLines();
				   
				   let coords:Array<any> = [], intervalId, interval = 1000, i = 0;
				   let theAirplane = new Feature([]);
				     
				   			// coords = this.flightInfo;
							
							
							this.flightInfo.FlightPaths.forEach((item,index)=>{
								coords.push([
									Number(item.Lng),
									Number(item.Lat)
								]);
							});
							
							 // [104.06250000000001, 30.65681556429287],
							
							/* Course: 155
							Lat: "22.603300"
							Lng: "113.829000" */
							
				   			
				                        theAirplane.setId('123123');
				                        theAirplane.set("speed",323);
										
				                        theAirplane.setStyle(this.createGoodStyle(this.flightInfo.Flight.BaseInfo.AirlineEnName));
										
				                        theAirplane.getStyle().getImage().setRotation(130);
				                        aircfaftLayer.getSource().addFeature(theAirplane); 
										
					// return;
					// intervalId = setInterval(() => {
					                    let  position = coords[0]||fromLonLat(coords[0]);
										
					                        //标牌
					                        marker.setPosition(position);
					                        // markerEl.innerHTML = '<div>hello</div>';
											//this.flightInfo.Flight.BaseInfo.AirlineEnName;//简标牌//航迹
											centerAir(position);
											
											//将所有点添加到地图上。
											
											coords.forEach((item,index)=>{
												let point = coords[index]||transform(coords[index], 'EPSG:4326', 'EPSG:3857');
												trackLine.appendCoordinate(point);
											});
											
					                       //以当前位置为地图中心
					                       // }, interval);
		 
	}
	
	createGoodStyle(aircraftNum){
		
		     return new Style({
		         image:new Circle({
		             radius:4,
		             snapToPixel:false,
		             fill:new Fill({
		                 color:'yellow'
		             }),
		             stroke:new Stroke({
		                 color:"#333",
		                 width:2
		             })
		         })
		     });
		 
	}
	
	//绘制航线
	public drawLines(){
		
	}
    
	//
	public updateFlight(){
		
	}
};
</script>

<style lang="scss" scoped>
	
	#geo-marker{
		border:1px solid #ffffff;
		border-radius: 50%;
		width: 0.36rem;
		height: 0.36rem;
		background:#00205B;
		text-align: center;
		>.icon{
			color:#ffffff;
			font-size: 0.20rem;
			line-height: 0.36rem;
		}
	}
	
.homeflight-main-ctn{
	width: 100%;
	height: 100%;
	.map-ctn{
		position: relative;
		width: 100%;
		height: 100%;
	}
}


</style>