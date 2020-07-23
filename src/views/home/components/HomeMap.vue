<template>
  <section class="homeflight-main-ctn">
		 <!-- <div class="geo-marker">
			  
		  </div> -->
        <div  id="homeMap" class="map-ctn" ref="mapCtn">
        				  
        </div>
  </section>
</template>

<script lang="ts">
import {Component,Prop,Vue} from 'vue-property-decorator';
import  FlightService from '../../../service/flight';

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
  name: 'HomeMap',  
  components:{    
	     
  }  
})
export default class HomeMap extends Vue{
	private chart:any;
	private map:any;
	
	mounted() {
	   this.renderMap();
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
		//2:========================================================================
				//3:====================================中心==========================
			
						
			        
		       /*
		         * @name: 初始化地图
		         * @description: 
		         * @param {type} none
		         * @return: 
		        */     
		     /*  const center = new fromLonLat([104.06250000000001, 30.65681556429287]); */
		      /* const center = [104.06250000000001, 30.65681556429287]; 
		        let map = new Map({
		            //图层顺序自下而上
		            layers: [
		                new Tile({
		                    source: new OSM({ })
		                }),flightTrackLayer,aircfaftLayer,
		            ],
		            renderer: 'canvas',
		            target: 'map',
		            view: new View({    
		                center: center,
		                zoom: 6
		            })
		        }); */ 
				/* var newLayer = new ol.layer.Tile({
				  source:new ol.source.OSM({url:"map/{z}/{x}/{y}.png"})
				}); */
				  
				
		var mapcontainer = this.$refs.mapCtn;
		   this.map = new Map({
		     target: "homeMap",
		     layers: [
		        new Tile({
		         source: new OSM({url:"http://172.16.8.69:8084/{z}/{x}/{y}.png"})
		       })
			  /* flightTrackLayer,
			   aircfaftLayer */
		     ],
			 // renderer: 'canvas',
		     view: new View({
		       projection: "EPSG:4326",    //使用这个坐标系
		       center: [114.064839,22.548857],  //深圳
		       zoom: 8
		     })
		   });
		 
		  //
		  // let markerEl:HTMLElement = document.getElementById('geo-marker');
		  
		/* let marker = Overlay({ 
		              positioning: 'bottom-center',
		              stopEvent: false,
		              dragging: false,
		              offset: [0, 0],
		              element: markerEl,
		              stopEvent: false
		          });
		 */
		   
	}
};
</script>

<style lang="scss" scoped>
	
	/* .geo-marker{
		width: 40px;
		height: 40px;
		background:#EF30CF;
	} */
	
.homeflight-main-ctn{
	width: 100%;
	height: 4.00rem;
	.map-ctn{
		position: relative;
		width: 100%;
		height: 1.90rem;
	}
}


</style>