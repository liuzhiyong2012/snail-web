<template>
  <div class="abus-scroller-box music-box">
    <div v-for="(item,index) in musicList.slice(0,3)" class="music-list" :key="index">
      <div class="music-l">
        <img :src="item.Album.PicUrl" :alt="item.Name" />
      </div>
      <div class="f1">
        <div class="name">{{item.Name}}</div>
        <div class="author">{{item.Artists[0].Name}}</div>
      </div>
      <van-icon name="play-circle" color="rgb(229,232,228)" size="20" />
    </div>
  </div>
</template>

<script lang="ts">
import {Component,Prop,Vue} from 'vue-property-decorator'
import MusicService from '../../../service/music'

@Component({
  name: 'HomeMusic',
  components:{

  }
})
export default class HomeMusic extends Vue{
  private musicData: Array<any> = [];
  private musicList: Array<any> = [];
  private created() {
    this.getMusicPlaylistHot()
    this.musicData=[
        {
          img: require("../images/music.jpg"),
          name: "Let Me Down Slowly",
          author: "Alec Benjamin / Alessia Cara"
        },
        {
          img: require("../images/music.jpg"),
          name: "Let Me Down Slowly",
          author: "Alec Benjamin / Alessia Cara"
        },
        {
          img: require("../images/music.jpg"),
          name: "Let Me Down Slowly",
          author: "Alec Benjamin / Alessia Cara"
        }
      ]
  }
  public getMusicPlaylistHot(){
    MusicService.getMusicFM().then((res:any) => {
      console.log(res)
      console.log(res.data.Songs)
      if(res.code == 200) {
        this.musicList = res.data.Songs
        console.log(this.musicList[0].Album.PicUrl)
      }
//  Album:
      // Description: "<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" /><style type="text/css">img { height: auto; width: auto\9; width:100%; }</style></head><body><p>밴드 더 칵스 (KOXX) 의 멤버이자, DJ/Producer로도 활동 중인 천재 뮤지션 숀 (SHAUN), 그의 야심작 Take (Shaun EP) 가 마침내 탄생하였다! 총 4곡으로 구성된 이번 EP의 곡들은 각각 색다른 사운드 디자인과, 뚜렷한 가사내용이 담겨져 있으며 어디에서도 느낄 수 없는 숀 만의 감성으로만 제작되었다. 타이틀곡 &ldquo;생각나&rdquo; 는 최근 &ldquo;취한밤&rdquo;으로 인지도의 상승곡선을 그리는 중인 오반 (OVAN)과 강한 개성과 경쟁력 있는 보이스컬러를 소유한 수민 (SUMIN)의 피쳐링을 받아 그 화력을 더하였다. 어느 한 곡도 놓치기 어려운 이번 숀의 EP, Take 의 모든 곡과 숀의 메시지를 지금 바로 감상해보자!</p></body></html>"
      // Id: "930f609f-ac22-e911-bd22-c4209d3e3b89"
      // Name: "Take"
      // PicUrl: "http://172.16.125.11:8010/78a3dfb2-7b10-42b4-8a3b-e6d626e34c99"
      // PublishedOn: 0
      // Tags: "日韩"
      // Type: 0
      // TypeName: "EP"
      // __proto__: Object
// Alias: null
// Artists: [{…}]
// Duration: 214177
// Id: "7873f0d1-ac22-e911-bd22-c4209d3e3b89"
// Name: "Way Back Home"
// PlayCount: 29353
// SubCount: 1
    })
  }
};
</script>

<style lang="scss" scoped>
.music-box {
  background-color: #fff;
  padding: 0 0.28rem;
  margin: 0 0.28rem;
  background-color: #fff;
  border-radius: 0.1rem;
  :last-child {
    border-bottom: none;
  }
}
.music-list {
  display: flex;
  padding: 0.28rem 0;
  border-bottom: 0.02rem solid #efefef;
  align-items: center;
  .music-l {
    display: flex;
    width: 1rem;
    height: 1rem;
    overflow: hidden;
    border-radius: 0.12rem;
    background-color: #2d2d2d;
    align-items: center;
    img {
      width: 100%;
    }
  }

  .f1 {
    flex: 1;
    margin: 0 0 0 0.16rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    .name {
      flex: 1;
      font-size: 0.28rem;
      color: #666;
      line-height: 0.5rem;
      font-weight: 500;
    }
    .author {
      flex: 1;
      font-size: 0.24rem;
      color: #999;
      line-height: 0.5rem;
    }
  }
}
</style>