<template>
	<section class="crew-chat">
		<!-- crew-income-statistics -->
		<div class="top-ctn">
			<div class="back-ctn" @click="stepToLayout()">
				<i class="icon icon-back"></i>
				<span>返回</span>
			</div>
		</div>

		<div class="content-ctn">
			<div class="content-ctt">
				<div class="aside-ctn">
					<div class="user-item" v-for="(item, index) in userList" :key="index">
						<div class="heade-img">{{ item.name }}</div>

						<div class="info-ctn">
							<div class="info-top-ctn">
								<span>{{ item.seatNumber }}</span>
								<span>{{ item.time }}</span>
							</div>
							<p class="info-bottom-ctm">{{ item.message }}</p>
						</div>
					</div>
				</div>

				<!-- messageList
				{
					usreId:'sdfsdf',
					isMe:false,
					name:'赖进文',
					time:'10:23',
					seatNumber:'23c',
					message:'我的餐好了没有啊,怎么这么慢呀,我的餐好了没有啊,怎么这么慢呀,我的餐好了没有啊,怎么这么慢呀'
				} -->
				<div class="main-ctn">
					<div class="message-ctn">
						<div class="message-item" v-for="(item, index) in messageList" :key="index" :class="{
							left:!item.isMe,
							right:item.isMe
						}">
							<div class="heade-img">{{ item.name }}</div>
							<div class="info-ctn">
								<div class="info-top-ctn">
									<span>{{ item.seatNumber }}</span>
									<span>{{ item.time }}</span>
								</div>
								<p class="info-bottom-ctm">{{ item.message }}</p>
							</div>
						</div>
						<!-- private userList:Array<any> = [{
							name:'刘志勇',
							seatNumber:'23c',
							
							message:'我的餐好了没有啊,怎么这么慢呀'
						}]; -->
					</div>
					<div class="oper-ctn">
						<div class="input-ctn"><textarea type="text"></textarea></div>

						<div class="submit-ctn">发送</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import CabinLayoutService from '../../service/crew/cabin-layout.ts';
import FlightSeatMatrix from './model/flight-seat-matrix';


@Component({
	name: 'CrewChat',
	components: {}
})
export default class CrewChat extends Vue {
	@Prop()
	curUserId:string;
	
	private userList: Array<any> = [
		{
			name: '刘志勇',
			time: '10:23',
			seatNumber: '23c',
			message: '我的餐好了没有啊,怎么这么慢呀'
		},
		{
			name: '刘志勇',
			time: '10:23',
			seatNumber: '23c',
			message: '我的餐好了没有啊,怎么这么慢呀'
		},
		{
			name: '刘志勇',
			time: '10:23',
			seatNumber: '23c',
			message: '我的餐好了没有啊,怎么这么慢呀'
		},
		{
			name: '刘志勇',
			time: '10:23',
			seatNumber: '23c',
			message: '我的餐好了没有啊,怎么这么慢呀'
		}
	];

	private messageList: Array<any> = [
		{
			usreId: 'sdfsdf',
			isMe: false,
			name: '赖进文',
			time: '10:23',
			seatNumber: '23c',
			message: '我的餐好了没有啊,怎么这么慢呀,我的餐好了没有啊,怎么这么慢呀,我的餐好了没有啊,怎么这么慢呀'
		},
		{
			usreId: 'sdfsdf',
			isMe: true,
			name: '刘志勇',
			time: '10:23',
			seatNumber: '23c',
			message: '我的餐好了没有啊,怎么这么慢呀,我的餐好了没有啊,怎么这么慢呀,我的餐好了没有啊,怎么这么慢呀'
		},
		{
			usreId: 'sdfsdf',
			isMe: false,
			name: '赖进文',
			time: '10:23',
			seatNumber: '23c',
			message: '我的餐好了没有啊,怎么这么慢呀,我的餐好了没有啊,怎么这么慢呀,我的餐好了没有啊,怎么这么慢呀'
		},
		{
			usreId: 'sdfsdf',
			isMe: true,
			name: '刘志勇',
			time: '10:23',
			seatNumber: '23c',
			message: '我的餐好了没有啊,怎么这么慢呀,我的餐好了没有啊,怎么这么慢呀,我的餐好了没有啊,怎么这么慢呀'
		}
	];

	private layoutList: Array<any> = [];

	private active: string = 'firstClass';


	mounted() {
	    this.getSeatMessageInfo();
	}
	
	//获取未读消息与座位的映射关系
	public getSeatMessageInfo():void{
		debugger;
		CabinLayoutService.getSeatMessageInfo().then((resData:any)=>{
			let seatMessageMap:any = {};
			
			if(resData.code == '200'){
				debugger; //
				// UserId: "3a03a40ac79b4f0d6eef58fcd99271d7"
				// message: []
				// total: 32,
				
				/* airbus_id: "4CFC4D33-2C1E-E911-BAD5-F44D307124C0"
				content: "xc"
				created_time: "2020-08-11 06:22:22"
				from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7"
				id: "e3368d8e667065d9c769c901a1dabd8c"
				read: 0
				to_user_id: "4CFC4D33-2C1E-E911-BAD5-F44D307124C0"
				type: 1 */
				/* resData.data.forEach((item,index)=>{
					seatMessageMap[item.UserId] = item;
				}); */
			}
			
			//this.seatMessageMap = seatMessageMap;
		});
		
	}
	
	private stepToLayout():void{
		this.$emit('close');
		
	}
}
</script>

<style lang="scss" scoped>
@function rem($px) {
	//$px为需要转换的字号
	@return $px / 100px * 1rem; //100px为根字体大小
}

.crew-chat {
	width: 100%;
	// height: 100%;
	background: #002566;
	position: fixed;
	top: 0;
	bottom: 0;
	z-index: 1200;
	box-sizing: border-box;
	margin-bottom: 1.2rem;

	.top-ctn {
		position: relative;
		padding: rem(60px) rem(60px) 0;
		display: flex;
		align-items: center;
		z-index: 120;

		.back-ctn {
			.icon {
				font-size: rem(40px);
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(255, 255, 255, 1);
				line-height: rem(40px);
				margin-right: rem(8px);
			}
			span {
				font-size: rem(40px);
				font-family: PingFangSC-Semibold, PingFang SC;
				// font-weight:600;
				color: rgba(255, 255, 255, 1);
				line-height: rem(40px);
			}
		}
	}

	.content-ctn {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-top: rem(122px);
		overflow: auto;

		.content-ctt {
			position: relative;
			width: 100%;
			height: 100%;

			.aside-ctn {
				position: absolute;
				padding: 0 rem(30px);
				height: 100%;
				width: rem(520px);
				overflow: auto;

				background: red;
				box-sizing: border-box;
				
				.user-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: rem(2px) solid rgba(255, 255, 255, 0.08);
					height: rem(176px);

					.heade-img {
						border-radius: 50%;
						width: rem(96px);
						height: rem(96px);
						line-height: rem(96px);
						white-space: nowrap;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						background: yellow;
					}
					.info-ctn {
						width: rem(340px);

						.info-top-ctn {
							display: flex;
							justify-content: space-between;
							margin-bottom: rem(10px);

							> span {
								font-size: rem(26px);
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: rgba(175, 213, 253, 1);
								line-height: rem(26px);
							}
						}
						.info-bottom-ctm {
							white-space: nowrap;
							font-size: rem(36px);
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: rgba(255, 255, 255, 1);
							line-height: rem(36px);
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}

			.main-ctn {
				margin-left: rem(520px);
				position: relative;
				height: 100%;

				.message-ctn {
					width: 100%;
					height: 100%;
					background: green;
					padding:rem(80px);
					box-sizing: border-box;
					overflow: auto;
					
					.message-item{
						 clear: both;
						   &.left{
							    float: left;
						   }
						   
						   &.right{
						   		float: right;
						   }
						   
							position: relative;
							// border-bottom: rem(2px) solid rgba(255, 255, 255, 0.08);
							// height: rem(176px);
							min-width: rem(332px);
							max-width: 90%;
							min-height: rem(124px);
							margin-bottom: rem(40px);
							border-radius:rem(60px);
							box-sizing: border-box;
							border:rem(4px) solid rgba(175,213,253,1);
							
							/* width:467px;
							height:124px;
							border-radius:61px;
							border:4px solid rgba(175,213,253,1); */
							
						
							.heade-img {
								position: absolute;
								top:rem(10px);
								left:rem(10px);
								border-radius: 50%;
								width: rem(96px);
								height: rem(96px);
								line-height: rem(96px);
								white-space: nowrap;
								text-align: center;
								overflow: hidden;
								text-overflow: ellipsis;
								background: yellow;
							}
							
							.info-ctn {
								margin-left: rem(140px);
								margin-right: rem(20px);
								margin-bottom: rem(20px);
								// width: rem(340px);
						
								.info-top-ctn {
									display: flex;
									justify-content: space-between;
									margin-top: rem(20px);
									margin-bottom: rem(10px);
						
									> span {
										font-size: rem(26px);
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: rgba(175, 213, 253, 1);
										line-height: rem(26px);
									}
								}
								.info-bottom-ctm {
									// white-space: nowrap;
									font-size: rem(36px);
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: rgba(255, 255, 255, 1);
									line-height: rem(40px);
									// overflow: hidden;
									// text-overflow: ellipsis;
								}
							}
						
					}
				}

				.oper-ctn {
					display: flex;
					padding: 0 rem(40px);
					align-items: center;
					justify-content: space-between;
					position: absolute;
					bottom: 0;
					height: rem(120px);
					z-index: 100;
					width: 100%;
					box-sizing: border-box;
					background: blue;

					.input-ctn {
						width: rem(1400px);
						height: rem(68px);
						background: rgba(49, 102, 171, 0.3);
						border-radius: rem(34px);
						overflow-y: auto;
						overflow-x: hidden;

						> textarea {
							width: 100%;
							height: 100%;
							background: transparent;
							line-height: rem(68px);
							border: none;
							padding: rem(16px) rem(30px);
							font-size: rem(36px);
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: rgba(255, 255, 255, 1);
							line-height: rem(36px);
						}
					}
					.submit-ctn {
						width: rem(200px);
						height: rem(68px);
						border-radius: rem(34px);
						background: #2a5ea3;
						text-align: center;
						color: #ffffff;
						line-height: rem(68px);
						// font-weight: bold;
						font-size: rem(40px);
					}
				}
			}
		}
	}
}
</style>
