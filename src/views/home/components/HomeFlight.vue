<template>
  <div>
    <h2 class="abus-block-title">
      <van-cell value="Flight" class="block-title-background" />
    </h2>
    <div class="abus-scroller-box home-flight-box">
      <div class="home-flight-t">
		  <span classs="flight-model">
		    {{airplane.AirplaneModels}} 
		  </span>  
		  <span classs="flight-number"> 
			{{baseInfo.FlightNumber}}
		  </span>  
	  </div>  
	    
      <div class="home-flight-info">     
        <span class="home-flight-seat">    
          Seat No: <span>{{seatNumber}}</span>
          <i class="home-flight-g">G</i>
        </span>  
        <span class="home-flight-c">
			{{weather.Temper}} 
		</span>
      </div>
	  
      <div class="home-flight-place">
        <div class="place-l">
          From <span>{{baseInfo.DeparturePlanTimestamp|dateFormate('hh:mm')}}</span> 
		  
          <div class="initial">
			  {{baseInfo.Departure}}
		  </div>
        </div>
        <div class="f1"></div>
        <div class="place-r">
          To <span>{{baseInfo.ArrivalPlanTimestamp|dateFormate('hh:mm')}}</span> 
          <div class="destination">
			  {{baseInfo.Arrival}}
		   </div>
        </div>
      </div>
      <div class="map-box">
        <img src="../images/map.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component,Prop,Vue} from 'vue-property-decorator';
import  FlightService from '../../../service/flight';

@Component({
  name: 'HomeFlight',
  components:{    
	  
  }  
})
export default class HomeFlight extends Vue{
	public flightResData:any = {};
	public baseInfo:any = {};
	public airplane:any = {};
	public flightAltitudes:any = {};
	public weather:any = {};
	
	private get seatNumber(): string {
	  return this.$store.state.login.voyageInfo.seatNumber;
	}
	
	created(){
		this.getFlightInfo();
	}
	
	getFlightInfo(){
		FlightService.getFlightInfo().then((res:any)=>{
			this.flightResData = res;
			this.baseInfo = res.Flight.BaseInfo;
			this.airplane = res.Flight.Airplane;
			this.flightAltitudes = res.FlightAltitudes;
			this.weather = res.Weather;
		});   
		
		let a = {
			"Flight": {
				"Airplane": {
					"AirplaneModels": "空客 A330-243",
					"AirplaneImg": "http:\/\/disk.service.osp.connectivity.aero\/airplane@3x.png",
					"CabinImg": "http:\/\/disk.service.osp.connectivity.aero\/Airbus330-200-iphones.png",
					"Id": "4cfc4d33-2c1e-e911-bad5-f44d307124c0"
				},
				"BaseInfo": { 
					"Id": "4cfc4d33-2c1e-e911-bad5-f44d307124c0",
					"DepartureTimezone": 28800,
					"ArrivalTimezone": 28800,
					"FlightNumber": "VA3928",
					"AirlinesCode": "VA",
					"AirlinesName": "Vision Airlines",
					"AirlineEnName": "Vision Airlines",
					"AirlineIcon": "http:\/\/disk.service.osp.connectivity.aero\/AirlineIcon-veryzhun.png",
					"DepartureCode": "SZX",
					"DepAirport": "深圳宝安",
					"DepartureTerminal": "T3",
					"Door": "4-6号门",
					"ArrivalCode": "PEK",
					"ArrAirport": "北京首都",
					"ArrivalTerminal": "T1",
					"DeparturePlanTimestamp": 1550625600,
					"ArrivalPlanTimestamp": 1550637300,
					"Departure": "深圳",
					"Arrival": "北京",  
					"OntimeRate": "91.4%",
					"DepartPosition": {
						"Lat": "22.6033",
						"Lng": "113.829"
					},
					"ArrivalPosition": {
						"Lat": "40.1321",
						"Lng": "116.5881"
					},
					"Checkinend": "航班当日 08:30",
					"Tips": "准时起飞"
				}
			},
			
			"FlightAltitudes": [],
			"FlightPaths": [],
			"FlightSpeeds": [],
			"Weather": {
				"Status": 0,
				"Temper": "18℃",
				"Desc": "晴",
				"Img": "http:\/\/disk.service.osp.connectivity.aero\/weather@3x.png"
			},
			"DepartureTime": 1550625600,
			"ArrivalTime": 1550637300
		}
		
		
	}
	
	
	
};
</script>

<style lang="scss" scoped>
.block-title-background {
  background-color: #fafafa00;
}
.van-cell {
  font-size: 0.36rem;
}
.home-flight-box {
  padding: 0.08rem 0.28rem 0.28rem;
  margin: 0 0.28rem;
  background-color: #fff;
  border-radius: 0.1rem;
}
.home-flight-t {
  font-size: 0.44rem;
  color: rgb(51, 51, 51);
  font-weight: bold;
  line-height: 0.76rem;
}
.home-flight-info {
  width: 100%;
  height: 0.6rem;
  font-size: 0.2rem;
}
.home-flight-seat {
  padding: 0.06rem 0.08rem 0.06rem 0.2rem;
  line-height: 0.32rem;
  font-size: 0.2rem;
  color: #fff;
  background-color: rgb(0, 32, 91);
  border-radius: 0.2rem;
}
.home-flight-g {
  padding: 0.025rem 0.06rem;
  line-height: 0.32rem;
  background-color: #fff;
  color: rgb(0, 32, 91);
  border-radius: 50%;
  margin-left: 0.1rem;
  box-shadow: 0 0 0.01rem #efefef;
}
.home-flight-c {
  padding: 0.06rem 0.2rem;
  line-height: 0.32rem;
  font-size: 0.2rem;
  color: #fff;
  background-color: rgb(0, 174, 199);
  border-radius: 0.2rem;
  margin: 0 0 0 0.16rem;
}
.home-flight-place {
  display: flex;
  align-items: baseline;
  margin-top: 0.2rem;
  height: 1.1rem;
}
.place-l {
  position: relative;
  font-size: 0.24rem;
  margin-right: 0.1rem;
  color: rgb(0, 32, 91);
  .initial {
    position: absolute;
    left: 0;
    top: 0.4rem;
    font-size: 0.32rem;
    font-weight: bold;
  }
}
.place-r {
  position: relative;
  font-size: 0.24rem;
  margin-left: 0.1rem;
  margin-right: 1rem;
  color: rgb(0, 32, 91);
  .destination {
    position: absolute;
    left: 0;
    top: 0.4rem;
    font-size: 0.32rem;
    font-weight: bold;
  }
}
.f1 {
  height: 0.08rem;
  flex: 1;
  border-top: 0.02rem dotted rgb(0, 32, 91);
}
.map-box {
  // padding: 0 14px 10px;
  img {
    width: 100%;
    height: 1.6rem;
    display: block;
  }
}
</style>