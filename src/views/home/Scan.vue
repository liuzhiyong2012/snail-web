<template>
  <section>
    <abus-title title="Scan" backRootName="home"></abus-title>

    <section class="scan-wrap">
      <div id="support"></div>
      <div id="contentHolder">
        <video id="video" width="320" height="320" autoplay></video>
        <canvas
          style="display:none; background:rgba(0,0,0,0.63);"
          id="canvas"
          width="320"
          height="320"
        ></canvas>
        <br />
        <button id="snap" style="height:50px; width:120px; background:red">
          开始扫描
        </button>
      </div>
    </section>
  </section>
</template>

<script>
import AbusTitle from "../../components/AbusTitle.vue";
export default {
  name: "",
  components: {
    AbusTitle,
  },

  data() {
    return {
      canvas: null,
      context: null,
      video: null,
    };
  },
  mounted() {
    // this.startRecognize();
    // this.startScan();
    // this.isShow = true;
    this.init();
  },

  methods: {
    CatchCode() {
      const _this = this;
      if (_this.canvas != null) {
        //以下开始编 数据
        let imgData = this.canvas.toDataURL();
        //将图像转换为base64数据
        let base64Data = imgData; //.substr(22); //在前端截取22位之后的字符串作为图像数据
        //开始异步上
        $.post(
          "saveimg.php",
          { img: base64Data },
          function(result) {
            printHtml("解析结果：" + result.data);
            if (result.status == "success" && result.data != "") {
              printHtml("解析结果成功！");
            } else {
              startPat(); //如果没有解析出来则重新抓拍解析
            }
          },
          "json"
        );
      }
    },

    printHtml(content) {
      $(window.document.body).append(content + "<br/>");
    },
    //开始拍照
    startPat() {
      const _this = this;
      setTimeout(function() {
        //防止调用过快
        if (_this.context) {
          _this.context.drawImage(_this.video, 0, 0, 320, 320);
          CatchCode();
        }
      }, 200);
    },

    init() {
      const _this = this;
      window.addEventListener(
        "DOMContentLoaded",
        function() {
          try {
            _this.canvas = document.getElementById("canvas");
            _this.context = canvas.getContext("2d");
            _this.video = document.getElementById("video");

            let videoObj = { video: true, audio: false };
            let flag = true;
            let MediaErr = function(error) {
              flag = false;
              if (error.PERMISSION_DENIED) {
                alert("用户拒绝了浏览器请求媒体的权限", "提示");
              } else if (error.NOT_SUPPORTED_ERROR) {
                alert(
                  "对不起，您的浏览器不支持拍照功能，请使用其他浏览器",
                  "提示"
                );
              } else if (error.MANDATORY_UNSATISFIED_ERROR) {
                alert("指定的媒体类型未接收到媒体流", "提示");
              } else {
                alert(
                  "系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试",
                  "提示"
                );
              }
            };
            //获取媒体的兼容代码，目前只支持（Firefox,Chrome,Opera）
            if (navigator.getUserMedia) {
              //qq浏览器不支持
              if (navigator.userAgent.indexOf("MQQBrowser") > -1) {
                alert(
                  "对不起，您的浏览器不支持拍照功能，请使用其他浏览器",
                  "提示"
                );
                return false;
              }
              navigator.getUserMedia(
                videoObj,
                function(stream) {
                  _this.video.src = stream;
                  _this.video.play();
                },
                MediaErr
              );
            } else if (navigator.webkitGetUserMedia) {
              navigator.webkitGetUserMedia(
                videoObj,
                function(stream) {
                  _this.video.src = window.webkitURL.createObjectURL(stream);
                  _this.video.play();
                },
                MediaErr
              );
            } else if (navigator.mozGetUserMedia) {
              navigator.mozGetUserMedia(
                videoObj,
                function(stream) {
                  _this.video.src = window.URL.createObjectURL(stream);
                  _this.video.play();
                },
                MediaErr
              );
            } else if (navigator.msGetUserMedia) {
              navigator.msGetUserMedia(
                videoObj,
                function(stream) {
                  $(document).scrollTop($(window).height());
                  _this.video.src = window.URL.createObjectURL(stream);
                  _this.video.play();
                },
                MediaErr
              );
            } else {
              alert("对不起，您的浏览器不支持拍照功能，请使用其他浏览器");
              return false;
            }
            if (flag) {
              alert(
                "为了获得更准确的测试结果，请尽量将二维码置于框中，然后进行拍摄、扫描。 请确保浏览器有权限使用摄像功能"
              );
            }
            //这个是拍照按钮的事件，
            $("#snap")
              .click(function() {
                startPat();
              })
              .show();
          } catch (e) {
            printHtml("浏览器不支持HTML5 CANVAS");
          }
        },
        false
      );
    },
  },
};
</script>

<style lang="scss">
.scan-wrap {
  background: rgba(76, 76, 76, 1);
}
</style>
