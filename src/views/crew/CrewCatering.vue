<template>
	<section class="crew-catering">
		 <section class="top-ctn">
			  <crew-select :selectList= "selectList" :selectValue = "status"  @select="statusChange"></crew-select>
			  <crew-search @search="search($event)"></crew-search>
		 </section>
		 
		 <section class="item-ctn">
			 <div class="item-ctt">
				 <van-pull-refresh v-model="refreshing" @refresh="refreshList">
				 	 <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadList" :offset="100" :immediate-check="false" ref="mylist">
				 		<div class="catering-item-ctn">
				 			<crew-catering-item v-for="(item,index) in dataList" :key="index" :data="item" @finish="finishDish($event,index)"></crew-catering-item>
				 		</div>
				 		
				 	 </van-list>
				 </van-pull-refresh>
			 </div>
		 </section>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CrewSelect from './components/CrewSelect.vue';
import CrewSearch from './components/CrewSearch.vue';
import CrewCateringItem from './components/CrewCateringItem.vue';
import CateringService from '../../service/crew/catering';
import UrlUtils from '../../utils/url-utils';


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
	
	private pageSize: number = 12;
	private pageNumber: number = 1;
	
	private refreshing: boolean = false;
	private loading: boolean = false;
	private finished: boolean = false;
	
	private status:string = '0';
	private seat:string = '';
	
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
	}
	
	
	private search($event):void{
		this.seat = $event;
		this.resetList();
	}
	
	private statusChange($event):void{
		this.status = $event.value;
		this.resetList();
	}
	
	private loadList(): void {
		this.pageNumber = this.pageNumber + 1;
		this.pageSize = 12;
		this.getList();
	}
	
	private refreshList(): void {
		this.refreshing = true;
		this.resetList();
	}
	
	resetList() {
		this.pageNumber = 1;
		this.pageSize = 12;
		this.dataList = [];
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
				//无数据
				if(resData.data.count == 0){
				  this.finished = true;
				}else if(this.pageNumber * this.pageSize > resData.data.count){//最后一页
				  this.finished = true;
				}else{//非最后一页
				  this.finished = false;
				}
				
				resData.data.data.forEach((item,index)=>{
					item.BannerImgPath = UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(item.BannerImgPath));
				});
						
				this.dataList = this.dataList.concat(resData.data.data); 
				this.loading = false;
				this.refreshing = false;
				
			} else {
				this.$toast('获取列表失败!');
				this.loading = false;
				this.refreshing = false;
			}
		});
	}
	
	private finishDish(item,index){
		CateringService.finishDishes({id:item.id}).then((resData:any)=>{
			if(resData.code == '200'){
				this.selectList[index].status = '2';
			}
		});
	}
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
    @function rem($px){
	    @return $px / 100px * 1rem; 
	} 


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
		z-index: 200;
	}
	
	.item-ctn{
		z-index: 100;
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
