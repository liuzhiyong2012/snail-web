<template>
	<section class="music-main-ctn">
		<abus-title title="Favourites"></abus-title>
		
		<music-tab :active="activePage" :tabList="tabList" @switch="switchPage($event)" class="music-tab-ctn"></music-tab>
		
		<section class="content-ctn">
			<div class="title-top">
				<div class="title-left">
					<span>Total song:</span>
					<span>23</span>
				</div>
				
				<div class="title-right">
					<i class="icon icon-play"></i>
					<span class="play-btn">Play all</span>
				</div>
			</div>
			
			
			
			<div class="collect-list-ctn"> 
				<div v-for="(item,index) in songList" :key="index" class="mysong-item">
					
					<div class="song-info">
						<div>{{item.Name}}</div>
						<div>{{computeAuthorName(item)}}</div>
					</div>
					
					<div class="oper-ctn">
						<i class="icon icon-play-disable"></i>
						<i class="icon icon-delete"></i>
					</div>
				</div>
			</div>
		</section>
		<music-player class="music-playe-ctn"></music-player>
	</section>
</template>

<script lang="ts">
	import {Vue,Prop,Component} from 'vue-property-decorator';
	import AbusTitle from '../../components/AbusTitle.vue';
	import MusicService from '../../service/music.ts';
	import MusicTab from './components/MusicTab.vue';
	import MusicPlayer from './components/MusicPlayer';
	@Component({
		name:'MusicFavourites',
		components:{
			AbusTitle,
			MusicTab,
			MusicPlayer
		}
	})
	export default class MusicFavourites extends Vue {
		 private recomendList:Array<any> = [];
		 private activePage = "song";
		 
		 private tabList:string[] = [{
			 name:'Song',
			 value:'song'
		 },
		 {
			 name:'Album',
			 value:'album'
		 }];
		 
		 private songList:any[] = [
			 // {
				//  Album: {}
				//  Alias: null
				//  Artists: []
				//  Duration: 281966
				//  Id: "1848e944-1d21-e911-bd22-c4209d3e3b89"
				//  Name: "注定"
				//  PlayCount: 16670
				//  SubCount: 1
			 // }
		 ];
		 private albumList:any[] = [];
		 
		 
		 private mounted(){ 
			this.getMySongList();
			this.getMyAlbumList();
		 }
		 
		 public computeAuthorName(item):void{
		 	 let anthorList = [];
			 
			 item.Artists.forEach((artistItem,index)=>{
				 anthorList.push(artistItem.Name);
			 });
			 
			 return anthorList.join(',');
		 }
		 
		 public switchPage($event):void{
			 this.activePage = $event.value;
		 }
		 
		 public getMySongList($event):void{
			 MusicService.getMySongList().then((resData:any)=>{
				 if(resData.code== '200'){
					 this.songList = resData.data.Songs;
				 }else{
					 this.$toast('获取列表失败!');
				 }
			 });
		 }
		 
		 public getMyAlbumList($event):void{
		 			 MusicService.getMyAlbumList().then((resData:any)=>{
						 
						 // debugger;
						 /* CoverImgUrl: "http://172.16.125.11:8010/a7a4b9cf-9bab-41ce-85bb-ffdde841eb90"
						 Description: null
						 Id: null
						 Name: "music.mysubscribe"
						 PlayCount: 0
						 TotalDuration: 1013823
						 TrackCount: 4,
						 Tracks:*/
						 /* Album: {Name: "滚石香港黄金十年 光良品冠精选", Type: 0, TypeName: "EP",…}
						 Alias: null
						 Artists: [{Name: "无印良品", Alias: null,…}]
						 Duration: 281966
						 Id: "1848e944-1d21-e911-bd22-c4209d3e3b89"
						 Name: "注定"
						 PlayCount: 16670
						 SubCount: 1 */
						 
		 				 if(resData.code== '200'){
		 					 this.songList = resData.data.Songs;
		 				 }else{
		 					 this.$toast('获取列表失败!');
		 				 }
		 			 });
		 }
		 
		 
		 
		
	}
</script>


<style lang="scss" scoped>
	.music-main-ctn{
		.music-tab-ctn{
			margin-bottom: 0.20rem;
		}
		
		.content-ctn{
			padding:0.30rem 0.24rem;
			background: #ffffff;
			
			.title-top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 0.38rem;
				
				.title-left{
					font-size:0.22rem;
					font-family:Helvetica;
					color:rgba(153,153,153,1);
					
					span:nth-child(1){
						font-size:0.22rem;
						font-family:Helvetica;
						color:rgba(153,153,153,1);
						margin-right: 0.08rem;
						
					}
					span:nth-child(2){
						
					}
					
				}
				.title-right{
					display: flex;
					align-items: center;
					.icon{
						margin-right: 0.12rem;
						font-size: 0.36rem;
					}
					
					>span{
						font-size:0.26rem;
						font-family:PingFangSC-Semibold,PingFang SC;
						font-weight:600;
						color:rgba(0,32,91,1);
					}
				}
			}
			
			.collect-list-ctn{
				
				.mysong-item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 0.44rem;
					
					.song-info{
						div:nth-child(1){
							font-size:0.30rem;
							margin-bottom: 0.14rem;
							font-family:Helvetica;
							color:rgba(46,46,46,1);
						}
						div:nth-child(2){
							font-size:0.20rem;
							font-family:Helvetica;
							color:rgba(102,102,102,1);
							line-height:0.24rem;
						}
						
					}
					.oper-ctn{
						.icon{
							font-size: 0.36rem;
							&:nth-child(1){
								margin-right: 0.20rem;
							}
							&:nth-child(2){
								
							}
							
						}
						
					}
				}
			}
		}
		
		.music-playe-ctn{
			position: fixed;
			bottom: 0;
		}
	}
</style>
