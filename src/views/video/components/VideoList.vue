<template>
  <div>
    <h2 class="abus-block-title">
      <van-cell title="Video" class="block-title-background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>
    <div class="abus-scroller-box">
      <scroller>
        <div slot="list" v-for="(item, index) of dishData" :key="index">
          <div class="s-box s-box-right" v-if="index+1 == dishData.length">
            <img :src="item.img" :alt="item.name" />
          </div>
          <div class="s-box" v-else>
            <img :src="item.img" :alt="item.name" />
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Scroller from "@nutui/nutui/dist/packages/scroller/scroller.js"; // 加载构建后的JS
import "@nutui/nutui/dist/packages/scroller/scroller.css";
Scroller.install(Vue);
export default {
  components: {
    Scroller
  },
  data() {
    return {
      dishData: [
        {
          img: require("../images/video.jpg"),
          name: "Pock rice"
        },
        {
          img: require("../images/video.jpg"),
          name: "Pock rice"
        },
        {
          img: require("../images/video.jpg"),
          name: "Pock rice"
        },
        {
          img: require("../images/video.jpg"),
          name: "Pock rice"
        },
        {
          img: require("../images/video.jpg"),
          name: "Pock rice"
        },
        {
          img: require("../images/video.jpg"),
          name: "Pock rice"
        },
        {
          img: require("../images/video.jpg"),
          name: "Pock rice"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.block-title-background {
  background-color: #fafafa00;
}
.van-cell {
  font-size: 0.36rem;
}

.s-box {
  float: left;
  // height: 1.6rem;
  margin: 0 0 0 0.28rem;
  border-radius: 0.08rem;
  width: 2.1rem;

  img {
    width: 100%;
    border-radius: 0.1rem;
    box-shadow: 0 0 0.08rem #efefef;
  }
}
.s-box-right {
  margin-right: 0.82rem;
}
</style>