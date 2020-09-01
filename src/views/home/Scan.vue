<!--  -->
<template>
  <div class="v-body">
    <abus-title title="Scan" backRootName="home">
      <div slot style="width:0.3rem"></div>
    </abus-title>
    <div id="code"></div>

    <h1>{{ outputData }}</h1>
    <div id="loadingMessage" v-if="!showCanvas">{{ loadingMessage }}</div>
    <video src=""></video>
    <canvas
      :width="canvasWidth"
      :height="canvasHeight"
      id="canvas"
      v-show="showCanvas"
      ref="canvasElement"
    ></canvas>
    <div id="output" v-if="showCanvas">
      <div v-if="!outputData">No QR code detected.</div>
      <div v-else>
        <b>Data:</b>
        <span id="outputData">{{ outputData }}</span>
      </div>
    </div>
    <div @click="openScan">开启扫描</div>
  </div>
</template>

<script>
import adapter from "webrtc-adapter";
// WebRTC适配器 只需要引入就ok
import jsQR from "jsqr";
import AbusTitle from "../../components/AbusTitle.vue";

export default {
  components: {
    AbusTitle,
  },
  data() {
    return {
      video: document.createElement("video"),
      loadingMessage:
        "Unable to access video stream (please make sure you have a webcam enabled)",
      showCanvas: true,
      canvas2d: undefined,
      outputData: undefined,
      canvasWidth: 320,
      canvasHeight: 480,
    };
  },
  created() {
    console.log("sssssss", adapter);
  },
  mounted() {
    let qrcode = new QRCode(document.getElementById("code"), {
      width: 201,
      height: 201,
    });

    let url = location.href;
    qrcode.makeCode(url.replace("invitation", "main"));
  },

  destroyed() {
    this.closeCamera();
  },
  methods: {
    openScan() {
      const _this = this;
      const videoParam = {
        audio: false,
        video: { facingMode: { exact: "environment" } },
      };
      console.log("shp", this.video);
      navigator.getUserMedia =
        navigator.mediaDevices.getUserMedia ||
        navigator.mediaDevices.webkitGetUserMedia ||
        navigator.mediaDevices.mozGetUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.getUserMedia ||
        navigator.mozGetUserMedia;

      adapter.browserShim
        .shimGetUserMedia(videoParam)
        .then((stream) => {
          _this.video.srcObject = stream;
          _this.video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
          _this.video.play();
          requestAnimationFrame(this.tick);
        })
        .catch((err) => {
          console.log("+++++++++++", err);
        });
    },
    // 关闭摄像头
    closeCamera() {
      if (this.video.srcObject) {
        this.video.srcObject.getTracks().forEach(function(track) {
          track.stop();
        });
      }
    },
    tick() {
      this.loadingMessage = "Loading video...";
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        // this.showCanvas = true
        this.canvasHeight = this.video.videoHeight;
        this.canvasWidth = this.video.videoWidth;
        !this.canvas2d &&
          (this.canvas2d = this.$refs.canvasElement.getContext("2d"));
        this.canvas2d.drawImage(
          this.video,
          0,
          0,
          this.canvasWidth,
          this.canvasHeight
        );
        var imageData = this.canvas2d.getImageData(
          0,
          0,
          this.canvasWidth,
          this.canvasHeight
        );
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          this.drawLine(
            code.location.topLeftCorner,
            code.location.topRightCorner,
            "#FF3B58"
          );
          this.drawLine(
            code.location.topRightCorner,
            code.location.bottomRightCorner,
            "#FF3B58"
          );
          this.drawLine(
            code.location.bottomRightCorner,
            code.location.bottomLeftCorner,
            "#FF3B58"
          );
          this.drawLine(
            code.location.bottomLeftCorner,
            code.location.topLeftCorner,
            "#FF3B58"
          );
          this.outputData = code.data;
          console.log(code.data);
          // this.closeCamera()
          // return
        } else {
          this.outputData = undefined;
        }
      }
      requestAnimationFrame(this.tick);
    },
    drawLine(begin, end, color) {
      this.canvas2d.beginPath();
      this.canvas2d.moveTo(begin.x, begin.y);
      this.canvas2d.lineTo(end.x, end.y);
      this.canvas2d.lineWidth = 4;
      this.canvas2d.strokeStyle = color;
      this.canvas2d.stroke();
    },
  },
};
</script>
<style scoped>
.v-body {
  font-family: "Ropa Sans", sans-serif;
  color: #333;
  max-width: 640px;
  margin: 0 auto;
  position: relative;
}
#githubLink {
  position: absolute;
  right: 0;
  top: 12px;
  color: #2d99ff;
}
h1 {
  margin: 10px 0;
  font-size: 40px;
}
#loadingMessage {
  text-align: center;
  padding: 40px;
  background-color: #eee;
}
#canvas {
  width: 100%;
}
#output {
  margin-top: 20px;
  background: #eee;
  padding: 10px;
  padding-bottom: 0;
}
#output div {
  padding-bottom: 10px;
  word-wrap: break-word;
}
#noQRFound {
  text-align: center;
}
</style>
