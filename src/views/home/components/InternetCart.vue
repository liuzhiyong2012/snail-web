<template>
  <div class="internet-cart">
<abus-title title="Internet Cart" backRootName="internet"></abus-title>
    <div class="cart">
      <div class="name-bg" v-if="this.$store.state.home.internetData.DisplayOrder == 1">ALL DAY</div>
      <div class="name-bg text-two" v-if="this.$store.state.home.internetData.DisplayOrder == 2">1 G</div>
      <div class="name-bg text-two" v-if="this.$store.state.home.internetData.DisplayOrder == 3">50 M</div>
      <div class="f1">
        <div class="name">{{this.$store.state.home.internetData.Name}}</div>
        <div class="price">${{this.$store.state.home.internetData.Price}}</div>
      </div>
      <div class="stepper-box">
        <i class="minus">-</i>
        <span class="f2">1</span>
        <i class="plus">+</i>
      </div>
    </div>
    <div class="cell-group-two">
      <div class="cell-item" @click="stepToPage('payment')">
          <div class="title">Payment method</div>
          <div class="f1">
            <svg class="icon icon-right-1" aria-hidden="true">
              <use v-if="payType == '1'" xlink:href="#icon-wechat-pay" />
						<use v-if="payType == '2'" xlink:href="#icon-ali-pay" />
						<use v-if="payType == '3'" xlink:href="#icon-credit-card" />
						<use v-if="payType == '4'" xlink:href="#icon-cash" />
            </svg>
            
            <svg class="icon icon-right" aria-hidden="true">
              <use xlink:href="#icon-youjiantou_1" />
            </svg>
          </div>
        </div>
    </div>
    <div class="cell-group">
      <!-- <div class="cell">
        <div class="cell-l">12323123</div>
        <div class="cell-r">$12332</div>
      </div>
      <div class="cell">
        <div class="cell-l">12323123</div>
        <div class="cell-r">$12332</div>
      </div> -->
      
      <div class="cell">
        <!-- <div class="cell-l t-bold">12323123</div> -->
        <div class="cell-r t-bold">Total amount ${{internetData.Price}}</div>
      </div>
    </div>
    <div class="button-box">
      <div class="button" @click="goHome">Pay</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import HomeMap from './HomeMap.vue';
// import AbusMap from '../../../components/AbusMap.vue';
import NetflowService from '../../../service/netflow';
import AbusTitle from "../../../components/AbusTitle.vue";
@Component({
  name: 'InternetCart',
  components:{
    AbusTitle
  }
})
export default class InternetCart extends Vue {
  private internetData: any = ''
  created() {
    // this.postNetFlowList()
    // this.internetData = this.$route.params.key
    // console.log(this.$route.params.key)
    
  }
  private get payType():number{
		return this.$store.state.me.payType;
	}
  stepToPage(pageType: any) {
    let routeMap: any = {
      exchange: "pointsExchange",
      address: "address",
      payment: "payment",
      myorder: "myOrder",
      lang: "lang",
      thirdaccount: "thirdAccount",
    };
    if (routeMap[pageType]) {
      this.$router.push({
        name: routeMap[pageType],
      });
    }
  }
  goHome() {
      this.$toast("Success");
      setTimeout(() => {
        this.$router.push({
          name: "home"
        });
      }, 1000);
    }
    postNetFlowList(){
      NetflowService.postNetFlowList().then((res: any) => {
        console.log(res)
      })
    }
};
</script>

<style lang="scss" scoped>
.internet-cart {
  min-height: 100vh;
  .cart {
    position: relative;
    display: flex;
    padding: 0.3rem;
    background-color: #fff;
    .name-bg {
      margin: 0 0.3rem 0 0;
      padding: 0.15rem;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background-color: #00205b;
      color: #fff;
      text-align: center;
      line-height: 0.4rem;
      &.text-two{
        font-size: .4rem;
        line-height: .8rem;
      }
    }
    .f1 {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      
      .name {
        flex: 1;
        font-size: 0.36rem;
        color: rgba(51, 51, 51, 1);
        line-height: 0.55rem;
      }
      .price {
        flex: 1;
        font-size: 0.42rem;
        color: rgba(51, 51, 51, 1);
        font-weight: bold;
        line-height: 0.55rem;
      }
    }
    .f2{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      align-items: center;
    }
  }
}
.cell-group {
  margin: 0.3rem;
  .cell {
    margin: 0 0 0.3rem 0;
    display: flex;
    font-size: 0.3rem;
    color: rgba(155, 154, 170, 1);
    line-height: 0.36rem;

    .cell-r {
      flex: 1;
      text-align: right;
    }
    .t-bold {
      font-size: 0.35rem;
      font-weight: bold;
      color: rgba(46, 46, 46, 1);
      line-height: 0.42rem;
    }
  }
  
}
.cell-group-two{
  margin: .3rem 0 0 0;
  background: #fff;
  .cell-item {
    display: flex;
    padding: 0 0.3rem;
    line-height: 1rem;
    .title {
      font-size: 0.32rem;
      color: rgba(51, 51, 51, 1);
    }
    .f1 {
      position: relative;
      flex: 1;
      .icon-right {
        position: absolute;
        right: -0.3rem;
        padding: 0.3rem;
      }
      .icon-right-1 {
        position: absolute;
        right: 0.1rem;
        padding: 0.3rem;
      }
      .icon-right-2 {
        position: absolute;
        right: 0.3rem;
        color: #999;
        max-width: 2.2rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
.stepper-box {
  position: absolute;
  right: 0.3rem;
  bottom: 0.3rem;
  display: flex;
  margin: 0 0 0 0.25rem;
  background-color: #f2f4f7;
  border-radius: 0.08rem;
  min-width: 1.75rem;
  height: 0.58rem;
  .minus {
    width: 0.58rem;
    height: 0.58rem;
    text-align: center;
    line-height: 0.5rem;
    color: rgba(0, 32, 91, 1);
    font-size: 0.4rem;
    line-height: 0.5rem;
  }
  .f1 {
    flex: 1;
    font-size: 0.28rem;
    color: rgba(51, 51, 51, 1);
    line-height: 0.58rem;
  }
  .plus {
    width: 0.58rem;
    height: 0.58rem;
    text-align: center;
    line-height: 0.58rem;
    color: rgba(0, 32, 91, 1);
    font-size: 0.4rem;
  }
}
.button-box {
  margin: 0.4rem 0.3rem 0.5rem;
  .button {
    width: 100%;
    height: 0.8rem;
    background: rgba(0, 32, 91, 1);
    border-radius: 0.4rem;
    text-align: center;
    line-height: 0.8rem;
    color: #fff;
    font-weight: bold;
    font-size: 0.32rem;
  }
}
</style>