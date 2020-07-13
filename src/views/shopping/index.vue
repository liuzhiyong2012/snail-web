<template>
  <div>
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item
          class="shopping-recomend-item"
          v-for="(item, index) in recomendList"
          :key="index"
        >
          <div
            class="shopping-recomend-img"
            :style="{backgroundImage:`url(${item.BannerImgPath})`}"
          ></div>
        </van-swipe-item>
      </van-swipe>
      <!-- <banner :bannerData="bannerData" /> -->
      <!-- <div :class="[isActive? 'menu active': 'menu']">
        <van-icon name="wap-nav" size="24" />
      </div>-->
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
        <van-tab v-for="(item,index) in options1" :title="item.text" :key="index">
          <div class="goods_box">
            <div class="goods_item" v-for="(item,index) in shoppingList" :key="index">
              <div class="goods">
                <img :src="item.GoodsImgPath" :alt="item.Name" />
                <div class="price">${{item.Price}}</div>
                <div class="name">{{item.Name}}</div>
                <div class="qty">
                  QTY {{item.qty}}
                  <span class="buy">Buy</span>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <!-- <van-tab disabled></van-tab> -->
      </van-tabs>
      <div class="nav_menu"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DishService from "../../service/shopping";
import ShoppingService from "../../service/shopping";
// import Banner from "@/components/banner";
@Component({
  name: "Shopping",
  components: {}
})
export default class ShoppingIndex extends Vue {
  private recomendList: Array<any> = [];
  private shoppingList: Array<any> = [];
  private options1: Array<any> = [];

  private created() {
    this.getShoppingRecommendedList();
    this.getShoppingList();
    this.options1 = [
      { text: "Jewellery", value: 1 },
      { text: "Jewellery", value: 1 },
      { text: "Jewellery", value: 1 }
    ];
  }

  private getShoppingRecommendedList() {
    ShoppingService.getShoppingRecommendedList({}).then((res: any) => {
      this.recomendList = res.RecommendedShopping;

      this.recomendList.forEach((item, index) => {
        item.BannerImgPath = "http://172.16.125.11:8010/50.jpg";
      });
    });
  }

  private getShoppingList() {
    ShoppingService.getShoppingList({}).then((res: any) => {
      this.shoppingList = res.Dishes;

      this.shoppingList.forEach((item, index) => {
        item.GoodsImgPath = "http://172.16.125.11:8010/50.jpg";
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.shopping-recomend-item {
  position: relative;
  width: 100%;
  height: 2.5rem;
  .shopping-recomend-img {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
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
}
.shopping_box {
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
  margin: 0.3rem 0 0 0;
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