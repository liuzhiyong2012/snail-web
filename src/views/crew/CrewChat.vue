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
					<div class="user-item" v-for="(item, index) in messageUserList" :key="index" :class="{active:activeUserId == item.Id}" @click="activeChat(item.Id)">
						<div class="heade-img">{{ item.NickName }}</div>
						<div class="info-ctn">
							<div class="info-top-ctn">
								<span>{{ item.SeatNumber }}</span>
								<span>{{ item.created_time }}</span>
							</div>
							<p class="info-bottom-ctm">{{ item.content }}</p>
						</div>
						<div class="message-count" v-if="newMsgCount[item.Id]&&(newMsgCount[item.Id] > 0)">
							{{newMsgCount[item.Id]}}
						</div>
					</div>

				</div>

				<div class="main-ctn">
					<div ref="messageCtn" class="message-ctn">
						<van-pull-refresh v-model="refreshing" @refresh="loadReadData">
							<!--<van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadUnreadData()" :offset="100" :immediate-check="false" ref="mylist">-->
							<div class="inner-ctn">
								<div class="message-item" v-for="(item, index) in messageList" :key="index" :class="{
										left:item.sendType == 1,
										right:item.sendType != 1
									}">
									<div v-if="item.sendType == 1">
										<div class="heade-img">
											{{ item.fromNickName}}
										</div>
										<div class="info-ctn">
											<div class="info-top-ctn">
												<span>{{ item.seatNumber}}</span>
												<span>{{ item.created_time|dateFormate('hh:mm:ss') }}</span>
											</div>
											<p class="info-bottom-ctm">{{ item.content }}</p>
										</div>
									</div>
									<div v-if="item.sendType == 2">
										<div class="heade-img">
											我
										</div>
										<div class="info-ctn">
											<div class="info-top-ctn">
												<span>{{ item.created_time|dateFormate('hh:mm:ss') }}</span>
												<span></span>

											</div>
											<p class="info-bottom-ctm">{{ item.content }}</p>
										</div>
									</div>
								</div>
							</div>
							<!--</van-list>-->
						</van-pull-refresh>

					</div>

					<div class="oper-ctn">
						<div class="input-ctn">
							<textarea type="text" v-model="inputMessage"></textarea>
						</div>
						<div class="submit-ctn" @click="sendMessage()">发送</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	import CabinLayoutService from '../../service/crew/cabin-layout';
	import FlightSeatMatrix from './model/flight-seat-matrix';
	import ArrayUtils from '../../utils/array-utils';
	import { localStore } from '../../utils/data-management';

	@Component({
		name: 'CrewChat',
		components: {}
	})
	export default class CrewChat extends Vue {
		@Prop()
		curUserId: string;

		private activeUserId: string = '';

		private userList: Array < any > = [];

		private messageList: Array < any > = [];

		private layoutList: Array < any > = [];

		private active: string = 'firstClass';

		private inputMessage: string = '';
		private socket: any = null;

		private messageArr = [];

		private newMsgCount = {

		};

		private messageUserList: Array < any > = [];

		private beforeTime: number = new Date().getTime();
		private pageSize: number = 10;
		private pageNumber: number = 1;

		private refreshing: boolean = false;
		private loading: boolean = false;
		private finished: boolean = false;

		async mounted() {

			this.getSeatMessageInfo();
			//拉取已读消息
			//await this.getReadedAirBusMessage(this.activeUserId);
			this.activeChat(this.curUserId);
			this.startWebScoket();
			this.handleUserList();
			//拉取未读消息
			/*1.从本地缓存获取所有的聊天记录的用户id
			userIdArr:[
		
			]
			2.获取有新消息的用户。
			3.如果不前10则将他排到前面来*/
		}

		private loadUnreadData(): void {

			localStorage.getItem('lang') == 'en'
			//messageUserIdArr
		}

		private handleUserList(): void {
			let messageUserList = localStore.get('messageUserList') || [];
			let beforeIndex = 10;

			CabinLayoutService.getSeatMessageInfo().then((resData: any) => {
				if(resData.code == '200') {
					//当前激活用户是否在列表里面
					//let activeInListUser = false;
					resData.data.reverse().forEach((item, index) => {
						//放在最前面
						let indexInArray = messageUserList.indexOf(item.UserId);
						if(indexInArray > -1) {
							messageUserList.splice(indexInArray, 1);
							messageUserList.unshift(item.UserId);
						} else {
							messageUserList.unshift(item.UserId);
						}

					});

					//将当前用户放置在最前面
					let activeUserIndex = messageUserList.indexOf(this.activeUserId);

					if(activeUserIndex > -1) {
						messageUserList.splice(activeUserIndex, 1);
						messageUserList.unshift(this.activeUserId);
					} else {
						messageUserList.unshift(this.activeUserId);
					}
					CabinLayoutService.getUserMessageByUserIdArr({
						messageUserList: messageUserList
					}).then((resData: any) => {
						if(resData.code == 200) {
							this.messageUserList = resData.data;
							this.messageUserList.forEach((item, index) => {
								this.newMsgCount[item.Id] = item.count.length || 0;
							});
						}

					});

					localStore.set('messageUserList', messageUserList);

				}
			});

		}

		private loadReadData(): void {
			this.refreshing = true;
			this.pageNumber = this.pageNumber + 1;
			this.pageSize = 10;
			this.getReadedAirBusMessage();
		}

		async activeChat(userId) {
			this.activeUserId = userId;
			this.pageSize = 10;
			this.pageNumber = 1;
			this.messageList = [];
			this.getReadedAirBusMessage(true);
		}

		//拉取已读消息需要分页
		getReadedAirBusMessage(needRead: boolean = false) {
			CabinLayoutService.getAirBusMessage({
				userId: this.activeUserId,
				beforeTime: this.beforeTime,
				take: this.pageSize,
				skip: (this.pageNumber - 1) * this.pageSize
			}).then((resData: any) => {
				if(resData.code == '200') {
					if(needRead) {
						this.readAirBusMessage(this.activeUserId);
					}

					resData.data = resData.data.reverse();
					this.messageList = this.messageList.concat(resData.data);
					this.scrollToBottom();
					this.loading = false;
					this.refreshing = false;
				} else {
					this.$toast('获取列表失败!');
					this.loading = false;
					this.refreshing = false;
				}
			});
		}

		private beforeDestroy() {
			this.socket && this.socket.close();
		}

		private sendMessage() {
			CabinLayoutService.sendToUser({
				to: this.activeUserId,
				content: this.inputMessage,
			}).then((resData: any) => {
				if(resData.code == '200') {
					this.inputMessage = '';
					this.messageList.push(resData.data);
					this.scrollToBottom();
				}
			});
		}

		private startWebScoket() {
			this.socket = (window as any).io('http://localhost:2120/');

			// uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
			let uid = '4CFC4D33-2C1E-E911-BAD5-F44D307124C0';

			// socket连接后以uid登录
			this.socket.on('connect', () => {
				this.socket.emit('login', uid);
			});

			// 后端推送来消息时
			this.socket.on('new_msg', (msg) => {
				console.log('收到消息：chat');
				let midMsg = msg.replace(/&quot;/g, '"');
				let newMessageObj = JSON.parse(midMsg);
               
				//肥系统消息
				if(newMessageObj.type == 'message') {
					if(newMessageObj.from_user_id == this.activeUserId) {
						this.messageList.push(newMessageObj);
						this.scrollToBottom();
						this.readAirBusMessage(newMessageObj.from_user_id);
						//调用消息已读取接口
					} else {
						this.newMsgCount[newMessageObj.from_user_id] = (this.newMsgCount[newMessageObj.from_user_id] || 0) + 1;
						this.$forceUpdate();
					}
				}

			});

			// 后端推送来在线数据时
			this.socket.on('saveNoticeList', function(online_stat) {
				console.log('saveNoticeList：');
				console.log(online_stat);
			});

			this.socket.on('saveChatList', function(online_stat) {
				console.log('saveChatList：');
				console.log(online_stat);
			});
		}

		private scrollToBottom() {
			this.$nextTick(() => {
				(this.$refs.messageCtn as any).scrollTop = (this.$refs.messageCtn as any).scrollHeight;
			});

		}

		readAirBusMessage(userId) {
			CabinLayoutService.readAirBusMessage({
				userId: userId
			}).then((resData: any) => {
				if(resData.code == '200') {
					this.newMsgCount[userId] = 0;
					this.$toast('消息读取成功!');
				}
			});
		}

		//获取未读消息与座位的映射关系
		public getSeatMessageInfo(): void {

			CabinLayoutService.getSeatMessageInfo().then((resData: any) => {
				let seatMessageMap: any = {};

				if(resData.code == '200') {
					this.userList = resData.data;
				}
			});
		}

		private stepToLayout(): void {
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
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 1200;
		box-sizing: border-box;
		margin-bottom: 1.2rem;
		background: #002566;
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
					height: 100%;
					width: rem(520px);
					overflow: auto;
					background: red;
					box-sizing: border-box;
					background: linear-gradient(180deg, rgba(0, 38, 106, 1) 0%, rgba(0, 66, 133, 1) 100%);
					.user-item {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: rem(2px) solid rgba(255, 255, 255, 0.08);
						height: rem(176px);
						padding: 0 rem(30px);
						&.active {
							background: #0242a2;
						}
						.message-count {
							display: inline-block;
							position: absolute;
							top: 0.2rem;
							left: 0.3rem;
							width: 0.4rem;
							height: 0.4rem;
							text-align: center;
							line-height: 0.4rem;
							font-size: 0.26rem;
							font-weight: 400;
							color: white;
							background: #fe5000;
							border-radius: 50%;
						}
						.heade-img {
							border-radius: 50%;
							width: rem(96px);
							height: rem(96px);
							line-height: rem(96px);
							white-space: nowrap;
							text-align: center;
							overflow: hidden;
							text-overflow: ellipsis;
							color: #ffffff;
							;
							background: #83abd9;
						}
						.info-ctn {
							width: rem(340px);
							.info-top-ctn {
								display: flex;
								justify-content: space-between;
								margin-bottom: rem(10px);
								>span {
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
						position: absolute;
						left: 0;
						right: 0;
						width: 100%;
						height: 100%;
						background: green;
						/*padding:rem(80px);*/
						padding: rem(80px);
						box-sizing: border-box;
						overflow: auto;
						background: rgba(0, 44, 111, 1);
						.inner-ctn {
							position: relative;
						}
						.message-item {
							clear: both;
							&.left {
								float: left;
							}
							&.right {
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
							border:rem(4px) solid rgba(175, 213, 253, 1);
							/* width:467px;
							height:124px;
							border-radius:61px;
							border:4px solid rgba(175,213,253,1); */
							.heade-img {
								position: absolute;
								top: rem(10px);
								left: rem(10px);
								border-radius: 50%;
								width: rem(96px);
								height: rem(96px);
								line-height: rem(96px);
								white-space: nowrap;
								text-align: center;
								overflow: hidden;
								color: #ffffff;
								text-overflow: ellipsis;
								background: #83abd9;
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
									>span {
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
						background: rgba(0, 44, 111, 1);
						.input-ctn {
							width: rem(1400px);
							height: rem(68px);
							background: rgba(49, 102, 171, 0.3);
							border-radius: rem(34px);
							overflow-y: auto;
							overflow-x: hidden;
							>textarea {
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