<template>
	<section class="dishcart-main-ctn">
		<div class="dishcart-title">
			<abus-title backRootName="dishIndex">
				<dish-cart-icon></dish-cart-icon>
			</abus-title>
		</div>

		<div class="cart-ctn">
			<van-swipe-cell class="cart-item-ctn" v-for="(item,index) in cartList"  :key="index">
				<template #right>
					<!-- v-for="(item,index) in index" -->
					<van-button square text="删除" type="danger" class="delete-button" />
				</template>
				
				<div class="cart-item">
					
					<div class="dish-img" :style="{backgroundImage:`url(${item.BannerImgPath})`}"></div>
					
					<div class="order-info">
						<p class="dish-name">{{item.Name}}</p>
						<div class="info-bottom-ctn">
							<span class="price-ctn">${{item.Price}}</span>
							<van-field class="field-ctn" name="stepper" label="">
								<template #input>
									<van-stepper v-model="item.orderNumber" />
								</template>
							</van-field>
						</div>
						
					</div>
				</div>
			</van-swipe-cell>
		</div>
		
		<div class="pay-info-ctn">
			<div class="seat-ctn">
				<span>Seat No:</span>
				<span>{{seatNumber}}</span>
			</div>
			
			<div class="pay-ctn">
				<div class="pay-label">
					Payment Method
				</div>
				
				<div class="pay-way" @click="selectPayType()">
					<svg class="icon i-icon" aria-hidden="true">
					    <use v-if="payType == '1'" xlink:href="#icon-wechat-pay" />
						<use v-if="payType == '2'" xlink:href="#icon-ali-pay" />
						<use v-if="payType == '3'" xlink:href="#icon-credit-card" />
						<use v-if="payType == '4'" xlink:href="#icon-cash" />
					</svg>
					
					<i class="icon icon-back"></i>
				</div>
			</div>
			<div class="total-money">
				<span>Total amount</span>
				<span>${{orderAmount}}</span>
			</div>
		</div>
		
		<div class="pay-outer-btn">
			<div class="pay-btn">
				Pay
			</div>
		</div>
		
		
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AbusTitle from '../../components/AbusTitle.vue';
import DishCartIcon from './components/DishCartIcon.vue';
import DishService from '../../service/dish';

			
@Component({
	name: 'DishCart',
	components: {
		AbusTitle,
		DishCartIcon
	}
})
export default class DishCart extends Vue {
	private get payType():number{
		return this.$store.state.me.payType;
	}
	
	private get seatNumber():number{
		return this.$store.state.login.voyageInfo.seatNumber;
	}
	
	private get cartList():number{
		return this.$store.state.dish.cartList;
	}
	
	private get orderAmount():number{
	   let cartList = this.$store.state.dish.cartList;
	   let amount = 0;
	   
	   cartList.forEach((item:any,index:any)=>{
		   amount = amount + item.Price * item.orderNumber;
	   });
	   
	   return amount;
	}
	
	private selectPayType(){
		this.$router.push({
			name:'payment'
		});
	}
	
}
</script>

<style lang="scss" scoped>
.dishcart-main-ctn {
	position: relative;
	padding-top: 1rem;
	padding-bottom: 2.2rem;

	.dishcart-title {
		position: fixed;
		height: 1rem;
		width: 100%;
		top: 0;
		left: 0;
	}
	
	
	.cart-ctn{
		margin-bottom: 0.20rem;
		
		.cart-item-ctn{
			height: 2.40rem;
			background:#ffffff;
			
			.cart-item{
				height: 100%;
				height: 2.40rem;
				background:#ffffff;
				box-sizing: border-box;
				padding:0.30rem;
				display: flex;
				
				
				.dish-img{
					width: 1.80rem;
					height: 1.80rem;
					background:grey;
					border-radius:6px;
					background-size:cover;
					background-repeat: no-repeat;
					background-position:center;
				}
				
				.order-info{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;
					padding-left: 0.30rem;
					.dish-name{
						font-size:0.36rem;
						font-family:Helvetica;
						color:rgba(51,51,51,1);
						line-height:0.42rem;
					}
					
					.info-bottom-ctn{
						display: flex;
						justify-content: space-between;
						
						.price-ctn{
							font-size:0.42rem;
							font-family:Helvetica-Bold,Helvetica;
							font-weight:bold;
							color:rgba(46,46,46,1);
							line-height:0.42rem;
						}
						
						.field-ctn{
							width: auto;
						}
					}
				}
			}
		}
	}
	
	.pay-info-ctn{
		.seat-ctn {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 0.3rem 0 0.36rem;
			height: 1rem;
			background: rgba(255, 255, 255, 1);
		
			> span {
				&:nth-child(1) {
					font-size: 0.32rem;
					color: rgba(51, 51, 51, 1);
				}
		
				&:nth-child(2) {
					font-size: 0.32rem;
					font-weight: bold;
					color: rgba(0, 32, 91, 1);
				}
			}
		}
		
		.pay-ctn{
			height: 1.00rem;
			display: flex;
			justify-content: space-between;
			padding:0 0.30rem 0 0.36rem;
			background:#ffffff;
			align-items: center;
			
			.pay-label{
				font-size:0.32rem;
				font-family:Helvetica;
				color:rgba(51,51,51,1);
				line-height:0.32rem;
			}
			
			.pay-way{
				display: flex;
				align-items: center;
				svg.icon{
					margin-right: 0.20rem;
				}
				.icon-back{
					font-size: 0.32rem;
					color: #e6e8ea;
					transform: rotate(180deg);
				}
			}
			
			
			
			
		}
		.total-money{
			padding-right: 0.30rem;
			display: flex;
			justify-content: flex-end;
			padding-top:0.40rem;
			padding-bottom:0.40rem;
			font-size:0.36rem;
			font-family:Helvetica-Bold,Helvetica;
			font-weight:bold;
			color:rgba(46,46,46,1);
			line-height:0.42rem;
			
			>span{
				&:nth-child(1){
					font-size:36px;
					font-weight:bold;
					color:rgba(51,51,51,1);
					margin-right: 0.40rem;
				}
				&:nth-child(2){
					font-weight:bold;
					color:rgba(51,51,51,1);
				}
			}
		}
		
	}
	.pay-outer-btn{
		position: fixed;
		bottom:1.00rem;
		width: 100%;
		
		.pay-btn{
			margin:0 0.30rem;
			height:0.80rem;
			text-align: center;
			line-height: 0.80rem;
			background:rgba(0,32,91,1);
			border-radius:0.50rem;
			
			font-size:0.34rem;
			font-family:Helvetica-Bold,Helvetica;
			font-weight:bold;
			color:rgba(255,255,255,1);
		}
	}
	
}
</style>
