<template>
  <div class="container-box" id="video-box">
    <div class="van-swipe">
      <svg @click="stepToVideo" class="icon step-icon" aria-hidden="true">
        <use xlink:href="#icon-white_1" />
      </svg>
      <van-swipe @change="onChange" :show-indicators="false" vertical>
        <van-swipe-item v-for="(item, index) in videoListOne" class="product-swiper" :key="index">
          <div class="video-item">
            <!--video属性
                    webkit-playsinline ios 小窗播放，使视频不脱离文本流，安卓则无效
                    微信内置x5内核，
                    x5-video-player-type="h5-page" 启用H5播放器,是wechat安卓版特性，添加此属性，微信浏览器会自动将视频置为全屏
                    x5-video-player-fullscreen="true" 全屏设置，设置为 true 是防止横屏
                    x5-video-orientation 控制横竖屏 landscape 横屏，portrain竖屏； 默认portrain
                    poster：封面
                    src：播放地址
                    muted 静音播放
            -->
            <!-- <video
              class="video-box"
              loop
              webkit-playsinline="true"
              x5-video-player-type="h5-page"
              x5-video-player-fullscreen="true"
              playsinline
              preload="auto"
              :poster="item.cover"
              :src="item.url"
              :playOrPause="playOrPause"
              @click="pauseVideo"
              @ended="onPlayerEnded($event)"
            ></video>-->

            <svg
              @click="playVideo(index)"
              :class="[isPlay?'icon i-icon show': 'icon i-icon']"
              aria-hidden="true"
            >
              <use xlink:href="#icon-play-disable" />
            </svg>
            <video
              preload="auto"
              @click="playVideo(index)"
              :src="'http://172.16.125.11:8010/'+item.Id"
              :poster="item.CoverImgPath"
              class="video-box"
            ></video>
            <!-- 右侧栏 -->
            <div class="right-box">
              <svg @click="clickLike(index)" class="icon right-icon" aria-hidden="true">
                <use v-if="item.isLike" xlink:href="#icon-collect" />
                <use v-else xlink:href="#icon-collect-undo" />
              </svg>
              <div class="text">{{item.LikeCount}}</div>
              <svg @click="showComment(index)" class="icon right-icon1" aria-hidden="true">
                <use xlink:href="#icon-1-chat" />
              </svg>
              <div class="text">{{item.CommentCount}}</div>
            </div>
            <!-- 评论 -->
            <div :class="[item.isCommentShow?'comment-mask active':'comment-mask']">
              <svg @click="closePopup(index)" class="icon c-icon" aria-hidden="true">
                <use xlink:href="#icon-close" />
              </svg>
            </div>
            <!-- 下侧栏 -->
            <div class="bottom-box">
              <div :class="[isShowAd? 'ad active': 'ad']">
                <div class="img-box">
                  <!-- <img src alt /> -->
                </div>
                <div class="r-box">
                  <div class="r-name">广告广告广告广告广告</div>
                  <div class="r-price">$23</div>
                </div>
                <svg @click="closeAd" class="icon close-icon" aria-hidden="true">
                  <use xlink:href="#icon-close" />
                </svg>
              </div>
              <div class="name">{{item.title}}</div>
              <!-- <div class="tap">
                <div>#daasda</div>
                <div>#daasda</div>
                <div>#daasda</div>
              </div>-->
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VideoService from "../../service/video";

@Component({
  name: "VideoPlay",
  components: {},
})
export default class VideoPlay extends Vue {
  private videoListOne: Array<any> = [];
  private videoListTwo: Array<any> = [];
  private isGetVideo: boolean = true;
  private isPlay: boolean = false;
  private isShowAd: boolean = false;
  private isCommentShow: boolean = false;
  private adShowTime: any = "";
  private current: any = 0;
  private mounted() {
    this.postVideoList();
    clearTimeout(this.adShowTime);
    this.adShowTime = setTimeout(() => {
      this.isShowAd = true;
    }, 10000);
  }
  public postVideoList() {
    VideoService.postVideoList().then((res: any) => {
      // console.log(res);
      if (res.code == 200) {
        this.videoListOne = res.data.Videos;
        this.videoListOne.forEach((item: any, index: any) => {
          item.isCommentShow = false;
          // 测试使用
          item.isLike = false;
        });

        // VideoService.getVideo(res.data.Videos[0].Id).then((res: any) => {
        //   console.log(res);
        // });
      }
    });
  }
  // 点击播放操作
  public playVideo(id: any) {
    this.isPlay = !this.isPlay;
    this.current = id;
    if (this.isPlay) {
      this.closePopup(id);
    } else {
      this.isPlayVideoFalse(id);
    }
  }
  public playVideoSwipe(id: any) {
    this.current = id;
    // this.isPlayVideoTrue(id)
    this.closePopup(id);
  }
  // 切换操作
  public onChange(index: any) {
    let video = document.querySelectorAll("video")[this.current];
    video.currentTime = 0;
    video.pause();
    this.playVideoSwipe(index);
    if (index == Math.round(this.videoListOne.length / 2) && this.isGetVideo) {
      this.isGetVideo = false;
      VideoService.postVideoList().then((res: any) => {
        // console.log(res);
        if (res.code == 200) {
          this.videoListTwo = res.data.Videos;
          this.videoListTwo.forEach((item: any, index: any) => {
            item.isCommentShow = false;
            // 测试使用
            item.isLike = false;
          });
        }
      });
    } else if (index == 0 && !this.isGetVideo) {
      this.isGetVideo = true;
      this.videoListOne = this.videoListTwo;
      this.isPlay = false;
    }
  }
  // 关闭广告
  public closeAd() {
    this.isShowAd = false;
  }
  public clickLike(index: any) {
    this.videoListOne[index].isLike = !this.videoListOne[index].isLike;
    Vue.set(this.videoListOne, index, this.videoListOne[index]);
    if (this.videoListOne[index].isLike) {
      this.videoListOne[index].LikeCount =
        this.videoListOne[index].LikeCount + 1;
      Vue.set(this.videoListOne, index, this.videoListOne[index]);
      // 接口交互
    } else {
      this.videoListOne[index].LikeCount =
        this.videoListOne[index].LikeCount - 1;
      Vue.set(this.videoListOne, index, this.videoListOne[index]);
    }
  }
  //弹出评论操作
  public showComment(index: any) {
    this.videoListOne[index].isCommentShow = true;
    Vue.set(this.videoListOne, index, this.videoListOne[index]);
    this.isPlayVideoFalse(index);
  }
  //关闭评论操作
  public closePopup(index: any) {
    this.videoListOne[index].isCommentShow = false;
    Vue.set(this.videoListOne, index, this.videoListOne[index]);
    this.isPlayVideoTrue(index);
  }
  // 播放视频
  public isPlayVideoTrue(index: any) {
    let video = document.querySelectorAll("video")[index];
    video.play();
    this.isPlay = true;
    video.addEventListener(
      "ended",
      () => {
        this.isPlay = false;
        video.currentTime = 0;
      },
      false
    );
  }
  // 暂停播放
  public isPlayVideoFalse(index: any) {
    let video = document.querySelectorAll("video")[index];
    video.pause();
    this.isPlay = false;
  }
  public stepToVideo(){
    this.$router.push({
      name: 'video'
    })
  }
}
</script>
<style lang="scss" scoped>
/*
2020.08
 */
.container-box {
  width: 100vw;
  height: 100vh;
  background: #000;
}
.van-swipe {
  width: 100vw;
  height: 100vh;
  max-width: 550px;
  margin: 0 auto;
  position: relative;
}
.step-icon{
  position: absolute;
  left: .3rem;
  top:.3rem;
  width: .5rem;
  height: .5rem;
  z-index: 99;
}
.product-swiper {
  width: 100vw;
  height: 100vh;
}
.van-swipe {
  height: 100vh;
  max-width: 100vw;
}
.video-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  .i-icon {
    display: block;
    position: absolute;
    width: 1rem;
    height: 1rem;
    z-index: 88;
    opacity: 0.7;
    &.show {
      display: none;
    }
  }
}
.comment-mask {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 0;
  background-color: #fff;
  border-radius: 0.2rem 0.2rem 0 0;
  z-index: 100;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
  &.active {
    height: 38vh;
    .c-icon {
      position: absolute;
      right: 0;
      top: 0;
      width: 0.6rem;
      height: 0.6rem;
      color: #666;
    }
  }
  .c-icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    color: #666;
  }
}
.right-box {
  display: flex;
  position: absolute;
  right: 0;
  bottom: 3rem;
  width: 1rem;
  height: 2rem;
  // background-color: rgba(161, 55, 55, 0.5);
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  z-index: 99;
  .right-icon {
    width: 0.6rem;
    height: 0.6rem;
    padding: 0.2rem 0.2rem 0;
  }
  .right-icon1 {
    width: 0.5rem;
    height: 0.5rem;
    padding: 0.2rem 0.2rem 0;
  }
  .text {
    color: #fff;
  }
}
.bottom-box {
  position: absolute;
  left: 0.52rem;
  bottom: 4.5rem;
  width: 65%;
  height: 0.01rem;
  z-index: 99;
  .name {
    position: absolute;
    top: 1.5rem;
    font-size: 0.32rem;
    font-weight: bold;
    line-height: 0.4rem;
    color: #fff;
  }
  .close-icon {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.1rem;
    width: 0.35rem;
    height: 0.35rem;
  }
  .ad {
    position: absolute;
    display: none;
    // justify-content: center;
    align-items: center;
    width: 3.7rem;
    height: 1.2rem;
    border: 1px dashed rgba(53, 53, 53, 0.6);
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 0.1rem;
    &.active {
      display: flex;
    }
    .img-box {
      margin: 0 0.1rem;
      width: 1rem;
      height: 1rem;
      background-color: rgba(0, 0, 0, 1);
      border-radius: 0.1rem;
    }
    .r-box {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      height: 100%;
      align-content: space-around;
      .r-name {
        font-size: 0.3rem;
        color: #333;
        line-height: 0.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .r-price {
        font-size: 0.25rem;
        color: #666;
        line-height: 0.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
/*
2020.08
 */
.clear {
  clear: both;
}
.back-i {
  position: fixed;
  top: 20px;
  left: 10px;
  width: 28px;
  z-index: 10;
}
.video-player {
  height: 100vh;
  width: 100vw;
}
.product-swiper {
  width: 100vw;
  height: 100vh;
}

.video-box {
  /*object-fit: fill !important;*/
  /*z-index: 999;*/
  width: 100%;
}
video {
  object-position: 0 0;
}
.icon-play {
  position: absolute;
  top: 44%;
  right: 0;
  left: 0;
  bottom: auto;
  margin: auto;
  z-index: 999;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}
.play,
.platStart {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
}
</style>