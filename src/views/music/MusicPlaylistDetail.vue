<template>
	<section class="music-main-ctn">
		<!-- <abus-title title="Music"></abus-title> -->
		<section class="cover-ctn">
			<div class="cover-title" @click="goBack()">
				<i class="icon icon-back"></i>
			</div> 
			
			<div class="cover-content">
				<div class="cover-image" :style="{backgroundImage:`url(${playListObj.CoverImgUrl})`}">
				</div>
				<div class="cover-info">
					<div class="cover-name">
						{{playListObj.Name}}
					</div>
					
					<div class="collect-ctn" v-if="!isCollected" @click="subscribePlaylist()">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-music-favourites"></use>
						</svg>
						<span class="collect-txt">收藏</span>
					</div>
					
					<div class="collect-ctn disable" v-if="isCollected" @click="unSubscribePlaylist()">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-music-favourites"></use>
						</svg>
						<span class="collect-txt">取消收藏</span>
					</div>
				</div>
			</div>
		</section>
		
		
		<section class="content-ctn">
			<div class="title-top">
				<div class="title-left">
					<span>Total song:</span>
					<span>23</span>
				</div>
				
				<div class="title-right" @click="playAll()">
					<i class="icon icon-play"></i>
					<span class="play-btn">Play all</span>
				</div>
			</div>
			
			
			
			<div class="collect-list-ctn"> 
				<div v-for="(item,index) in playListObj.Tracks" :key="index" class="mysong-item">
					<div class="number-ctn">
						{{index + 1}}
					</div>
					
					<div class="song-info">
						<div>{{item.Name}}</div>
						<div>{{computeAuthorName(item)}}</div>
					</div>
					
					<!-- <div class="oper-ctn"> -->
						<!-- <i class="icon icon-play-disable"></i> -->
						<!-- <i class="icon icon-delete"></i> -->
						<abus-music-icon class="music-status-icon-ctn"></abus-music-icon>
					<!-- </div> -->
				</div>
			</div>
		</section>
		
	</section>
</template>

<script lang="ts">
	import {Vue,Prop,Component} from 'vue-property-decorator';
	import AbusTitle from '../../components/AbusTitle.vue';
	import MusicService from '../../service/music.ts';
	import AbusMusicIcon from '../../components/AbusMusicIcon';
	
	@Component({
		name:'MusicPlaylistDetail',
		components:{
			AbusTitle,
			AbusMusicIcon
		}
	})
	export default class MusicPlaylistDetail extends Vue {
		 private recomendList:Array<any> = [];
		 private playListId:any|string = '';
		 
		 private playListObj:any = {
			 Tracks:[]
		 };
		 
		 private isCollected:boolean = false;
		 
		 private mounted(){
			this.playListId = this.$route.query.id;
			this.getPlaylistDetail();
		 }
		 
		 public getPlaylistDetail(){
			 MusicService.getPlaylistDetail({id:this.playListId}).then((res)=>{
				if(res.code == '200'){
					this.playListObj = res.data;
				}
			 }); 
		 }
		 
		 
		 public computeAuthorName(item):void{
		 	 let anthorList = [];
		 			 
			 item.Artists.forEach((artistItem,index)=>{
				 anthorList.push(artistItem.Name);
			 });
			 
			 return anthorList.join(',');
		 }
		 
		 private subscribePlaylist():void{
			 MusicService.subscribePlaylist({id:this.playListId}).then((res)=>{
				if(res.code == '200'){
					this.$toast('收藏成功!');
					this.isCollected = true;
				}
			 }); 
		 }
		 
		 private unSubscribePlaylist():void{
			 MusicService.unSubscribePlaylist({id:this.playListId}).then((res)=>{
				if(res.code == '200'){
					this.isCollected = false;
					this.$toast('取消收藏成功!');
				}
			 }); 
		 }
		 
		 private goBack(){
			 this.$router.push({
				 name:'musicIndex'
			 });
		 }
		 
		 private playAll(){
			 let songs = [];
			 
			 this.playListObj.Tracks.forEach((item,index)=>{
				 songs.push({
					 album: 'album',
					 duration: item.Duration,
					 id: item.Id,
					 image: this.playListObj.CoverImgUrl,
					 mid: '',
					 name:  item.Name,
					 singer: this.computeAuthorName(item),
					 url: 'http://172.16.125.11:8010/' + item.Id,
				 });
				 
				 // http://172.16.125.11:8010/5249340f-a222-e911-bd22-c4209d3e3b89
				/* Album: {Name: "I beg you / 花びらたちのマーチ / Sailing", Type: 0, TypeName: "EP",…}
				 Alias: null
				 Artists: [{Name: "Aimer", Alias: null,…}]
				 Duration: 266533
				 Id: ""
				 Name: "I beg you"
				 PlayCount: 13020
				 SubCount: 0, */
				 
			 });
			 
			 this.$store.dispatch('selectPlay',{
				list: songs,
				index: 1
				// vkey: that.vkey
			  });
			 // debugger;
			/* [
			 album: (...)
			 duration: 271
			 id: (...)
			 image: (...)
			 mid: (...)
			 name: (...)
			 singer: (...)
			 url: (...)
			 ] */
			 
			 // http://localhost:8888/#/music/index
			 
			/* this.selectPlay({
			         list: that.songs,
			         index: index
			         // vkey: that.vkey
			       }); */
		 }
		 
		
	}
</script>


<style lang="scss" scoped>
	.music-main-ctn{
		position: relative;
		background: grey;
		.cover-ctn{
			height: 4.80rem;
			padding:0 0.40rem;
			.cover-title{
				
				padding-top:0.40rem;
				
				margin-bottom: 0.44rem;
				.icon{
					color:#fcfaff;
					font-size: 0.40rem;
				}
			}
			.cover-content{
				display: flex;
				.cover-image{
					width:2.40rem;
					height: 2.40rem;
					background:rgba(216,216,216,1);
					border-radius:0.14rem;
					background-position: center;
					background-repeat: no-repeat;
					background-size: contain;
					margin-right: 0.26rem;
				}
				.cover-info{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					
					.cover-name{
						font-size:0.36rem;
						font-family:Helvetica-Bold,Helvetica;
						font-weight:bold;
						color:rgba(255,255,255,1);
						line-height:0.48rem;
					}
					.collect-ctn{
						display: flex;
						align-items: center;
						justify-content: center;
						
						width: 2.00rem;
						height: 0.70rem;
						background:rgba(228,0,43,1);
						border-radius:0.35rem;
						
						&.disable{
							background-color: grey;
						}
						
						
						.icon{
							width: 0.40rem;
							height: 0.40rem;
							margin-right: 0.10rem;
						}
						
						.collect-txt{
							font-size:0.26rem;
							font-family:Helvetica;
							color:rgba(255,255,255,1);
							line-height:0.30rem;
						}
					}
				}
			}
		}
		
		/* .content-ctn{
			height: 11.24rem;
		} */
		.content-ctn{
			// padding:0.30rem 0.24rem;
			// height: 11.24rem;
			position: fixed;
			top:4.80rem;
			width: 100%;
			bottom:0;
			background:rgba(255,255,255,1);
			
			border-radius:0.30rem 0.30rem 0 0;
			
			.title-top{
				    border-radius: 0.30rem 0.30rem 0 0;
					overflow: hidden;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:0 0.30rem 0 0.40rem;
				height:0.90rem;
				// margin-bottom: 0.38rem;
				border-bottom: 1px solid rgba(239,242,247,1);
				box-shadow:0px 1px 0px 0px rgba(239,242,247,1);
				
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
				position: absolute;
				top:0.90rem;
				bottom: 0;
				width: 100%;
				overflow-y: auto;
				padding-top:0.32rem;
				.mysong-item{
					position: relative;
					margin-bottom: 0.44rem;
					padding:0 0.72rem 0 0.94rem;
					
					.number-ctn{
						position: absolute;
						width: 0.94rem;
						height: 100%;
						text-align: center;
						left:0;
						line-height: 0.68rem;
						
						font-size:0.34rem;
						font-family:Helvetica-Bold,Helvetica;
						font-weight:bold;
						color:rgba(206,206,206,1);
						
					}
					
					
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
					.music-status-icon-ctn{
						position: absolute;
						width: 0.40rem;
						height: 0.40rem;
						top:0.20rem;
						right:0.40rem;
					}
				}
			}
		}
		
	}
</style>
