<template>
	<section class="crew-income-statistics">
		<!-- crew-income-statistics -->
		<div class="top-ctn">
			<div class="back-ctn">
				<i class="icon icon-back"></i>
				<span>
					返回
				</span>
			</div>
			
		</div>
		
		
		<div class="content-ctn">
			<div class="content-ctt">
				<div class="aside-ctn">
					
				</div>
				<div class="main-ctn">  
					<div class="message-ctn">
						
					</div>
					<div class = "oper-ctn">
						<input type="text"></input>
						<div>
							发送
						</div>
					</div>
				</div>
			</div>
			
			
		</div>
		
	</section>
</template>


	
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import CabinLayoutService from '../../service/crew/cabin-layout.ts';
import FlightSeatMatrix from './model/flight-seat-matrix.ts';


@Component({
	name: 'CrewCatering',
	components: {
		
	}
})
export default class CrewCatering extends Vue {
	private layoutList:Array<any> = [];
	
	private active:string = 'firstClass';
	
	private tabList:Array<any> = [
		{
			name:'First class',
			value:'firstClass'
	    },
		{
			name:'Business class',
			value:'businessClass'
		},
		{
			name:'Economy class',
			value:'economyClass'
		}
	];
	
	
	
	mounted(){
		CabinLayoutService.getFlightSeatInfo().then((resData:any)=>{
			if(resData.code == '200'){
				let flightObj = new FlightSeatMatrix(resData.data);
			}
			
			/* debugger; */
			/* Name: "1A"
			UserId: "8f7288d9d6fe403f9ee2fad9f46285d7"
			col: 1
			col-number: 1
			id: "1"
			row: 1 */
			
		});
	}
	
}
</script>

<style lang="scss" scoped>
    @function rem($px){//$px为需要转换的字号
	    @return $px / 100px * 1rem; //100px为根字体大小
	} 
	
	.crew-income-statistics{
		width: 100%;
		// height: 100%;
		background: #002566;
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 1200;
		box-sizing: border-box;
		margin-bottom: 1.20rem; 
		
		.top-ctn{
			padding: rem(60px) rem(60px) 0 ;
			display: flex;
			align-items: center;
			
			.back-ctn{
				.icon{
					font-size:rem(40px);
					font-family:PingFangSC-Semibold,PingFang SC;
					font-weight:600;
					color:rgba(255,255,255,1);
					line-height:rem(40px);
					margin-right: rem(8px);
				}
				span{
					font-size:rem(40px);
					font-family:PingFangSC-Semibold,PingFang SC;
					// font-weight:600;
					color:rgba(255,255,255,1);
					line-height:rem(40px);
				}
			}
	
		}
		
		.content-ctn{
			position: absolute;
			top:0;
			left: 0;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding-top:rem(122px);
			overflow: auto;
			
			.content-ctt{
				position: relative;
				width: 100%;
				height: 100%;
				
				.aside-ctn{
					position: absolute;
					height: 100%;
					width: rem(520px);
					background: red;
				}
				
				.main-ctn{
					margin-left: rem(520px);
					position: relative;
					height: 100%;
					
					.message-ctn{
						width: 100%;
						height: 100%;
						background: green;
					}
					.oper-ctn{
						position: absolute;
						bottom: 0;
						height: rem(120px);
						z-index: 100;
						width: 100%;
						background: blue;
					}
				}
			}
			
			
		}
		
		
		
	}


</style>
