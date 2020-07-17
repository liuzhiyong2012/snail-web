<template>
  <div>
    <h2 class="abus_block_title">
      <van-cell title="Hot game" class="block_title_background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>
    <!-- <div class="abus_scroller_box"> -->
    <div class="scroller_box">
      <scroller>
        <div slot="list" v-for="(item, index) of gameData" :key="index">
          <div class="s_box s_box_right" v-if="index + 1 == gameData.length">
            <div class="s_imgbox">
              <img :src="item.img" :alt="item.name" />
              <!-- <div class="cover"></div> -->
              <p class="s_name">{{ item.name }}</p>
              <p class="s_tips">{{ item.tips }}</p>
            </div>
          </div>
          <div class="s_box" v-else>
            <div class="s_imgbox">
              <img :src="item.img" :alt="item.name" />
              <div class="cover"></div>
              <p class="s_name">{{ item.name }}</p>
              <p class="s_tips">{{ item.tips }}</p>
            </div>
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
    Scroller,
  },
  data() {
    return {
      gameData: [
        {
          img: require("../images/hotGame1.png"),
          name: "Soulite Monsters",
          tips: "Explore monsters ex monsters",
        },
        {
          img: require("../images/hotGame1.png"),
          name: "Soulite egfwhtrs",
          tips: "Explorters explore monsters",
        },
        {
          img: require("../images/hotGame1.png"),
          name: "ite hdnsters",
          tips: "Expre monsters",
        },
        {
          img: require("../images/hotGame1.png"),
          name: "Soute Monsters",
          tips: "Explore monsters explore monsters",
        },
        {
          img: require("../images/hotGame1.png"),
          name: "ulite sters",
          tips: "lore rs exlore monsters",
        },
        {
          img: require("../images/hotGame1.png"),
          name: "hshlite kuyrkuytrs",
          tips: "Expe monsters explore monsters",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.block_title_background {
  background-color: #fafafa00;
  font-size: 0.36rem;
}
.scroller_box {
  margin-right: 0.28rem;
}

.s_box {
  float: left;
  margin: 0 0 0 0.28rem;
  border-radius: 0.08rem;
  width: 5.6rem;

  img {
    width: 100%;
    border-radius: 0.1rem;
    box-shadow: 0 0 0.08rem #efefef;
  }
  .s_imgbox {
    position: relative;
    .cover {
      position: absolute;
      width: 100%;
      height: 1rem;
      bottom: 0.02rem;
      left: 0;
      border-radius: 0 0 0.1rem 0.1rem;
      background-color: #00205b;
      opacity: 0.4;
    }

    .s_name {
      position: absolute;
      bottom: 0.56rem;
      left: 0;
      margin-left: 0.2rem;
      height: 0.34rem;
      line-height: 0.34rem;
      font-size: 0.28rem;
      font-weight: bold;
      font-family: Helvetica-Bold, Helvetica;
      color: #fff;
      text-shadow: 0px 2px 4px rgba(15, 35, 61, 0.14);
    }
    .s_tips {
      position: absolute;
      bottom: 0.22rem;
      left: 0;
      margin-left: 0.2rem;
      height: 0.22rem;
      line-height: 0.22rem;
      font-size: 0.2rem;
      font-family: PingFangSC-Regular, PingFang SC;
      color: rgba(208, 217, 224, 1);
    }
  }
}
.s_box_right {
  // margin-right: 0.82rem;
  margin-right: 0.28rem;
}
</style>
