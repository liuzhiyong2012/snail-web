<template>
  <div class="abus-height">
    <abus-title title="Shopping" backRouteName="home"></abus-title>
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item
          class="shopping-recomend-item"
          v-for="(item, index) in recomendList"
          :key="index"
        >
          <div class="shopping-recomend-img" :style="{backgroundImage:`url(${item.CoverImgUrl})`}"></div>
        </van-swipe-item>
      </van-swipe>
      <!-- <banner :bannerData="bannerData" /> -->
      <div v-if="isShowMenu" :class="[isActive? 'menu active': 'menu']">
        <van-icon class="wap-menu" name="wap-nav" size="24" />
      </div>
    </div>
    <div class="shopping-box">
      <van-tabs
        id="ibox"
        class="f1"
        color="rgba(0,0,0,0)"
        title-active-color="#2E2E2E"
        title-inactive-color="#B5B6B8"
        animated
        sticky
        @click="getGoodsList"
      >
        <van-tab
          v-for="(item,index) in options1"
          :title="item.category"
          :name="item.Id"
          :key="index"
        >
          <div class="filter">
            <div @click="clickShowFilter">
              Sort by：{{filterInfo}}
              <svg class="icon i-icon" aria-hidden="true">
                <use xlink:href="#icon-select_1" />
              </svg>
            </div>
            <!-- <div v-if="isNewest" @click="clickIsNewest">
              Sort by：Newest
              <svg class="icon i-icon" aria-hidden="true">
                <use xlink:href="#icon-select_1" />
              </svg>
            </div>-->
            <!-- <div v-else @click="clickIsNewest">
              Sort by：Oldest
              <svg class="icon i-icon" aria-hidden="true">
                <use xlink:href="#icon-select_1" />
              </svg>
            </div>-->
            <div  v-if="isFilter" @click="clickIsFilter">
              Filter
              <svg class="icon i-icon" aria-hidden="true">
                <use xlink:href="#icon-select_1" />
              </svg>
            </div>
            <div v-else @click="clickIsFilter">
              Filter
              <svg class="icon i-icon icon-up" aria-hidden="true">
                <use xlink:href="#icon-select_1" />
              </svg>
            </div>
            <div :class="[isShowFilter?'f-box active':'f-box']">
              <van-cell value="Price" @click="changeVal" />
              <van-cell value="CreatedAt" @click="changeVal" />
            </div>
          </div>

          <div class="goods-box">
            <div class="goods-item" v-for="(item,i) in options1[index].data" :key="i">
              <div class="goods" v-if="item.QTY != 0">
                <div class="goods-img" @click="stepToDetail(item)">
                  <img :src="item.SampleImgPath|addBaseUrl" :alt="item.Name" />
                </div>
                <div class="price">${{item.Price}}</div>
                <div class="name">{{item.Name}}</div>
                <div class="qty">
                  QTY {{item.QTY}}
                  <span class="buy" @click="stepToDetail(item)">Buy</span>
                </div>
              </div>
              <div class="goods" v-else>
                <div class="goods-img" @click="showToast">
                  <img :src="item.SampleImgPath|addBaseUrl" :alt="item.Name" />
                </div>
                <div class="price">${{item.Price}}</div>
                <div class="name">{{item.Name}}</div>
                <div class="qty">
                  缺货
                  <span class="buy" @click="showToast">Buy</span>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <!-- <van-tab disabled></van-tab> -->
      </van-tabs>
      <div class="nav-menu"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DishService from "../../service/shopping";
import ShoppingService from "../../service/shopping";
import AbusTitle from "../../components/AbusTitle.vue";
import UrlUtils from "../../utils/url-utils";
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
  private tapIndex: any = "1";
  private isActive: boolean = false;
  private isShowMenu: boolean = false;
  private isNewest: boolean = false;
  private isFilter: boolean = false;
  private isShowFilter: boolean = false;
  private filterInfo: string = "Price";
  private listDesc: string = "Desc";
  private listAsc: string = "Asc";

  private created() {
    this.getShoppingRecommendedList();
    this.getShoppingCategory();
    this.getShoppingList();
  }
  private mounted() {
    document.addEventListener("scroll", this.handleScroll);
    var object = document.getElementById("ibox");
  }
  private beforeDestroy() {
    document.removeEventListener("scroll", this.handleScroll);
  }
  private showToast(){
		this.$toast('暂时缺货')
	}
  private getShoppingCategory() {
    ShoppingService.getShoppingCategory().then((res: any) => {
      // console.log(res);
      // CreatedAt: 1550707757
      // Id: "1"
      // category: "珠宝首饰"
      if (res.code == 200) {
        this.options1 = res.data;
      }
    });
  }
  // 点击弹出筛选
  public clickShowFilter() {
    this.isShowFilter = !this.isShowFilter;
  }
  // 点击筛选
  public changeVal(e: any) {
    this.isShowFilter = false;
    this.filterInfo = e.target.innerText;
    this.getShoppingListFilter()
  }
  // public clickIsNewest() {
  //   this.isNewest = !this.isNewest;

  // }
  // 点击升降序
  public clickIsFilter() {
    this.isFilter = !this.isFilter;
    this.getShoppingListFilter()
  }

  // 首次获取
  private getShoppingList() {
    var data = { category: "1" };
    ShoppingService.getShoppingList(data).then((res: any) => {
      Vue.set(this.options1[0], "data", res.data.Dishes);
    });
  }
  // 点击Tap切换获取
  private getGoodsList(name: any, title: any) {
    // console.log(name)
    this.tapIndex = name;
    this.getShoppingListFilter()
  }
  // 获取筛选后列表
  public getShoppingListFilter(){
    var data = { 
      orderName: this.filterInfo,
      orderFlag: this.isFilter ? this.listDesc : this.listAsc,
      category: this.tapIndex,
     };
    
    ShoppingService.getShoppingList(data).then((res: any) => {
      Vue.set(this.options1[this.tapIndex - 1], "data", res.data.Dishes);
    });
  }
  // 点击跳转详情页
  private stepToDetail(item: any) {
    this.$router.push({
      name: "shoppingDetails",
      params: {
        shoppingInfo: item,
      },
    });
  }
  private getShoppingRecommendedList() {
    ShoppingService.getShoppingRecommendedList({}).then((res: any) => {
      if (res.code == 200) {
        // this.isShowMenu = true;
        this.recomendList = res.data.RecommendedShopping;
        this.recomendList.forEach((item: any, index: any) => {
          item.CoverImgUrl = UrlUtils.addBaseUrl(
            UrlUtils.delBaseUrl(item.BannerImgPath)
          );
        });
      }
      // console.log(res);
    });
  }

  private handleScroll() {
    let object: any = document.getElementById("ibox");
    let rectObject = object.getBoundingClientRect().top;
    if (rectObject <= 0) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
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
    // background-repeat: no-repeat;
    background-size: contain;
  }
}
.f1 {
  position: relative;
}
.menu {
  box-sizing: border-box;
  padding: 10px 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  width: 15%;
  height: 0.88rem;
  background-color: #fff;
  z-index: 9999;
  box-shadow: -0.2rem 0 0.2rem rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #1c1c1c;
  .wap-menu {
    font-size: 0.48rem !important;
  }
}
.menu.active {
  position: fixed;
  top: 0;
  right: 0;
}
.banner {
  position: relative;
  width: 100%;
  min-height: 2.5rem;
  background-color: #f2f4f7;
}
.shopping-box {
  width: 100%;
  .nav-menu {
    width: 1rem;
    height: 1rem;
  }
}

.van-tabs__wrap--scrollable .van-tabs__nav {
  padding-right: 1rem;
}
.filter {
  position: relative;
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  color: #333;
  box-sizing: border-box;
  height: 1rem;
  line-height: 0.4rem;
  .i-icon {
    width: 0.2rem;
    height: 0.2rem;
    padding: 0 0 0.05rem;
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) .3s;
  }
  .icon-up{
    transform: rotate(-180deg);
    padding:  0.05rem 0 0;
  }
  .f-box {
    display: none;
    position: absolute;
    left: 0;
    top: 1rem;
    width: 100%;
    &.active {
      display: block;
    }
  }
  .van-cell {
    padding: 0.2rem 0.3rem !important;
    font-size: 0.3rem !important;
    color: #666 !important;
  }
}
.goods-box {
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
        padding: 0 0.2rem;
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
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 0.7rem;
      }
      .qty {
        padding: 0 0.2rem 0.3rem 0.2rem;
        font-size: 0.24rem !important;
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
.filter-box {
  font-size: 0.26rem;
  font-weight: 400;
  color: rgba(46, 46, 46, 1);
  line-height: 0.8rem;
  position: relative;
  padding: 0 0.3rem;
  width: 100%;
  height: 0.8rem;
}
</style>