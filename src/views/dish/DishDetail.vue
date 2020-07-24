<template>
	<section class="dishdetail-main-ctn">
		<div class="dish-title"><dish-title @back="backToIndex()" @toCart="toCart()"></dish-title></div>
		<div class="order-ctn">
			<div class="dish-img" :style="{backgroundImage:`url(${dishInfo.BannerImgPath})`}">
			</div>
			<div class="order-info">
				<h6 class="dish-name">{{dishInfo.Name}}</h6>
				<p class="dish-desc">
					{{dishInfo.Remark||'--'}}
				</p>

				<div class="order-item-ctn">
					<div class="qty-ctn">
						<span>QTY</span>
						<span>{{dishInfo.QTY||'--'}}</span>
					</div>

					<div class="order-number-ctn">
						<span class="price-ctn">{{dishInfo.Price}}</span>

						<van-field class="field-ctn" name="stepper" label="">
							<template #input>
								<van-stepper v-model="stepper" />
							</template>
						</van-field>
					</div>
				</div>
			</div>

			<div class="seat-ctn">
				<span>Seat No:</span>
				<span>{{seatNumber}}</span>
			</div>
		</div>

		<div class="footer-ctn">
			<div class="cart-btn primary" @click="addToCart()">Add To Cart</div>
			<div class="cart-btn normal" @click="buyNow()">Buy Now</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DishTitle from './components/DishTitle.vue';
import DishService from '../../service/dish';

@Component({
	name: 'DishDetail',
	components: {
		DishTitle
	}
})
export default class DishDetail extends Vue {
	private stepper: number = 1;
	private recomendList: Array<any> = [];
	private dishesList: Array<any> = [];

	private dishInfo: any = {};
	
	private get seatNumber():string{
		return this.$store.state.login.voyageInfo.seatNumber;
	}

	private mounted() {
		// let a = this.$route.params;
		this.dishInfo = {
				Name: '素食拼盘',
				SampleImgPath: 'http://172.16.125.11:8010/eb8ea336-9434-4295-8215-3821c76baba8',
				BannerImgPath: 'http://172.16.125.11:8010/50.jpg',
				Price: 32,
				orderNumberL:3,
				Remark: null,
				Status: 0,
				Stocking: 0,
				Id: 'e2dc9e2c-6733-e911-b13c-96af276fddb7'
			};
		
	}
	
	

	public backToIndex(): void {
		// this.$router.go(-1);
		this.$router.push({
			name: 'dishIndex'
		});
	}

	public toCart(): void {
		// this.$router.go(-1);
		// toCart
	}
	
	public addToCart():void{
		this.$store.commit('addCartItem',this.dishInfo);
		this.$router.push({
			name:'dishCart'
		});
	}
	
	public buyNow():void{
		this.$toast('购买成功!');
	}
	
}
</script>

<style lang="scss" scoped>
.dishdetail-main-ctn {
	position: relative;
	padding-top: 1rem;
	padding-bottom: 2rem;

	.dish-title {
		position: fixed;
		height: 1rem;
		width: 100%;
		top: 0;
		left: 0;
	}
	.order-ctn {
		.dish-img {
			height: 6.3rem;
			background-position: center;
			background-size:cover ;
			background-repeat: no-repeat;
			background-color:#7B98BC ;
		}

		.order-info {
			padding: 0.3rem 0.4rem;
			margin-bottom: 0.2rem;
			background: #ffffff;

			.dish-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 0.44rem;
				font-weight: bold;
				color: rgba(46, 46, 46, 1);
				line-height: 0.5rem;
				margin-bottom: 0.2rem;
			}
			.dish-desc {
				font-size: 0.28rem;
				color: rgba(34, 34, 34, 1);
				line-height: 0.28rem;
				margin-bottom: 0.4rem;
			}
			.order-item-ctn {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.qty-ctn {
					font-size: 0.28rem;
					color: rgba(51, 51, 51, 1);
					line-height: 0.28rem;

					> span {
						&:nth-child(1) {
							margin-right: 0.1rem;
						}
						&:nth-child(2) {
						}
					}
				}

				.order-number-ctn {
					display: flex;
					align-items: center;
					.price-ctn {
						font-size: 0.5rem;
						font-weight: bold;
						color: rgba(46, 46, 46, 1);
						margin-right: 0.4rem;
					}
					.field-ctn {
					}
				}
			}
		}

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
	}

	.footer-ctn {
		position: fixed;
		width: 100%;
		padding: 0 0.3rem;
		box-sizing: border-box;
		bottom: 0.62rem;
		display: flex;
		justify-content: space-between;

		.cart-btn {
			border-radius: 0.4rem;
			border: 0.02px solid rgba(0, 32, 91, 1);
			width: 3.3rem;
			height: 0.8rem;
			text-align: center;
			font-weight: bold;
			line-height: 0.76rem;
			box-sizing: border-box;

			font-size: 0.34rem;

			&.primary {
				color: rgba(0, 32, 91, 1);
				border-color: rgba(0, 32, 91, 1);
				background: #f8f6f9;
			}

			&.normal {
				color: #ffffff;
				border-color: #00205b;
				background: #00205b;
			}
		}
	}
}
</style>
