<template>
	<section class="music-main-ctn">
		<abus-title title="Music"></abus-title>
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
							Favourites
						</div>
					</div>
					
					<div class="function-item airfm" @click="stepTo('airFm')">
						<div class="function-icon-ctn">
							<svg class="icon" aria-hidder="true">
								<use xlink:href="#icon-air-fm"></use>
							</svg>
						</div>
						<div  class="function-name">
							Air Fm
						</div>
					</div>
					
					<div class="function-item topranks" @click="stepTo('topranks')">
						<div class="function-icon-ctn">
							<svg class="icon" aria-hidder="true">
								<use xlink:href="#icon-music-topranks"></use>
							</svg>
						</div>
						<div  class="function-name">
							Top ranks
						</div>
					</div>
				</div>
			</div>
			
			<div class="album-ctn">
				  <div class="album-title">
					  Pop Album
				  </div>
				  <div class="album-list-ctn">
					  <div class="album-item" v-for="(item,index) in albumList" :key="index">
						  <div class="album-image" :style="{backgroundImage:`url(${item.CoverImgUrl})`}">
							  
						  </div>
						  <!-- 历史海流这一部分的查询还是有点问题 -->
						  <p class="album-label">
							  {{item.Name}}
						  </p>
					  </div>
				  </div>
			</div>
		</section>
		<music-player class="music-player-ctn"></music-player>
	</section>
</template>

<script lang="ts">
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
		 private albumList:any[] = [];
		 
		 private mounted(){
			 this.getMusicBanners();
			 this.getAlbumList();
		 }
		 
		 private getMusicBanners(){
			 MusicService.getMusicBanners({}).then((res:any)=>{
				 if(res.code == '200'){
					 this.recomendList = res.data.Banners;  
					 // debugger;
				 }
			 });
		 }
		 
		 private stepTo(pageType){
			 let map = {
				 favourites:'musicFavourites',
				 airFm:'musicAirFm',
				 topranks:'musicTopRanks'
			 }
			 
			 if(map[pageType]){
				 this.$router.push({
					 name:map[pageType]
				 });
			 }
		 }
		 
		 private  getAlbumList(){
			 MusicService.getMusicPlaylistHot({}).then((res:any)=>{
				 // debugger;
				 if(res.code == '200'){
					 this.albumList = res.data.Playlists;
				 }
				
			 });
			 
		 }
		 
		
	}
</script>


<style lang="scss" scoped>
	.music-main-ctn{
		.content-ctn{
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
		
		.music-player-ctn{
			position:fixed;
			bottom: 0;
			
		}
	}
</style>
