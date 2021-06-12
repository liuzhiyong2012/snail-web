 <template>
  <!-- <div
    id="app"
    class="app"
    :class="{
      ishome: $store.state.header.type == 'home',
      nocollpased: !$store.state.header.isCollpased,
      collpased: $store.state.header.isCollpased,
      headshow: $store.state.header.show,
      headnoshow: !$store.state.header.show
    }"
  > -->
  <div
    id="app"
    class="app"
    :class="{
    }"
  >
    <coming-soon></coming-soon>
    <div>
      <!-- 头部 -->
      <Header></Header>
      <!-- 身体 -->
      <div ref="content" id="layoutBody" class="container-wrap">
        <router-view />
      </div>
      <!-- 页面布局尾部 -->
      <app-footer id="layoutFooter" class="app-footer" v-show=$store.state.header.showFooter :class="{ 'app-footer-fixed': $store.state.header.fixedFooter }" ref="abc"></app-footer>
      <!-- 信息弹窗 -->
      <appMessageBox ref="appMessageBox"></appMessageBox>
      <!-- 信息 -->
      <appMessageTip ref="appMessageTip"></appMessageTip>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import WeixinApi from '../../api/weixinApi';
import appFooter from '../../components/AppFooter';
import appHeader from '../../components/AppHeader';
import AppPhoneHeader from '../../components/AppPhoneHeader';
import appMessageBox from '../../components/AppMessageBox';
import appMessageTip from '../../components/appMessageTip';
import Header from '../../components/Header_old';
import ComingSoon from './components/ComingSoon';
import TWEEN from 'tween.js';

export default {
  name: 'App',
  components: {
    appHeader,
    AppPhoneHeader,
    appFooter,
    appMessageBox,
    appMessageTip,
    Header,
    ComingSoon
  },
  data() {
    return {
        handleMap:{
              home: {
                show: false,
                paddinTop: 0,
                type: 'home',
                isCollpased: false
              },
              degreeShow: {
                show: true,
                paddinTop: 0,
                type: 'degreeShow',
                isCollpased: false
              },
              news: {
                show: true,
                paddinTop: 0,
                type: 'newsInformation',
                isCollpased: false
              },
              newsDetail: {
                show: true,
                paddinTop: 0,
                type: 'newsInformation',
                isCollpased: false
              },
              artWorks: {
                show: true,
                paddinTop: 0,
                type: 'selectedArtworks',
                isCollpased: false
              },
              artWorksSelect:{
                show: true,
                paddinTop: 0,
                type: 'selectedArtworks',
                isCollpased: false
              },
              artWorksDetail: {
                show: true,
                paddinTop: 0,
                type: 'selectedArtworks',
                isCollpased: false
              },
              videos: {
                show: true,
                paddinTop: 0,
                type: 'selectedVideo',
                isCollpased: false
              },
              videosSelect: {
                show: true,
                paddinTop: 0,
                type: 'selectedVideo',
                isCollpased: false
              }
      },
      resizeHandler:null,
      wheelHandler:null,
      shareLogo:this.$addBaseUrl('/group1/M11/2021/05/31/6f6df370cc5a4183867166466a49df70.jpg'),
      // require('./img/share.png')
      show: true
    };
  },
  created() {
    let THIS = this;

    this.resizeHandler = (event)=>{
       THIS.$globalEvent.$emit('windowResize',{
         winWidth:window.clientWidth
       });
    }

    window.addEventListener('resize',this.resizeHandler);


    window.requestAnimFrame = (function () {
             return window.requestAnimationFrame ||
                 window.webkitRequestAnimationFrame ||
                 window.mozRequestAnimationFrame ||
                 function (callback) {
                    window.setTimeout(callback, 6000 / 60);
                 };
         })();
         // this.$showInfo('window.location.href:' +window.location.href);
    let shareUrl = window.location.href;
    // this.$showInfo('shareUrl:' +shareUrl);
    this.registWeixin(shareUrl,'广州美术学院2021线上毕业展','打破线性时间的秩序，越过信息传递的藩篱，让我们奔赴一场溯源逐梦之旅',this.shareLogo);

  },
  destroyed(){
    window.removeEventListener('resize',this.resizeHandler);
  },
  mounted(){
    let THIS = this;
    let routeName = this.$route.name;
    this.$store.commit('setHeader', this.handleMap[routeName||'degreeShow']);

     var change = 'orientationchange' in window ? 'orientationchange' : 'resize';

    let lastScrollTop = 0;
    function calcScrollTop() {
        let scrollTop = THIS.getScrollTop();
        let gap = scrollTop -  lastScrollTop;



        lastScrollTop = scrollTop;

        THIS.$nextTick(()=>{
           let  layoutBody =document.getElementById('layoutBody');
           let  layoutHeader =document.getElementById('layoutHeader');
           let  layoutFooter =document.getElementById('layoutFooter');


           let headerHeight =0
           if(layoutHeader&&layoutHeader.offsetHeight){
             headerHeight = layoutHeader.offsetHeight;
           }
           let offHeight = headerHeight + layoutBody.scrollHeight + layoutFooter.scrollHeight;

           if(offHeight > window.innerHeight){
                THIS.$store.commit('setHeader',{fixedFooter:false});
           }else{
              THIS.$store.commit('setHeader',{fixedFooter:true});
           }
        });

        if(gap > 0){
          THIS.$globalEvent.$emit('windowScroll',{
            direction:'down',
            scrollTop:scrollTop
          });
        }else if(gap < 0){
            THIS.$globalEvent.$emit('windowScroll',{
              direction:'up',
              scrollTop:scrollTop
            });
        }
        window.requestAnimationFrame(calcScrollTop);
    }

    window.requestAnimationFrame = (function () {
             return window.requestAnimationFrame ||
                 window.webkitRequestAnimationFrame ||
                 window.mozRequestAnimationFrame ||
                 function (callback) {
                    window.setTimeout(callback, 6000 / 60);
                 };
         })();
    window.requestAnimationFrame(calcScrollTop);

    this.wheelHandler = (event)=>{
        let  direction = event.direction,
            scrollTop = event.scrollTop;

      if(direction == 'up'){
       if(scrollTop < 40){
           THIS.$store.commit('setHeader', {
              isCollpased:false
           });
       }
      }else{
        if(scrollTop > 40){
             THIS.$store.commit('setHeader', {
                isCollpased:true
             });
        }
      }
    }
    this.$globalEvent.$on('windowScroll',this.wheelHandler);
  },
  methods:{
    registWeixin(url, title, description, logoUrl) {
         const that = this;
        // this.$showInfo('我传的url:' + url);
        WeixinApi.getWeixinAuth({
           pageUrl:url
        }).then(message => {
            if (message.code == 1000) {
             let datas = JSON.parse(message.datas);
             // debugger;
               wx.config({
                    debug: false,
                    appId: datas.appId,
                    timestamp: datas.timestamp,
                    nonceStr: datas.nonceStr,
                    signature: datas.signature,
                    jsApiList: [
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage",
                        "checkJsApi"
                    ]
                });

                wx.checkJsApi({
                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"],
                    success: function(res) {
                        console.log('res',JSON.stringify(res));
                    }
                });

               /* let a = '/group1/M11/2020/06/13/dfa8780e6e144b338bc3feb5aaa3b919.JPG';
                let logoTest = this.$addBaseUrl(a); */
                wx.ready(function() {
                    var sdata = {
                        title: title,
                        desc: description,
                        link: url,
                        imgUrl:logoUrl,
                        success: function() {
                            // that.$showInfo("分享成功")
                        },
                        //取消分享的回调
                        cancel: function() {


                        }
                    };
                    wx.onMenuShareTimeline(sdata);
                    wx.onMenuShareAppMessage(sdata);
                });
                wx.error(function(res){
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    console.log('res',JSON.stringify(res));
                    that.$showInfo('res:' + JSON.stringify(res));
                });
            }
            }).catch(err => {
                console.error(err);
            });
    },
    weixinShare(){
       this.$ajax({
              type : "post",
              url : path+"/mvc/wechat/wechatParam",
              data:{
                  url:url
              },
              success : function(result) {
                  var data = result.data;
                  wx.config({
                      debug: false,////生产环境需要关闭debug模式
                      appId: data.appid,//appId通过微信服务号后台查看
                      timestamp: data.timestamp,//生成签名的时间戳
                      nonceStr: data.nonceStr,//生成签名的随机字符串
                      signature: encodeURIComponent(data.signature),//签名
                      jsApiList: [//需要调用的JS接口列表
                          'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                          'onMenuShareTimeline',//分享给好友
                          'onMenuShareAppMessage'//分享到朋友圈
                      ]
                  });
              },
              error: function(xhr, status, error) {
              }
          });
    },
    getScrollTop() {　　
        var scrollTop = 0,
            bodyScrollTop = 0,
            documentScrollTop = 0;　　
        if (document.body) {　　　　
            bodyScrollTop = document.body.scrollTop;　　
        }　　
        if (document.documentElement) {　　　　
            documentScrollTop = document.documentElement.scrollTop;　　
        }　　
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
        return scrollTop;
    }
  },
  watch: {
    $route(to, from) {
      this.$store.commit('setHeader', this.handleMap[to.name||'degreeShow']);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/css/index.less';

body {
  // font-family: 'Microsoft YaHei', 'Source Han Sans' 'FZLanTingHei-R', 'Hei', 'arial', 'sans-serif';
}

.pc-header {
  display: block;
}

.mobile-header {
  //display: none;
}

.app-footer-fixed {
  z-index: 100;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 100;
}

//第一种
@media screen and (max-width: @xs - 1px) {



  .container-wrap {

    /* width: 6.4rem;
    margin-left: auto;
    margin-right: auto;*/

    padding-top: 0.6rem;
    padding-bottom: 0.6rem;

    padding-left: 0.72rem;
    padding-right: 0.72rem;


    min-height: 100%;
    box-sizing: border-box;
    position: relative;
    background-color: #ffffff;
  }

  .app {
    /* .mobile-header{
            display: block;
          } */
    .pc-header {
      display: block;
    }

    &.ishome {
      padding-top: 0rem !important;
    }

    &.collpased.headshow {
      padding-top: 0.9rem;
    }

    &.nocollpased.headshow {
      padding-top: 1.56rem;
    }

    &.headnoshow {
      padding-top: 0rem;
    }

    box-sizing: border-box;
    padding: 0 0 0;
    position: relative;
    // font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-touch-callout: none;
    background-color: #ffffff;
    transition: 0.2s all ease-out;
  }

  html,
  body,
  #app {
    height: 100%;
  }

  body {
    margin: 0;
    min-width: 12rem;
  }
}
//第二种
@media screen and (min-width: @xs) and (max-width: @md - 1) {
}
//第三种
@media screen and (min-width: @md) {

  .container-wrap {
    width: 13.70rem;
    margin: auto;
    min-height: 100%;
    box-sizing: border-box;
    position: relative;
    background-color: #ffffff;
  }

  .app {
    &.ishome {
      // padding-top:0.88rem !important;
      padding-bottom: 0rem;
      // .app-footer {
      //   position: relative;
      // }
    }

    .pc-header {
      display: block;
    }

    /* .mobile-header{
            display: none;
          } */

    &.collpased.headshow {
      //@changge:
      padding-top: 1.6rem;
    }

    &.nocollpased.headshow {
      //@changge:
      padding-top: 3.1rem;
    }

    &.headnoshow {
      padding-top: 0rem;
    }

    box-sizing: border-box;
    padding: 0 0 0;
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-touch-callout: none;
    background-color: #ffffff;
    transition: 0.2s all ease-out;
  }

  html,
  body,
  #app {
    height: 100%;
  }

  body {
    margin: 0;
    min-width: 12rem;
  }
}
</style>
