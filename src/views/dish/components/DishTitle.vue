<template>
	<section class="distitle-main-ctn">
		<div class="back-ctn" @click="back()">
			<i class="icon icon-back"></i>
		</div>
		<div class="title"> Place Order</div>
		<div class="card-ctn" @click="toCart()">
			<span v-show="cartLen > 0" class="cart-number">{{cartLen}}</span>
			<i class="icon icon-cart"></i>
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

<script lang = "ts">
	import {Vue,Component,Prop} from 'vue-property-decorator';
	
	@Component({
		name:'DishTitle',
		components:{
			
		}
	})
	export default class DishTitle extends Vue{
		private get cartLen():number{
			return this.$store.state.dish.cartList.length;
		}
	
		
		private back():void {
			this.$emit('back');
		}
		
		public toCart():void {
			this.$emit('toCart');
		}
	}
</script>

<style lang="scss" scoped>
	.distitle-main-ctn{  
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0.30rem 0.30rem;
		height: 0.40rem;
		background: #ffffff;
		
		.back-ctn{
			.icon{
				font-size: 0.32rem;
				color:#000000;
			}
		}
		
		.title{
			font-size:0.38rem;
			font-weight:bold;
			color:rgba(51,51,51,1);
			line-height:0.46rem;
		}
		
		.card-ctn{
			position: relative;
			.cart-number{
				position: absolute;
				right: 0;
				bottom: 0;
				width: 0.16rem;
				height: 0.16rem;
				line-height: 0.16rem;
				font-size: 0.14rem;
				color:#ffffff;
				text-align: center;
				border-radius: 50%;
				background:#d40132;
				
			}
			
			.icon{
				font-size: 0.32rem;
				color:#011c57;
			}
		}
		
	}
</style>
