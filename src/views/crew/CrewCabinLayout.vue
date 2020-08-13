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
			
			<div class="class-bar-ctn">
				<div v-for="(item,index) in tabList" class="bar-item" :key="index" :class="{active:active == item.value,hasNewMessage:true}" >
					<span class="label">{{item.name}}</span>
					<span class="message-count">23</span>
					
					
				</div>
			</div>
		</div>
		
		<div class="content-ctn">
			
			<div class="flight-layout-ctn">
				<section class="section-ctn" v-for="(rowItemArr,sectionIndex) in layoutList" :key="sectionIndex">
					<div class="section-title">
						Economy class
					</div>
					<div class="section-number-laber">
					    <div class="seat-head-label" v-for="(labelName,index) in seatHeadLabelArr" :key="index">
							{{labelName}}
						</div>
					</div>
					<div class="section-content">
						  <section class="row-ctn" v-for="(colArr,rowIndex) in rowItemArr" :key="rowIndex">
							    <div class="col-ctn" v-for="(seatArr,colIndex) in colArr" :key="colIndex">
									<h6 @click.stop.prevent = "clickSeatItem(seatItem)" class="seat-ctn" v-for="(seatItem,seatIndex) in seatArr" :key="seatIndex" :class="{'hasNewMessage':(!!seatMessageMap[seatItem.UserId]),'disabled':(!seatItem.UserId)}">
										<span>
											{{seatItem.Name}}
											<!-- {{seatItem.UserId}} -->
										</span>
										<i class="icon icon-seat"></i>
										
										<div class="seat-message-count" v-if="seatMessageMap[seatItem.UserId]">
											{{seatMessageMap[seatItem.UserId].total}}
										</div>
										
										<!-- seatMessageMap
										UserId: "3a03a40ac79b4f0d6eef58fcd99271d7"
										message: (3) [{…}, {…}, {…}]
										total: 32 , -->
										
										<div class="message-tip" v-if="seatMessageMap[seatItem.UserId]&&(seatItem.UserId == showTipUserId)">
											<div class="item-left">
												{{seatItem.Name}}
											</div>
											<div  class="item-right">
												<div class="message-ctn" v-for="(messageItem,index) in seatMessageMap[seatItem.UserId].message" :key="index">
													<span class="message-txt">{{messageItem.content}}</span>
													<span class="read-btn" @click.stop.prevent="goToChat(seatItem)">go</span>
												</div>
											</div>
											<div class="triangle-ctn">
												
											</div>
										</div>
									</h6>
								</div>
						  </section>
					</div>
				</section>
				<!-- layoutList -->
				
			</div>
		</div>
		
		<crew-chat v-if="curUserId" :curUserId="curUserId" @close="curUserId = ''"></crew-chat>
		
	</section>
</template>


	
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import CabinLayoutService from '../../service/crew/cabin-layout.ts';
import FlightSeatMatrix from './model/flight-seat-matrix.ts';
import CrewChat from './CrewChat.vue';


@Component({
	name: 'CrewCatering',
	components: {
		CrewChat
	}
})
export default class CrewCatering extends Vue {
	private layoutList:Array<any> = [];
	
	private active:string = 'firstClass';
	
	private seatHeadLabelArr:Array<any> = ['A','B','C','D','E','F','G'];
	
	private seatMessageMap:any = {
		
	};
	
	private socket:any = null;
	
	private showTipUserId = '';
	
	private docClickHandle:any = null;
	
	//展示聊天弹窗
	private showChatModal:boolean = false;
	
	private curUserId:string = false;
	
	
	
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
	
	
	private mounted(){
		this.docClickHandle = (e)=>{
			this.showTipUserId = '';
		};
		document.addEventListener('click',this.docClickHandle);
		this.startWebScoket();
		this.getFlightSeatInfo();
		this.getSeatMessageInfo();
	}
	
	
	private beforeDestroy(){
		document.removeEventListener('click',this.docClickHandle);
		// this.getFlightSeatInfo();
		/* this.getFlightSeatInfo();
		this.getSeatMessageInfo(); */
	}
	
	private startWebScoket(){
		this.socket = io('http://172.16.8.69:2120/');
		// uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
		let uid = '4CFC4D33-2C1E-E911-BAD5-F44D307124C0';
		
		// socket连接后以uid登录
		this.socket.on('connect', ()=>{
			console.log('connect');
		    this.socket.emit('login', uid);
		});
		
		// 后端推送来消息时
		this.socket.on('new_msg', function(msg){
			console.log('new_msg：');
		    console.log('收到消息：'+msg);
		});
		//hello world
		
		// 后端推送来在线数据时
		this.socket.on('saveNoticeList', function(online_stat){
			console.log('saveNoticeList：');
		    console.log(online_stat);
		});
		
		this.socket.on('saveChatList', function(online_stat){
			console.log('saveChatList：');
		    console.log(online_stat);
		});
		
		/* new_msg
		saveNoticeList
		saveChatList */
	}
	
	private clickSeatItem(seatItem){
		
		if(!seatItem.UserId){//座位上没有用户
			this.showTipUserId = '';
		}else if(!this.seatMessageMap[seatItem.UserId]){//有用户但是没有新消息
			this.goToChat(seatItem);
		}else if(this.seatMessageMap[seatItem.UserId]&&seatItem.UserId == this.showTipUserId){//有用户并且消息tip处于展示状态
			this.showTipUserId = '';
		}else if(this.seatMessageMap[seatItem.UserId]&&seatItem.UserId != this.showTipUserId){//有用户并且消息tip处于关闭状态
			this.showTipUserId = seatItem.UserId;
		}else{
			this.$toast('这是什么鬼!');
		}
		
		
		{
			//有用户但是没有新消息
			if(this.seatMessageMap[seatItem.UserId]){
				
			}
			//有用户并且消息tip处于展示状态
			//有用户并且消息tip处于关闭状态
			
		}
		/* if(this.showTipUserId ==){
			
		} */
		
	}
	
	private goToChat(seatItem){
		this.showTipUserId = '';
		this.curUserId = seatItem.UserId;
	}
	
	
	
	//获得航班的座位布局信息
	public getFlightSeatInfo():void{
		CabinLayoutService.getFlightSeatInfo().then((resData:any)=>{
			if(resData.code == '200'){
				// debugger;
				console.log('=============================断点开始================================');
				let flightObj = new FlightSeatMatrix(resData.data);
				this.layoutList = flightObj.getLayoutArr();
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
	
	//获取未读消息与座位的映射关系
	public getSeatMessageInfo():void{
		// debugger;
		CabinLayoutService.getSeatMessageInfo().then((resData:any)=>{
			//debugger;
			/* UserId: "3a03a40ac79b4f0d6eef58fcd99271d7"
			message: (3) [{…}, {…}, {…}]
			total: 32 */
			let seatMessageMap:any = {};
			if(resData.code == '200'){
				resData.data.forEach((item,index)=>{
					seatMessageMap[item.UserId] = item;
				});
			}
			this.seatMessageMap = seatMessageMap;
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
			.class-bar-ctn{
				margin-left: rem(130px);
				display: flex;
				.bar-item{
					position: relative;
					
					font-size:rem(40px);
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(255,255,255,1);
					line-height:rem(40px);
					padding-bottom: rem(22px);
					margin-right: rem(90px);
					
					//激活状态
					&.active{
						&:after{
							position: absolute;
							content:'';
							height:rem(6px);
							background:rgba(132,189,0,1);
							left: 0;
							bottom: 0;
							width: 100%;
						}
					}
					
					.hasNewMessage{
						
					}
					
				
					
					
					
					
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
			
			/* .flight-layout-ctn{
				display: flex;
				justify-content: center;
			} */
			
			.flight-layout-ctn{
				display: flex;
				justify-content: center;
				flex-direction: column;
				padding:0 rem(420px);
				
				.section-ctn{
					.section-title{
						font-size:rem(60px);
						font-family:PingFangSC-Semibold,PingFang SC;
						font-weight:600;
						color:rgba(216,216,216,1);
						line-height:rem(60px);
						-webkit-background-clip:text;
						-webkit-text-fill-color:transparent;
						margin-bottom: rem(60px);
					}
					
					/* .section-number-laber{
					} */
					
					.section-number-laber{
						display: flex;
						justify-content: flex-start;
						
						
						.seat-head-label{
							width: rem(84px);
							font-size:rem(32px);
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:rgba(255,255,255,1);
							line-height:rem(32px);
							margin-bottom: rem(34px);
							
						}
					}
					
					
					.section-content{
						.row-ctn{
							display: flex;
							justify-content: space-between;
							margin-bottom: rem(56px);
							
							.col-ctn{
								display: flex;
								justify-content: space-between;
								.seat-ctn{
									position: relative;
									display: inline-block;
									width: rem(84px);
									height: rem(84px);
									text-align: center;
									margin-right: rem(32px);
									
									&.disabled{
										.icon{
											color:#4d6998 !important;
										}
									}
									
									&.hasNewMessage{
										
									}
									
									>span{
										text-align: center;
										color:green;
										width: 100%;
										font-size: rem(30px);
										line-height: rem(84px);
										display: block;
										position: absolute;
										
										
									}
									.icon{
										color:#ffffff;
										font-size: rem(84px);
										line-height: rem(84px);
									}
									
									.seat-message-count{
										display: inline-block;
										position: absolute;
										top:rem(-10px);
										right: rem(-10px);
										width:rem(40px);
										height:rem(40px);
										text-align: center;
										line-height: rem(40px);
										font-size: rem(26px);
										font-weight:400;
										color:rgba(255,255,255,1);
										background:rgba(254,80,0,1);
										border-radius: 50%;
										
									}
									
									.message-tip{
										position: absolute;
										left: 50%;
										bottom:100%;
										
										margin-bottom: rem(26px);
										padding:0 rem(30px);
										transform: translateX(-50%);
										box-sizing: border-box;
										min-width: rem(460px);
										max-width: rem(800px);
										border-radius: rem(32px);
										background:rgba(0,47,114,1);
										box-shadow:0px rem(13px) rem(14px) 0px rgba(0,0,0,0.13);
										border:rem(4px) solid rgba(175,213,253,1);
										
										.item-left{
											position: absolute;
											left: rem(30px);
											top:50%;
											transform: translateY(-50%);
											
											width:rem(68px);
											height:rem(36px);
											background:rgba(0,174,199,1);
											box-shadow:0px rem(13px) rem(14px) 0px rgba(0,0,0,0.13);
											border-radius:rem(6px);
											
											font-size:rem(22px);
											font-family:PingFangSC-Semibold,PingFang SC;
											font-weight:600;
											color:rgba(255,255,255,1);
											line-height:rem(36px);
											text-shadow:0px rem(13px) rem(14px) rgba(0,0,0,0.13);
											
										}
										.item-right{
											margin-left: rem(114px);
											
											.message-ctn{
												text-align: left;
												position: relative;
												height: rem(66px);
												padding-right: rem(80px);
												&:not(:last-child){
													border-bottom: rem(2px) solid #AFD5FD;
												}
												.message-txt{
													text-align: left;
													white-space: nowrap;
													overflow: hidden;
													text-overflow: ellipsis;
													
													font-size:rem(24px);
													font-family:PingFangSC-Medium,PingFang SC;
													font-weight:500;
													color:rgba(255,255,255,1);
													line-height: rem(66px);
													
												}
												.read-btn{
													position: absolute;
													top:rem(20px);
													right: 0;
													width:rem(56px);
													height:rem(28px);
													box-shadow:0px rem(13px) rem(14px) 0px rgba(0,0,0,0.13);
													border-radius:rem(6px);
													border:rem(1px) solid rgba(175,213,253,1);
													text-align: center;
													line-height: rem(26px);
													font-size:rem(20px);
													color:rgba(175,213,253,1);
													
												}
											}
										}
										
										.triangle-ctn{
											position: absolute;
											bottom: rem(-10px);
											left:50%;
											width: rem(10px);
											height: rem(10px);
											transform: translateX(-50%) rotate(-45deg);
											border-left: rem(4px) solid rgba(175,213,253,1);
											border-bottom: rem(4px) solid rgba(175,213,253,1);
											background: rgba(0,47,114,1);;
											
										}
									}
									
									
								}
							}
						}
					}
				}
			}
			
			
		}
		
		
		
	}


</style>
