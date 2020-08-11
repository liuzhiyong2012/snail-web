<template>
	<section class="crew-catering">
		 <section class="top-ctn">
			  <crew-select :selectList= "selectList" @valueChange="statusChange"></crew-select>
			  <crew-search @search="search($event)"></crew-search>
		 </section>
		 
		 <section class="item-ctn">
			 <div class="item-ctt">
				 <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				 	 <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100" :immediate-check="false" ref="mylist">
				 		<div class="catering-item-ctn">
				 			<crew-catering-item v-for="(item,index) in dataList" :key="index" :data="item"></crew-catering-item>
				 		</div>
				 		
				 	 </van-list>
				 </van-pull-refresh>
			 </div>
		 </section>
	</section>
</template>

<!-- refreshing
loading
finished
onLoad
onRefresh -->

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CrewSelect from './components/CrewSelect.vue';
import CrewSearch from './components/CrewSearch.vue';
import CrewCateringItem from './components/CrewCateringItem.vue';
import CateringService from '../../service/crew/catering.ts';
import UrlUtils from '../../utils/url-utils';


//菜单管理
// BannerImgPath: "FB709FE0-0D34-E911-B13C-96AF276FDDB7"
// CreatedAt: "2020-07-31 09:59:05"
// Name: "三文鱼套餐"
// OrderId: "c535f07c04ffe4259b7b33b888ca046f"
// Price: "89.00"
// Quantity: 2
// Remark: null
// BannerImgPath: "47C591CA-0D34-E911-B13C-96AF276FDDB7"
// Seat: "2B"
// id: "43b9d4ef0bcc1ee5c4af613dc618b90c"
// status: 0

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
	
	private pageSize: number = 10;
	private pageNumber: number = 1;
	
	private refreshing: boolean = false;
	private loading: boolean = false;
	private finished: boolean = false;
	
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
		this.resetList();
		// this.getDishOrderList();
	}
	
	private getDishOrderList():void{
		
		CateringService.getDishOrderList({
			take:this.pageSize,
			skip:0,
			status:this.status,
			seat:this.seat,
		}).then((resData:any)=>{
			if(resData.code == '200'){
				resData.data.forEach((item,index)=>{
					item.BannerImgPath = UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(item.BannerImgPath));
				});

				this.dataList = resData.data;
			}
		});
	}
	
	private search($event):void{
		this.seat = $event;
		this.getList();
	}
	
	private statusChange($event):void{
		this.status = $event;
		this.getList();
	}
	
	private onLoad(): void {
		this.pageNumber = this.pageNumber + 1;
		this.pageSize = 10;
		this.getList();
	}
	
	private onRefresh(): void {
		this.refreshing = true;
		this.resetList();
	}
	
	resetList() {
		this.pageNumber = 1;
		this.pageSize = 10;
		this.resultList = [];
		this.getList();
	}
	
	
	
	getList():void{
		
		CateringService.getDishOrderList({
			take: this.pageSize,
			skip: (this.pageNumber - 1) * this.pageSize,
			status:this.status,
			seat:this.seat
		}).then((resData:any)=>{
			
			if (resData.code == '200') {
				
				resData.data.forEach((item,index)=>{
					item.BannerImgPath = UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(item.BannerImgPath));
				});
						
				// this.dataList = resData.data;
				
				this.dataList = this.dataList.concat(resData.data); 
				this.total = resData.data.count;
				
				this.loading = false;
				this.refreshing = false;
			} else {
				this.$toast('获取列表失败!');
				this.loading = false;
				this.refreshing = false;
			}
			
		});
		
		
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
		position: absolute;
		top:0;
		left: 0;
		width: 100%;
		display: flex;
		padding:rem(60px) rem(90px);
		box-sizing: border-box;
		justify-content: space-between;
	}
	
	.item-ctn{
		position: absolute;
		width: 100%;
		left: 0;
		padding:0 rem(90px);
		bottom: rem(40px);
		overflow: auto;
		top:rem(200px);
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		flex-wrap: wrap;
		
		.catering-item-ctn{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 100%;
		}
	}
}
</style>
