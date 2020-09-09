<template>
	<section class="music-main-ctn">
		<abus-title :title="$t('title')" backRouteName="home"  class="title-ctn"></abus-title>
		<section class="content-ctn">
			<div class="content-top-ctn">
				<van-swipe :autoplay="3000" class="music-recomend-ctn">
					<van-swipe-item class="music-recomend-item" v-for="(item, index) in recomendList" :key="index">
						<div class="music-recomend-img" :style="{ backgroundImage: `url(${item.ImgPath})` }"></div>
					</van-swipe-item>
				</van-swipe>
				
				<div class="function-ctn">
					<div class="function-item favourites" @click="stepTo('favourites')">
						<div class="function-icon-ctn ">
							<svg class="icon" aria-hidder="true">
								<use xlink:href="#icon-music-favourites"></use>
							</svg>
						</div>
						<div class="function-name">
							{{$t('favourites')}}
						</div>
					</div>
					<div class="function-item airfm" @click="getFmList()">
						<div class="function-icon-ctn">
							<svg class="icon" aria-hidder="true">
								<use xlink:href="#icon-air-fm"></use>
							</svg>
						</div>
						<div  class="function-name">
							{{$t('airFm')}}
						</div>
					</div>
					
					<div class="function-item topranks" @click="stepTo('topranks')">
						<div class="function-icon-ctn">
							<svg class="icon" aria-hidder="true">
								<use xlink:href="#icon-music-topranks"></use>
							</svg>
						</div>
						<div  class="function-name">
							{{$t('topRanks')}}
						</div>
					</div>
				</div>
			</div>
			
			<div class="album-ctn">
				  <div class="album-title">
					  {{$t('popAlbum')}}
				  </div>
				  <div class="album-list-ctn">
					  <van-list v-model="loading" class="album-item-ctn" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100" :immediate-check="false" ref="mylist">
							<div class="album-item-ctn">
								<div class="album-item" v-for="(item,index) in playList" :key="index" @click="stepToPage(item)">
									  <div class="album-image" :style="{backgroundImage:`url(${item.CoverImgUrl})`}">
									  </div>
									  <p class="album-label">
										  {{item.Name}}
									  </p>
								</div>
								
								<div class="album-item" style = "visibility: hidden;" v-if="playList&&(playList.length % 3==2)">  
								</div>
								
							</div>
							
					  </van-list>
				  </div>
			</div>
		</section>
	</section>
</template>

<i18n>
	{
		"zh":{
			"title":"音乐",
			"favourites":"我的收藏",
			"airFm":"机上FM",
			"topRanks":"排名置顶",
			"popAlbum":"流行专辑"
		},
		"en":{
			"title":"Music",
			"favourites":"Favourites",
			"airFm":"Air Fm",
			"topRanks":"Top ranks",
			"popAlbum":"Pop Album"
		}
	}
</i18n>

<script lang="ts">
	import UrlUtils from '../../utils/url-utils';
	import {Vue,Prop,Component} from 'vue-property-decorator';
	import AbusTitle from '../../components/AbusTitle.vue';
	import MusicService from '../../service/music';
	import MusicPlayer from './components/MusicPlayer.vue';
	
	@Component({
		name:'MusicIndex',
		components:{
			AbusTitle,
			MusicPlayer
		}
	})
	export default class MusicIndex extends Vue {
		 private recomendList:Array<any> = [];
		 private playList:any[] = [];
		 private airFmList:any[] = [];
		 
		 private loading: boolean = false;
		 private finished: boolean = false;
		 
		 
		 private pageSize: number = 10;
		 private pageNumber: number = 1;
		 private refreshing:boolean = false;
		 
		 private mounted(){
			 this.getMusicBanners();
			 this.getPlayList();
			if (localStorage.getItem("lang") == "en") {
			this.$i18n.locale = "en";
			} else {
			this.$i18n.locale = "zh";
			}
		 }
		 
		 private getMusicBanners(){
			 MusicService.getMusicBanners({}).then((res:any)=>{
				 if(res.code == '200'){
					 this.recomendList = res.data.Banners;  
				 }
			 });
		 }
		 
		 private stepTo(pageType){
			 let map = {
				 favourites:'musicFavourites',
				 airFm:'musicAirFm',
				 topranks:'musicTopRanks'
			 };
			 
			 if(map[pageType]){
				 this.$router.push({
					 name:map[pageType]
				 });
			 }
		 }
		 
		 private getPlayList(){
			 MusicService.getMusicPlaylistHot({
				 take: this.pageSize,
				 skip: (this.pageNumber - 1) * this.pageSize
			 }).then((resData: any) => {
			 	if (resData.code == '200') {
			 		if (resData.data.EOF) {
			 			this.finished = true;
			 		}
					
			 		this.playList = this.playList.concat(resData.data.Playlists);
			 	} else {
			 		this.$toast('获取列表失败!');
			 	}
			 	this.loading = false;
			 	this.refreshing = false;
			 }).catch((e?: any) => {
			 	this.loading = false;
			 	this.refreshing = false;
			 });
		 }
		 
		 
		 private stepToPage(item:any):void{
			 this.$router.push({
				 name:'musicPlaylistDetail',
				 query:{
					 id:item.Id
				 }
			 });
		 }
		 
		 private getFmList(){
			 MusicService.getMusicFM({}).then((res)=>{
			 		if(res.code == '200'){
						 let songs = [];
						this.airFmList = res.data.Songs;
						
						this.airFmList.forEach((item,index)=>{
							 songs.push({
								 album: 'album',
								 duration: item.Duration/1000,
								 id: item.Id,
								 image: '',
								 mid: '',
								 name:  item.Name,
								 singer: this.computeAuthorName(item),
								 url: 'http://172.16.125.11:8010/' + item.Id,
							 });
						});
						
						this.$store.dispatch('selectPlay',{
								list: songs,
								index: 1
						 });
					}
			 }); 
			 
		 }
		 
		 public computeAuthorName(item):string{
		 	 let anthorList = [];
		 			 
			 item.Artists.forEach((artistItem,index)=>{
				 anthorList.push(artistItem.Name);
			 });
			 
			 return anthorList.join(',');
		 }
		 
		 private onLoad(): void {
		 	this.pageNumber = this.pageNumber + 1;
		 	this.pageSize = 10;
		 	this.getPlayList();
		 }
	}
</script>

<style lang="scss" scoped>
	.music-main-ctn{
		.title-ctn{
			position: fixed;
			z-index: 100;
			top:0;
			left: 0;
			width: 100%;
		}
		
		.content-ctn{
			padding-top:1.00rem;
			.content-top-ctn{
				padding:0.40rem 0.30rem 0.34rem;
				background:#ffffff;
				
				.music-recomend-ctn{
					border-radius:8px;
					margin-bottom: 0.40rem;
					.music-recomend-item {
						position: relative;
						width: 100%;
						height: 3.24rem;
						.music-recomend-img {
							width: 100%;
							height: 100%;
							background-position: center center;
							background-repeat: no-repeat;
							background-size: cover;
						}
					}
				}
				
				/* .function-ctn{
					.function-item{
						&.favourites{
							
						}
						&.airfm{
							
						}
						&.topranks{
							
						}
						
						.function-icon-ctn {
							svg.icon{
								
							}
						}
						.function-name{
							
						}
					}
				} */
				
				.function-ctn{
					display: flex;
					justify-content: space-around;
					.function-item{
						&.favourites{
							
						}
						&.airfm{
							
						}
						&.topranks{
							
						}
						
						.function-icon-ctn{
							display: block;
							margin:auto;
							width: 0.82rem;
							height: 0.82rem;
							margin-bottom: 0.14rem;
							text-align: center;
							svg.icon{
								width: 100%;
								height: 100%;
								
							}
						}
						.function-name{
							font-size:0.24rem;
							font-family:Helvetica;
							color:rgba(46,46,46,1);
							line-height:0.30rem;
						}
					}
				}
				
				
			}
			
			.album-ctn{
				padding:0.50rem 0.30rem;
				background:#ffffff;
				
				.album-title{
					font-size:0.36rem;
					font-family:Helvetica-Bold,Helvetica;
					font-weight:bold;
					color:rgba(51,51,51,1);
					line-height:0.42rem;
					margin-bottom: 0.30rem;
				}
				
				.album-list-ctn{
					padding-bottom: 1.80rem;
					
					.album-item-ctn{
						
						.album-item-ctn{
							display: flex;
							justify-content: space-between;
							align-items: center;
							flex-wrap: wrap;
							.album-item{
								width:2.00rem;
								.album-image{
									box-sizing: border-box;
									border:10px solid #e8cebb;
									border-radius:0.08rem;
									overflow: hidden;
									width:100%;
									height: 2.00rem;
									margin-bottom: 0.16rem;
									background-position:center;
									background-repeat:no-repeat;
									background-size: contain;
								}
								.album-label{
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
									font-size:0.24rem;
									font-weight:bold;
									color:rgba(46,46,46,1);
									line-height:0.30rem;
									padding-bottom: 0.14rem;
								}
							}
						}
						
					}
					
					
				}
			}
			
			
		}
		
		.music-player-ctn{
			position:fixed;
			bottom: 0;
			
		}
	}
</style>
