<template>
  <div class="shopping-cart">
    <abus-title title="Shopping Cart" backRootName="shopping">
      <!-- <cart-icon></cart-icon> -->
    </abus-title>
    <van-notice-bar
      @click="stepToPage('address')"
      color="#2E2E2E"
      background="#E5E8EE"
      left-icon="location"
      mode="link"
    >{{this.address || '暂无地址'}}</van-notice-bar>
    <van-swipe-cell v-for="(item,index) in cartList" :key="index">
      <van-card :title="item.Name" :thumb="item.BannerImgPath" class="goods-card" />
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
      <div class="price">${{item.Price}}</div>
      <van-field class="field-ctn" name="stepper" label>
        <template #input>
          <van-stepper v-model="item.orderNumber" @change="chengeStepper" />
        </template>
      </van-field>
    </van-swipe-cell>

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
      <div class="cell">
        <div class="cell-r t-bold">Total amount ${{orderAmount}}</div>
      </div>
    </div>
    <div class="button-box">
      <div class="button" @click="postShoppingPlaceOrder">Pay</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import AbusTitle from "../../components/AbusTitle.vue";
import MeServer from "../../service/me";
import ShoppingServer from "../../service/shopping";
@Component({
  name: "ShoppingCart",
  components: {
    AbusTitle,
  },
})
export default class ShoppingCart extends Vue {
  private address: string = "";
  private orderAmount: number = 0;

  private created() {
    this.postAddress();
  }
  private mounted() {
    this.chengeStepper();
  }
  private get payType(): number {
    return this.$store.state.me.payType;
  }
  private get cartList(): number {
    return this.$store.state.shopping.cartList;
  }
  // private get orderAmount():number{
  //    let cartList = this.$store.state.shopping.cartList;
  //    let amount = 0;

  //    cartList.forEach((item:any,index:any)=>{
  // 	   amount = amount + item.Price * item.orderNumber;
  //    });

  //    return amount;
  // }
  public chengeStepper() {
    let cartList = this.$store.state.shopping.cartList;
    let amount = 0;

    cartList.forEach((item: any, index: any) => {
      amount = amount + item.Price * item.orderNumber;
    });
    return (this.orderAmount = amount);
  }
  public postAddress() {
    // let header = {
    //   Authorization: window.localStorage.getItem('token')
    // }
    MeServer.postAddress().then((res: any) => {
      if (res.code == 200) {
        this.address = res.data.Address;
      }
    });
  }
  // 下单$requset = $this->selectParam(['Seat','Remark','Items','type'=>1,'address']);
  public postShoppingPlaceOrder() {
    let CartItems: Array<any> = [];
    let cartList = this.$store.state.shopping.cartList;
    cartList.forEach((item: any, index: any) => {
      var items: Object = {
        Id: cartList[index].Id,
        Quantity: cartList[index].orderNumber,
      };
      CartItems.push(items);
    });
    if (this.address != "") {
      let data = {
        Seat: "B36",
        Remark: "",
        Items: CartItems,
        type: 1,
        Address: this.address,
      };
      ShoppingServer.postShoppingPlaceOrder(data).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          this.$store.commit("clearShoppingCart");
          this.$toast("SUCCESS!");
          this.stepToPage("shopping");
        }
      });
    }
  }
  private stepToPage(name: string) {
    this.$router.push({
      name: name,
    });
  }
}
</script>

<style lang="scss" scoped>
.shopping-cart {
  min-height: 100vh;
}
.field-ctn {
  position: absolute;
  right: 0;
  bottom: 0;
}
.cell-group-two {
  margin: 0.3rem 0 0 0;
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
.goods-card {
  margin: 0 0 1px 0;
  padding: 0.3rem;
  background-color: #fff;
  font-size: 0.36rem;
  .van-card-thumb {
    margin-right: 0.3rem;
    width: 1.8rem;
    height: 1.8rem;
  }
  .van-card-title {
    max-height: none;
    font-size: 0.36rem;
    color: rgba(51, 51, 51, 1);
    line-height: 0.43rem;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.price {
  position: absolute;
  left: 2.4rem;
  bottom: 0.3rem;
  font-size: 0.42rem;
  font-weight: bold;
  color: rgba(46, 46, 46, 1);
  line-height: 0.42rem;
  .before {
    text-decoration: line-through;
    font-size: 0.24rem;
    color: rgba(51, 51, 51, 1);
    line-height: 0.29rem;
  }
}
.delete-button {
  height: 100%;
}
.test {
  position: absolute;
  right: 0;
  top: 0;
  width: 1rem;
  height: 1rem;
  background-color: red;
}
.cell-group {
  margin: 0.3rem;
  .cell {
    margin: 0 0 0.3rem 0;
    display: flex;
    font-size: 0.3rem;
    color: rgba(155, 154, 170, 1);
    line-height: 0.36rem;
    .cell-l {
    }
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
.total-amount {
  font-size: 0.35rem;
  font-weight: bold;
  color: rgba(46, 46, 46, 1);
  line-height: 0.2rems;
}
.van-cell {
  width: auto;
  // background-color: #ebedf056;
  ::after {
    border: none;
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
  }
}
.discount {
  text-decoration: line-through;
}
</style>