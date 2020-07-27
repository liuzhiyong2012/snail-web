<template>
	<section class="dish-main-ctn">
		<abus-title title="Dish"></abus-title>
		<van-swipe :autoplay="3000">
		  <van-swipe-item class="dish-recomend-item" v-for="(item, index) in recomendList" :key="index">
			  <div class="dish-recomend-img" :style="{backgroundImage:`url(${item.BannerImgPath})`}">
				  
			  </div>
		  </van-swipe-item>
		</van-swipe>
		
		<section class="dishes-list">
			<div v-for="(item,index) in dishesList" class="dishes-item" :key="index">
				<div class="img-ctn" :style="{backgroundImage:`url(${item.BannerImgPath})`}">
				</div>
				<div class="dish-info">
					<div class="price-ctn" :class="{'is-discount':false }">
						<span>${{item.Price}}</span>
						<!-- <span>32</span> -->
					</div>
					
					<div class="name-ctn">{{item.Name}}</div>
					<div class="bottom-ctn">
						<div class="qty-ctn">
							<span>QTY</span>
							<span>{{item.Stocking}}</span>
						</div>
						<div class="order-btn" @click="stepToDetail(item)">
							order
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- 点单列表 -->
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';  
import AbusTitle from '../../components/AbusTitle.vue';
import DishService from "../../service/dish";

@Component({
  name: 'DishIndex',
  components:{    
	  AbusTitle
  }  
})
export default class DishIndex extends Vue {  
  // @Prop() private msg!: string;
  private recomendList:Array<any> = [];
  private dishesList:Array<any> = [];
  
  private created() {
	  this.getDishesRecommendedList();
	  this.getDishesList();
	  //<!-- <img v-lazy="item.BannerImgPath" /> -->
  }
  
  private getDishesRecommendedList() {   
	  DishService.getDishesRecommendedList({}).then((res:any)=>{
		  
		  
		  if(res.code == 200){
		  		this.recomendList = res.data.RecommendedDishes;
		  		/* this.recomendList.forEach((item,index)=>{
		  			item.BannerImgPath = 'http://172.16.125.11:8010/50.jpg';
		  		}); */
		  }
		  
	  });
  }
  
  private getDishesList() {
	  DishService.getDishesList({}).then((res:any)=>{
		  
		  if(res.code == 200){
			  this.dishesList = res.data.Dishes;
			 /* this.dishesList.forEach((item,index)=>{
			  	  			  item.BannerImgPath = 'http://172.16.125.11:8010/50.jpg';
			  }); */
		  }
	  });
  }
  
  private stepToDetail(item:any){
	  // debugger;
	  this.$router.push({
		  name:'dishDetail',
		  // path:'/dish/detail',
		   query: {
		              id:item.Id
		            }
	  });
	  
  }
  
  
}

</script>

<style lang="scss" scoped>
	.dish-main-ctn{
		.dish-recomend-item{
			position: relative;
			width: 100%;
			height: 2.50rem;
		  .dish-recomend-img{
			  width: 100%;
			  height: 100%;
			  background-position:center center;
			  background-repeat:no-repeat;
			  background-size:cover;
		  }
		}
		
		.dishes-list{
			padding:0.30rem;
			&:after{
				content: '';
				clear: both;
				display: block;
				width: 100%;
				height: 0px;
			}
			overflow: hidden;
					 .dishes-item{
						 &:nth-child(2n - 1){
							 float: left;
						 }
						 &:nth-child(2n){
							 float: right;
						 }
						 
						 &:nth-child(1){
						 	margin-top:0;
						 }
						 &:nth-child(2){
						 	margin-top:0;
						 }
						 
						 
						 position: relative;
						 margin-top:0.30rem;
						 width: 3.32rem;
						 height: 5.30rem;
						 background:rgba(255,255,255,1);
						 border-radius:0.08rem;
						 
						 .img-ctn{
							 width: 100%;
							 height: 3.00rem;
							 background-repeat:no-repeat ;
							 background-position:center;
							 background-size: cover;
						 }
						 .dish-info{
							 padding:0.20rem;
							 .price-ctn{
								 font-size:0.36rem;
								 font-weight:bold;
								 color:rgba(0,31,91,1);
								 line-height:0.36rem;
								 margin-bottom: 0.20rem;
								 
								 &.is-discount{
									 >span{
										 &:nth-child(1){
											 color:#e4002b;
											 margin-right: 0.16rem;
											 
										 }
										 &:nth-child(2){
											color:rgba(51,51,51,1);
											line-height:0.28rem;
											font-size:0.24rem;
											text-decoration: line-through;
										 }
									 }
								 }
								 
								 >span{
									 &:nth-child(1){
										 
									 }
									 &:nth-child(2){
									 										 
									 }
								 }
								 
							 }
							 .name-ctn{
								 height: 0.70rem;
								 font-size:0.28rem;
								 font-family:Helvetica;
								 color:rgba(0,0,0,1);
								 line-height:0.34rem;
								 margin-bottom: 0.14rem;
							 }
							 .bottom-ctn{
								 display: flex;
								 justify-content: space-between;
								 align-items: center;
								 .qty-ctn{
									 font-size:0.22rem;
									 color:rgba(0,0,0,1);
									 line-height:0.26rem;
									 >span:nth-child(1){
										 margin-right: 0.12rem;
									 }
									 
								 }
								 .order-btn{
									 line-height: 0.50rem;
									 text-align: center;
									 font-size: 0.26rem;
									 color:#ffffff;
									 width: 1.20rem;
									 height: 0.50rem;
									 background:rgba(0,31,91,1);
									 border-radius:0.25rem;
								 }
							 }
						 }
					 }
		}
	}
	
	
</style>
