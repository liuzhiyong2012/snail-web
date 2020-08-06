<template>
  <div class="abus-height">
    <div class="cell-group" v-if="videoList.length % 3 == 1">
      <div class="cell-item" v-for="(item, index) in videoList" :key="index">
        <div class="video-box" @click="stepToVideoPlay(item.Id)">
          <img :src="item.CoverImgPath" :alt="item.title" />
          <svg class="icon icon-p" aria-hidden="true">
            <use xlink:href="#icon-play-disable" />
          </svg>
        </div>
      </div>
      <div class="cell-item"></div>
      <div class="cell-item"></div>
    </div>
    <div class="cell-group" v-else-if="videoList.length % 3 == 2">
      <div class="cell-item" v-for="(item, index) in videoList" :key="index">123123</div>
      <div class="cell-item"></div>
    </div>
    <div class="cell-group" v-else>
      <div class="cell-item" v-for="(item, index) in videoList" :key="index">123123</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VideoService from "../../../service/video";
@Component({
  name: "VideoLists",
  components: {},
})
export default class VideoList extends Vue {
  private arrLength: number = 13;
  private videoList: Array<any> = [];
  private created() {
    this.getVideoList();
  }
  public getVideoList() {
    VideoService.getVideoList().then((res: any) => {
      console.log(res);
      if (res.code == 200) {
        this.videoList = res.data.Videos;
      }
    });
  }
  public stepToVideoPlay(index:any,id:any){
    
  }
}
</script>

<style lang="scss" scoped>
.cell-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .cell-item {
    width: 30%;
    .video-box {
      position: relative;
      display: flex;
      margin: 0.3rem 0 0;
      border-radius: 0.1rem;
      width: 100%;
      height: 4rem;
      background-color: #000;
      align-items: center;
      overflow: hidden;
      .icon-p {
        position: absolute;
        right: 0.2rem;
        bottom: 0.2rem;
        z-index: 98;
        opacity: 0.8;
      }
      img {
        width: 100%;
        border-radius: 0.1rem;
        z-index: 97;
      }
    }
  }
}
</style>