<template>
  <div class="container-box" id="video-box">
    <div class="van-swipe">
      <van-swipe :show-indicators="false" @change="onChange" vertical >
        <van-swipe-item v-for="(item, index) in videoList"  class="product-swiper" :key="index">
          <div >
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
            <video
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
            ></video>
            
            <!-- 封面 -->
            <img v-show="isVideoShow" class="play" @click="playvideo" :src="item.cover" />
            <!-- 播放暂停按钮 -->
            <img
              v-show="iconPlayShow"
              class="icon-play"
              @click="playvideo"
              src="http://npjy.oss-cn-beijing.aliyuncs.com/images/file-1575340653940esdHR.png"
            />
          </div>
          <!-- 右侧头像、点赞、评论、分享功能 -->
          <!-- <div class="tools-right">
            <div class="tools-r-li">
              <img :src="item.tag-image" class="tag-image" />
              <i
                class="iconfont icon-jiahao tag-add"
                v-show="!item.tagFollow"
                @click="checkSubscribe(item,index)"
              ></i>
              <i
                class="iconfont icon-duihao tag-dui"
                v-show="item.tagFollow"
                :class="item.tagFollow?'tag-dui-active':''"
              ></i>
            </div>
            
          </div> -->
          <!-- 底部作品描述 -->
          <!-- <div class="production-box">
            <div class="production-name">@{{item.author}}</div>
            <div class="production-des">{{item.des}}</div>
          </div> -->
        </van-swipe-item>
      </van-swipe>
      
      
      
      
    </div>
  </div>
</template>
<script>
let videoProcessInterval;
export default {
  name: "home",
  data() {
    let u = navigator.userAgent;
    return {
      current: 0,
      videoList: [
        {
          url:
            "http://video.jishiyoo.com/3720932b9b474f51a4cf79f245325118/913d4790b8f046bfa1c9a966cd75099f-8ef4af9b34003bd0bc0261cda372521f-ld.mp4", //视频源
          cover: "http://oss.jishiyoo.com/images/file-1575341210559.png", //封面
          tag_image:
            "http://npjy.oss-cn-beijing.aliyuncs.com/images/file-1575449277018pF3XL.jpg", //作者头像
          fabulous: false, //是否赞过
          tagFollow: false, //是否关注过该作者
          author_id: 1, //作者ID
          author: "superKM",
          des: "武汉加油"
        },
        {
          url:
            "http://video.jishiyoo.com/1eedc49bba7b4eaebe000e3721149807/d5ab221b92c74af8976bd3c1473bfbe2-4518fe288016ee98c8783733da0e2da4-ld.mp4",
          cover: "http://oss.jishiyoo.com/images/file-1575343195934.jpg",
          tag_image:
            "http://npjy.oss-cn-beijing.aliyuncs.com/images/file-1575449298299M3V50.jpg",
          fabulous: true, //是否赞过
          tagFollow: false, //是否关注过该作者
          author_id: 2, //作者ID
          author: "superKM",
          des: "中国加油"
        },
        {
          url:
            "http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4",
          cover: "http://oss.jishiyoo.com/images/file-1575343262684.jpg",
          tag_image:
            "http://npjy.oss-cn-beijing.aliyuncs.com/images/file-1575449277018pF3XL.jpg",
          fabulous: false, //是否赞过
          tagFollow: false, //是否关注过该作者
          author_id: 1, //作者ID
          author: "superKM",
          des: "武汉加油"
        },
        {
          url:
            "http://video.jishiyoo.com/549ed372c9d14b029bfb0512ba879055/8e2dc540573d496cb0942273c4a4c78c-15844fe70971f715c01d57c0c6595f45-ld.mp4",
          cover: "http://oss.jishiyoo.com/images/file-1575343508574.jpg",
          tag_image:
            "http://npjy.oss-cn-beijing.aliyuncs.com/images/file-1575449277018pF3XL.jpg",
          fabulous: false, //是否赞过
          tagFollow: false, //是否关注过该作者
          author_id: 1, //作者ID
          author: "superKM",
          des: "中国加油"
        }
      ],
      isVideoShow: true,
      playOrPause: true,
      video: null,
      iconPlayShow: true,
      isAndroid: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, // android终端
      isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      tabIndex: 0,
      showShareBox: false, //展示分享框
      commentPop: false, //是否展示评论弹框
      // 评论相关
      comment_text: "", //评论输入内容
      canSend: false, //是否可以发送
      videoComment: [],
      commentPlaceholder: "留下你精彩的评论吧", //评论Placeholder
      replayUserData: "",
      to_comment_id: "",
      videoProcess: 0 //视频播放进度
    };
  },
  watch: {
    //监听输入变化
    comment_text(newV, oldV) {
      newV == "" ? (this.canSend = false) : (this.canSend = true);
    }
  },
  mounted() {
    try {
      
    } catch (e) {
      console.log(e);
    }
    //获取到视频资源后默认自动播放
    if(this.videoList.length > 0){
      this.playvideo();
    }
    // setTimeout(() => {
    //   this.playvideo();
    // }, 500);
  },
  methods: {

    //改变收藏状态
    changeFabulous(item, index) {
      this.videoList[index].fabulous = !this.videoList[index].fabulous;
    },
    //展示分享弹窗
    changeShare() {
      this.showShareBox = true;
    },
    //取消分享
    cancelShare() {
      this.showShareBox = false;
    },
    //滑动改变播放的视频
    onChange(index) {
      //改变的时候 暂停当前播放的视频
      clearInterval(videoProcessInterval);
      this.videoProcess = 0;
      let video = document.querySelectorAll("video")[this.current];
      video.pause();
      this.playOrPause = false;
      this.showShareBox = false;
      this.current = index;
      //非ios切换直接自动播放下一个
      if (!this.isiOS) {
        this.isVideoShow = false;
        setTimeout(() => {
          this.pauseVideo();
        }, 100);
      } else {
        //ios官方禁止video自动播放，未找到合适的方法，如果您发现了，麻烦告诉我一下谢谢啦
        this.playOrPause = true;
        this.iconPlayShow = true;
      }
    },
    // 开始播放
    playvideo(event) {
      let video = document.querySelectorAll("video")[this.current];
      console.log("playvideo：" + this.current);
      this.isVideoShow = false;
      this.iconPlayShow = false;
      this.showShareBox = false;
      console.log(video)
      video.play();
      if (this.isiOS) {
        setTimeout(() => {
          //处理ios宽视频
          let documentW =
            document.documentElement.clientWidth || document.body.clientWidth;
          let docB = parseFloat(video.videoWidth / documentW);
          console.log("获取视频宽和屏幕比：" + docB);
          // 计算视频最适高度
          let realH = parseInt(video.videoHeight / docB);
          this.realH = realH + "px";
          console.log("视频最适高度：" + this.realH);
          this.$forceUpdate();
        }, 200);
      }
      videoProcessInterval = setInterval(() => {
        this.changeProcess(video);
      }, 100);
    },
    pauseVideo() {
      //暂停\播放
      try {
        let video = document.querySelectorAll("video")[this.current];
        console.log("pauseVideo" + this.current);
        if (this.playOrPause) {
          video.pause();
          this.iconPlayShow = true;
          clearInterval(videoProcessInterval);
        } else {
          
          video.play();
          video.pause();
          setTimeout(() => {
            // video.play();
            this.iconPlayShow = false;
            videoProcessInterval = setInterval(() => {
              this.changeProcess(video);
            }, 100);
          }, 100);
        }
        this.playOrPause = !this.playOrPause;
        this.showShareBox = false;
      } catch (e) {
        alert(e);
      }
    },
    //记录播放进度
    changeProcess() {
      let video = document.querySelectorAll("video")[this.current];
      let currentTime = video.currentTime.toFixed(1);
      let duration = video.duration.toFixed(1);
      this.videoProcess = parseInt((currentTime / duration).toFixed(2) * 100);
    },
    onPlayerEnded(player) {
      //视频结束
      this.isVideoShow = true;
      this.current += this.current;
    },
    //复制当前链接
    copyUrl() {
      let httpUrl = window.location.href;
      var oInput = document.createElement("input");
      oInput.value = httpUrl;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      alert("链接复制成功");
    }
  }
};
</script>
<style scoped>
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
.van-swipe {
  width: 100vw;
  height: 100vh;
  max-width: 550px;
  margin: 0 auto;
  position: relative;
}
.van-swipe {
  width: 100%;
  height: 100%;
}
.container-box {
  width: 100vw;
  height: 100vh;
  background: #000;
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
/*头像， 点赞，转发 */
.tag-image {
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  box-sizing: border-box;
  border-radius: 50%;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 0px 0px 10px #9d9d9d;
}
.tag-add {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  border-radius: 67px;
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  margin: 0 auto;
  z-index: 1;
  font-size: 20px;
  color: #f44;
  background: #fff;
}
.tag-dui {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  border-radius: 67px;
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 0 auto;
  z-index: 1;
  font-size: 11px;
  color: #f44;
  background: #fff;
}
.tag-dui-active {
  opacity: 0;
  animation: showFollow 1.4s ease-in-out 0s;
}
.tag-add-num {
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
}
@keyframes showFollow {
  0% {
    opacity: 1;
    color: #fff;
    background: #f44;
    transform: rotate(-180deg) scale(1);
  }
  35% {
    opacity: 1;
    color: #f44;
    background: #fff;
    transform: rotate(0deg) scale(1.2);
  }
  80% {
    opacity: 1;
    color: #f44;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    display: none;
    color: #f44;
    transform: scale(0);
  }
}
.tools-right {
  z-index: 1001;
  position: absolute;
  right: 16px;
  bottom: 180px;
}
.tools-r-li {
  margin-bottom: 20px;
  color: #fff;
  font-size: 14px;
  position: relative;
}
.tools-r-li:last-child {
  margin-bottom: 0px;
}
.icon-right {
  margin-bottom: 5px;
  font-size: 42px;
  display: block;
  text-shadow: 0px 0px 10px #9d9d9d;
  /*transition: .5s;*/
}
.production-box {
  z-index: 1001;
  position: absolute;
  /* right: 16px; */
  bottom: 48px;
  text-align: left;
  padding: 0 15px 15px 15px;
  color: #fff;
  width: 100%;
  left: 0;
  box-sizing: border-box;
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  /* 标准的语法 */
}
.production-name {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
}
.production-des {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  min-height: 62px;
  font-size: 13px;
}
.container-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  height: 48px;
  /*border-top: 1px solid rgba(255, 255, 255, 0.7);*/
  max-width: 550px;
}
.production-top {
  display: inline-block;
  padding: 6px;
  margin-bottom: 5px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  margin-top: 5px;
}
.product-go {
  color: #fbdd21;
}
.production-title {
  margin-left: 4px;
}
.border-progress {
  width: 0;
  height: 1px;
  background: #bababa;
  position: absolute;
  top: 0;
  transition: 0.1s all;
}
.bottom-tab {
  width: 33%;
  text-align: center;
  float: left;
  color: #c9c9c9;
  padding: 10px 0;
}
.bottom-tab-icon {
  width: 44px;
}
.bottom-tab-span {
  line-height: 28px;
  border-bottom: 2px solid transparent;
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  padding: 0 4px;
  transition: 0.5s all;
}
.tab-active .bottom-tab-span {
  border-bottom: 2px solid #fff;
  color: #fff;
}
.icon-shoucang {
  transition: 0.5s all;
}
.fabulous-active {
  color: #f44;
  animation: showHeart 0.5s ease-in-out 0s;
}
/*animation-name：用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致*/
/*animation-duration ：指定元素播放动画所持续的时间*/
/*animatino-timing-function ： 和transition中的transition-timing-function 中的值一样。根据上面@keframes中分析的animation中可能存在多个小动画，因此这里的值设置是针对每一个小动画所在时间范围内的属性变换速率。*/
/*animation-delay：定义在浏览器开始执行动画之前等待的时间，这里是指整个animation执行之前的等待时间，而不是上面说的多个小动画*/
/*animation-iteration-count：定义动画的播放次数，其通常为整数，默认是1,；取值为infinite，动画将无限次的播放。*/
/*animation-direction：主要用来设置动画播放方向*/
@keyframes showHeart {
  0% {
    color: #f44;
    transform: scale(1);
  }
  25% {
    color: #fff;
    transform: scale(0);
  }
  80% {
    color: #f44;
    transform: scale(1.2);
  }
  100% {
    color: #f44;
    transform: scale(1);
  }
}
/*分享样式*/
.share-hover {
  position: fixed;
  display: none;
}
.share-box {
  position: fixed;
  bottom: -300px;
  width: 100%;
  z-index: 1002;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: 0.5s;
}
.share-tips {
  text-align: center;
  line-height: 38px;
  color: #333;
}
.share-ul {
  box-sizing: border-box;
  padding: 0 25px 25px;
  border-bottom: 1px solid #e8e8e8;
}
.share-li {
  float: left;
  width: 33%;
  text-align: center;
}
.share-li i {
  font-size: 44px;
}
.share-cancel {
  text-align: center;
  line-height: 48px;
  color: #777;
  text-align: center;
}
.pengyouquan {
  color: #47d000;
}
.pengyouquan-li {
  animation: rotating 8s linear infinite;
}
@keyframes rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.weixin {
  color: #20ca2e;
}
.lianjie {
  color: #cdcdcd;
}
.share-active {
  bottom: 0px;
}
/*评论样式*/
::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.2);
}
:-moz-placeholder {
  color: rgba(0, 0, 0, 0.2);
}
::-moz-placeholder {
  color: rgba(0, 0, 0, 0.2);
}
:-ms-input-placeholder {
  color: rgba(0, 0, 0, 0.2);
}
.comment-container {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.comment-box {
  padding: 0 15px 52px 15px;
}
.comment-top {
  text-align: center;
  font-size: 12px;
  color: #000;
  line-height: 40px;
}
.guanbi3 {
  float: right;
  font-size: 12px;
  padding: 0 10px;
  position: absolute;
  right: 6px;
}
.comment-li {
  margin-bottom: 20px;
  font-size: 14px;
  text-align: left;
}
.comment-author-left {
  float: left;
}
.comment-author-left img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.comment-author-right {
  margin-left: 46px;
  padding-top: 4px;
}
.comment-author-top {
  position: relative;
}
.comment-author-name {
  margin-bottom: 6px;
  color: #777;
}
.icon-shoucang1-box {
  position: absolute;
  right: 0px;
  top: 0;
  text-align: center;
  color: #777;
}
.comment-author-text {
  color: #555;
  margin-bottom: 10px;
  padding-right: 35px;
}
.comment-replay-box {
  padding-left: 46px;
  box-sizing: border-box;
}
.comment-replay-li {
  margin-bottom: 10px;
}
.comment-replay-left {
  float: left;
}
.comment-replay-left img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
.comment-replay-right {
  margin-left: 35px;
  padding-top: 2px;
}
.comment-replay-top {
  position: relative;
  margin-bottom: 6px;
}
.comment-replay-text {
  padding-right: 35px;
  margin-bottom: 10px;
  color: #555;
}
.comment-author-text span,
.comment-replay-text span {
  color: #999;
  font-size: 13px;
  margin-left: 6px;
}
.shoucang1-num {
  text-align: center;
  width: 30px;
  font-size: 12px;
  /* right: -4px; */
  position: relative;
}
.comment-ul {
  height: 400px;
  overflow-y: auto;
}
.comment-input-box {
  position: fixed;
  bottom: 0;
  z-index: 2999;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  background: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
}
/*.comment-form {*/
/**/
/*}*/
.comment-input {
  border: none;
  resize: none;
  width: 80%;
  float: left;
  color: #555;
  caret-color: #f44;
  line-height: 0.44rem;
}
.comment-input-right {
  float: right;
}
.comment-i {
  font-size: 22px;
  color: #999;
  transition: 0.3s;
}
.comment-i-active {
  color: #f44;
}
.icon-zanwupinglun {
  font-size: 100px;
  color: #777;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
/*添加进场效果*/
.v-move {
  transition: all 1s ease;
}
.v-leave-active {
  position: absolute;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
.love-active {
  color: #f44;
}
/*评论样式*/
</style>