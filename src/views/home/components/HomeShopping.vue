<template>
  <div class="abus-scroller-box">
    <scroller>
      <div slot="list" v-for="(item, index) of shoppingList" :key="index">
        <div class="s-box s-box-right" v-if="index+1 == shoppingList.length">
          <div class="img-box">
            <img :src="item.SampleImgPath" :alt="item.Name" />
          </div>
          <div class="name">{{item.Name}}</div>
          <div class="price">
            ${{item.Price}}
            <span>${{item.Price+2}}</span>
          </div>
        </div>
        <div class="s-box" v-else>
          <div class="img-box">
            <img :src="item.SampleImgPath" :alt="item.Name" />
          </div>
          <div class="name">{{item.Name}}</div>
          <div class="price">
            ${{item.Price}}
            <span>${{item.Price+2}}</span>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import Vue from "vue";
import Scroller from "@nutui/nutui/dist/packages/scroller/scroller.js"; // 加载构建后的JS
import "@nutui/nutui/dist/packages/scroller/scroller.css";
import ShoppingService from "../../../service/shopping";
Scroller.install(Vue);
export default {
  components: {
    Scroller
  },
  data() {
    return {
      shoppingList: [],
      dishData: [
        {
          img: require("../images/food.png"),
          name: "Pock rice",
          price: "10",
          oldPrice: "23"
        },
        {
          img: require("../images/shopping.jpg"),
          name: "Pock rice",
          price: "14",
          oldPrice: "10000"
        },
        {
          img: require("../images/food.png"),
          name: "Pock ricePock ricePock rice",
          price: "10",
          oldPrice: "23"
        },
        {
          img: require("../images/shopping.jpg"),
          name: "Pock rice",
          price: "14",
          oldPrice: "23"
        },
        {
          img: require("../images/food.png"),
          name: "Pock rice",
          price: "10",
          oldPrice: "23"
        },
        {
          img: require("../images/shopping.jpg"),
          name: "Pock rice",
          price: "14",
          oldPrice: "23"
        },
        {
          img: require("../images/food.png"),
          name: "Pock rice",
          price: "10",
          oldPrice: "23"
        },
        {
          img: require("../images/shopping.jpg"),
          name: "Pock rice",
          price: "14",
          oldPrice: "23"
        }
      ]
    };
  },
  created() {
    this.getShoppingList();
  },
  methods: {
    getShoppingList() {
      ShoppingService.getShoppingList({}).then(res => {
        // console.log(res);
        this.shoppingList = res.data.Dishes;

        this.shoppingList.forEach((item, index) => {
          item.GoodsImgPath = "http://172.16.125.11:8010/dcf.png";
        });
        //       BannerImgPath: "http://172.16.125.11:8010/133b9f0b-dfa4-4cd9-8ebb-958c44bfbf26"
        // GoodsImgPath: "http://172.16.125.11:8010/dcf.png"
        // Id: "e2dc9e2c-6733-e911-b13c-96af276fddb7"
        // Name: "素食拼盘"
        // Price: 32
        // Remark: null
        // SampleImgPath: "http://172.16.125.11:8010/eb8ea336-9434-4295-8215-3821c76baba8"
        // Status: 0
        // Stocking: 0
        // category: "食物"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.s-box {
  float: left;
  // height: 1.6rem;
  margin: 0 0 0 0.28rem;
  border-radius: 0.08rem;
  width: 1.6rem;

  .img-box {
    display: flex;
    align-items: center;
    width: 1.6rem;
    height: 1.6rem;
    text-align: center;
    box-shadow: 0 0 0.08rem #efefef;
    img {
      width: 100%;
      border-radius: 0.1rem;
    }
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
    color: rgb(228, 0, 43);
    font-size: 0.24rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span {
      // display: inline-block;
      margin-left: 0.1rem;
      color: #ccc;
      text-decoration: line-through;
      font-size: 0.19rem;
      font-weight: normal;
    }
  }
}
.s-box-right {
  margin-right: 0.82rem;
}
</style>