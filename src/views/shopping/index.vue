<template>
  <div>
    <van-nav-bar title="Shopping" left-arrow>
      <template #right>
        <van-icon name="scan" size="18" />
      </template>
    </van-nav-bar>
    <div class="banner">
      <banner :bannerData="bannerData" />
      <div :class="[isActive? 'menu active': 'menu']">
        <van-icon name="wap-nav" size="24" />
      </div>
    </div>
    <div class="shopping_box">
      <van-tabs
        id="box"
        class="f1"
        v-model="active"
        color="rgba(0,0,0,0)"
        title-active-color="#2E2E2E"
        title-inactive-color="#B5B6B8"
        animated
        sticky
      >
        <van-tab v-for="(item,index) in option1" :title="item.text" :key="index">
          <van-sticky>
            <!-- <div class="filter_box">
              <div class></div>
            </div>-->
            <van-dropdown-menu>
              <van-dropdown-item v-model="value" :options="option" />
              <van-dropdown-item title="筛选" ref="item">
                <van-switch-cell v-model="switch1" title="包邮" />
                <van-switch-cell v-model="switch2" title="团购" />
                <van-button block type="info" @click="onConfirm">确认</van-button>
              </van-dropdown-item>
            </van-dropdown-menu>
          </van-sticky>
          <div class="goods_box">
            <div class="goods_item" v-for="(item,index) in goodsData" :key="index">
              <div class="goods">
                <img :src="item.img" :alt="item.name" />
                <div class="price">${{item.price}}</div>
                <div class="name">{{item.name}}</div>
                <div class="qty">
                  QTY {{item.qty}}
                  <span class="buy">Buy</span>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab disabled></van-tab>
      </van-tabs>
      <div class="nav_menu"></div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/banner";
export default {
  components: {
    Banner
  },
  data() {
    return {
      isActive: false,
      value1: 0,
      value2: "a",
      value: 0,
      switch1: false,
      switch2: false,
      option: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option1: [
        { text: "Handbags", value: 0 },
        { text: "Shoes", value: 1 },
        { text: "Jewellery", value: 1 },
        { text: "Sunglasses", value: 1 },
        { text: "Sunglasses", value: 1 }
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ],
      bannerData: [
        {
          img: require("./images/goods.jpg"),
          name: "goodsName",
          details: "goodsDetails"
        },
        {
          img: require("./images/goods.jpg"),
          name: "goodsName",
          details: "goodsDetails"
        },
        {
          img: require("./images/goods.jpg"),
          name: "goodsName",
          details: "goodsDetails"
        }
      ],
      goodsData: [
        {
          img: require("./images/goods_1.jpg"),
          name: "Vietnamese Summer Rolls",
          price: 20,
          qty: 30
        },
        {
          img: require("./images/goods_1.jpg"),
          name: "Vietnamese Summer Rolls",
          price: 20,
          qty: 30
        },
        {
          img: require("./images/goods_1.jpg"),
          name: "Vietnamese Summer Rolls",
          price: 20,
          qty: 30
        },
        {
          img: require("./images/goods_1.jpg"),
          name: "Vietnamese Summer Rolls",
          price: 20,
          qty: 30
        },
        {
          img: require("./images/goods_1.jpg"),
          name: "Vietnamese Summer Rolls",
          price: 20,
          qty: 30
        }
      ]
    };
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    var object = document.getElementById("box");
  },
  methods: {
    handleScroll() {
      var object = document.getElementById("box");
      var rectObject = object.getBoundingClientRect().top;
      if (rectObject <= 0) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.f1 {
  position: relative;
}
.menu {
  box-sizing: border-box;
  padding: 10px 0;
  position: absolute;
  right: 0;
  width: 13%;
  height: 44px;
  background-color: #fff;
  z-index: 9999;
  box-shadow: -0.2rem 0 0.2rem rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #1c1c1c;
}
.menu.active {
  position: fixed;
  top: 0;
  right: 0;
}
.banner {
  position: relative;
  width: 100%;
  // height: 2.5rem;
}
.shopping_box {
  // display: flex;
  width: 100%;
  .f1 {
    // flex: 1;
  }
  .nav_menu {
    width: 1rem;
    height: 1rem;
  }
}
.van-tabs--line .van-tabs__wrap {
  height: 44px;
  padding-right: 1rem;
}
.van-tabs__wrap--scrollable .van-tabs__nav {
  padding-right: 1rem;
}
.goods_box {
  display: flex;
  flex-wrap: wrap;
  .goods_item {
    box-sizing: border-box;
    width: 50%;
    padding: 0 0.13rem 0.3rem 0.3rem;
    .goods {
      width: 100%;
      background: #fff;
      border-radius: 0.08rem;
      box-shadow: 0 0 0.1rem #efefef;
      img {
        width: 100%;
      }
      .price {
        padding: 0 0.2rem;
        font-size: 0.36rem;
        color: #001f5b;
        font-weight: bold;
      }
      .name {
        padding: 0.14rem 0.2rem;
        font-family: Helvetica;
        color: #000;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 0.7rem;
      }
      .qty {
        padding: 0 0.2rem 0.3rem 0.2rem;
        font-size: 12px;
        color: #999;
        position: relative;
        .buy {
          position: absolute;
          right: 0.2rem;
          bottom: 0.2rem;
          width: 1.2rem;
          height: 0.5rem;
          background: rgba(0, 31, 91, 1);
          border-radius: 0.25rem;
          text-align: center;
          line-height: 0.5rem;
          color: #fff;
        }
      }
    }
  }
  :nth-child(even) {
    padding: 0 0.3rem 0.3rem 0.13rem;
  }
}
.filter_box {
  font-size: 0.26rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(46, 46, 46, 1);
  line-height: 0.8rem;
  position: relative;
  padding: 0 0.3rem;
  width: 100%;
  height: 0.8rem;
}
</style>