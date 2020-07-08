<template>
  <div>
    <h2 class="abus_block_title">
      <van-cell title="Dish" class="block_title_background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>
    <div class="abus_scroller_box">
      <scroller>
        <div slot="list" v-for="(item, index) of dishData" :key="index">
          <div class="s_box s_box_right" v-if="index+1 == dishData.length">
            <img :src="item.img" :alt="item.name" />
            <div class="name">{{item.name}}</div>
            <div class="price">${{item.price}}</div>
          </div>
          <div class="s_box" v-else>
            <img :src="item.img" :alt="item.name" />
            <div class="name">{{item.name}}</div>
            <div class="price">${{item.price}}</div>
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
          img: require("./images/food.png"),
          name: "Pock rice",
          price: "10"
        },
        {
          img: require("./images/shopping.jpg"),
          name: "Pock rice",
          price: "14"
        },
        {
          img: require("./images/food.png"),
          name: "Pock ricePock ricePock rice",
          price: "10"
        },
        {
          img: require("./images/shopping.jpg"),
          name: "Pock rice",
          price: "14"
        },
        {
          img: require("./images/food.png"),
          name: "Pock rice",
          price: "10"
        },
        {
          img: require("./images/shopping.jpg"),
          name: "Pock rice",
          price: "14"
        },
        {
          img: require("./images/food.png"),
          name: "Pock rice",
          price: "10"
        },
        {
          img: require("./images/shopping.jpg"),
          name: "Pock rice",
          price: "14"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.block_title_background {
  background-color: #fafafa00;
}
.van-cell {
  font-size: 0.36rem;
}

.s_box {
  float: left;
  // height: 1.6rem;
  margin: 0 0 0 0.28rem;
  border-radius: 0.08rem;
  width: 1.6rem;
  img {
    width: 100%;
    border-radius: 0.1rem;
    box-shadow: 0 0 0.08rem #efefef;
  }
  .name {
    line-height: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    height: 0.5rem;
    color: rgb(51, 51, 51);
  }
  .price {
    color: rgb(0, 32, 91);
    font-size: 0.24rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.s_box_right {
  margin-right: 0.82rem;
}
</style>