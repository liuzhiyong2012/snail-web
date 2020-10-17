<template>
  <div class="ad_model">
    <div class="ad_bg" :style="{backgroundImage:`url(${adImgPath})`}"></div>
    <div class="ad_logo">
      <div class="line">
        <div class="other"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
declare function require(img: string): string;
@Component({
  name: "ADModel"
})
export default class ADModel extends Vue {
  private adImgPath: string = "";

  private created() {
    this.adImgPath = require("../images/ad.png");
  }
}
</script>

<style lang="scss" scoped>
.ad_model {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 99;
  .ad_bg {
    width: 100%;
    height: 70vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .ad_logo {
    position: relative;
    width: 100%;
    height: 30vh;
    background-image: url("../images/ab_logo.jpg");
    background-color: #00205b;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    .line {
      position: relative;
      width: 100%;
      border-bottom: 0.01rem solid #fff;
      .other {
        position: absolute;
        right: 0;
        top: 0;
        width: 80%;
        border-bottom: 0.06rem solid #fff;
      }
    }
  }
}
</style>
