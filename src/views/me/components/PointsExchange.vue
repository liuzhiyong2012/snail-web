<template>
  <div class="abus-height">
    <abus-title title="Points exchange" backRootName="meIndex"></abus-title>
    <div class="goods-box">
      <div class="goods-item" v-for="(item,index) in shoppingList" :key="index">
        <div class="goods">
          <div class="goods-img">
            <img :src="item.SampleImgPath" :alt="item.Name" />
          </div>
          <div class="price">${{item.Price}}</div>
          <div class="name">{{item.Name}}</div>
          <div class="qty">
            QTY {{item.Stocking}}
            <span class="buy">
              Point
              <i class="point">3000</i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ShoppingService from "../../../service/shopping";
import AbusTitle from "../../../components/AbusTitle.vue";
// import Banner from "@/components/banner";
@Component({
  name: "Shopping",
  components: {
    AbusTitle,
  },
})
export default class ShoppingIndex extends Vue {
  private recomendList: Array<any> = [];
  private shoppingList: Array<any> = [];
  private options1: Array<any> = [];

  private created() {
    // this.getShoppingRecommendedList();
    this.getShoppingList();
    this.options1 = [
      { text: "Jewellery", value: 1 },
      { text: "Jewellery", value: 1 },
      { text: "Jewellery", value: 1 },
    ];
  }

  // BannerImgPath: "http://172.16.125.11:8081/133b9f0b-dfa4-4cd9-8ebb-958c44bfbf26"
  // Id: "e2dc9e2c-6733-e911-b13c-96af276fddb7"
  // Name: "素食拼盘"
  // Price: 32
  // Remark: null
  // SampleImgPath: "http://172.16.125.11:8081/eb8ea336-9434-4295-8215-3821c76baba8"
  // Status: 0
  // Stocking: 0
  // category: "食物"

  private getShoppingList() {
    ShoppingService.getShoppingList({}).then((res: any) => {
      console.log(res);
      this.shoppingList = res.data.Dishes;

      this.shoppingList.forEach((item, index) => {
        item.GoodsImgPath =
          "http://172.16.125.11:8010/7873f0d1-ac22-e911-bd22-c4209d3e3b89";
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.goods-box {
  margin: 0.3rem 0 0 0;
  display: flex;
  flex-wrap: wrap;
  .goods-item {
    box-sizing: border-box;
    width: 50%;
    padding: 0 0.13rem 0.3rem 0.3rem;
    .goods {
      width: 100%;
      background: #fff;
      border-radius: 0.08rem;
      box-shadow: 0 0 0.1rem #efefef;
      overflow: hidden;
      .goods-img {
        display: flex;
        height: 3.5rem;
        align-items: center;
        background-color: #fafafa;
        overflow: hidden;
        img {
          width: 100%;
        }
      }

      .price {
        padding: 0.1rem 0.2rem 0;
        font-size: 0.36rem;
        color: #001f5b;
        font-weight: bold;
      }
      .name {
        padding: 0.14rem 0.2rem;
        color: #000;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        height: 0.4rem;
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
          //   width: 1.2rem;
          height: 0.5rem;
          border-radius: 0.25rem;
          text-align: center;
          line-height: 0.5rem;
          color: #999;
          .point {
            margin: 0 0 0 0.1rem;
            font-size: 0.36rem;
            font-weight: bold;
            color: rgba(0, 31, 91, 1);
          }
        }
      }
    }
  }
  :nth-child(even) {
    padding: 0 0.3rem 0.3rem 0.13rem;
  }
}
</style>