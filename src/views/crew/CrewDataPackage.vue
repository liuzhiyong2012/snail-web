<template>
	<section class="crew-catering">
		 <section class="top-ctn">
			  <crew-select :selectList= "selectList" @valueChange="statusChange"></crew-select>
			  <crew-search @search="search($event)"></crew-search>
		 </section>
		 <section class="item-ctn">
			 <crew-catering-item v-for="(item,index) in dataList" :key="index" :data="item"></crew-catering-item>
		 </section>
	</section>
</template>



<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CrewSelect from './components/CrewSelect.vue';
import CrewSearch from './components/CrewSearch.vue';
import CrewCateringItem from './components/CrewCateringItem.vue';
import CateringService from '../../service/crew/catering.ts';
import UrlUtils from '../../utils/url-utils';


//菜单管理
/* Route::get(':version/api/Dishes/Recommended', 'api/:version.app.Dishes/Recommended');//推荐菜品

Route::get(':version/api/Dishes/Statistics', 'api/:version.app.Dishes/Statistics');//统计

Route::get(':version/api/Dishes/List', 'api/:version.app.Dishes/index');//菜单列表

Route::get(':version/api/Dishes/MyOrders', 'api/:version.app.Dishes/MyOrders');//我的订单
Route::post(':version/api/Dishes/PlaceOrder', 'api/:version.app.Dishes/PlaceOrder');//下单
Route::get(':version/api/Dishes/UndoneOrders', 'api/:version.app.Dishes/UndoneOrders');//未完成订单
Route::get(':version/api/Dishes/DoneOrders', 'api/:version.app.Dishes/DoneOrders');//已完成订单
Route::put(':version/api/Dishes/OrdersStatus', 'api/:version.app.Dishes/OrdersStatus');//已完成订单
Route::resource(':version/api/Dishes', 'api/:version.app.Dishes'); */

@Component({
	name: 'CrewCatering',
	components: {
		CrewSelect,
		CrewSearch,
		CrewCateringItem
	}
})
export default class CrewCatering extends Vue {
	private dataList:Array<any> = [];
	
	private pageSize:number = 10;
	private pageNumber:Array<any> = 0;
	
	private status:string = 0;
	private seat:string = 0;
	
	private selectList:Array<any> = [
		{
			name:'未完成',
			value:'0'
		},{
			name:'已完成',
			value:'1'
		}
	];
	
	private mounted(){
		this.getDishOrderList();
	}
	
	private getDishOrderList():void{
		
		CateringService.getDishOrderList({
			take:this.pageSize,
			skip:0,
			status:this.status,
			seat:this.seat,
		}).then((resData:any)=>{
			if(resData.code == '200'){
				this.resData.data.forEach((item,index)=>{
					item.SampleImgPath = UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(item.SampleImgPath));
				});

				this.dataList = this.resData.data;
			}
		});
	}
	
	private search($event):void{
		this.seat = $event;
		this.getDishOrderList();
	}
	
	private statusChange($event):void{
		this.status = $event;
		this.getDishOrderList();
	}
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
    @function rem($px){//$px为需要转换的字号
	    @return $px / 100px * 1rem; //100px为根字体大小
	} 
// 订餐页面统计
// 流量服务
// 购物  //IFE端的

.crew-catering{
	
	padding: 0 rem(90px);
	
	.top-ctn{
		display: flex;
		padding:rem(60px) 0;
		justify-content: space-between;
	}
}
</style>
