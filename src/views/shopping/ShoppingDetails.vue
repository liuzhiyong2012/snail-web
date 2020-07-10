<template>
  <div>
    <van-nav-bar left-arrow>
      <template #right>
        <van-icon name="scan" size="18" />
      </template>
    </van-nav-bar>
    <div calss="shopping_details">
      <banner :bannerData="bannerData" />
    </div>
    <div class="m_box">
      <div class="title">Three Band Ouroboros Ring In Gold</div>
      <div class="info_box">
        <div class="qty">QTY 300</div>
        <div class="f1">$30</div>
        <div class="stepper_box">
          <i class="minus">-</i>
          <span class="f1">111111</span>
          <i class="plus">+</i>
        </div>
      </div>
    </div>
    <div class="details_box">
      <div class="top">Product Details</div>
      <div
        class="details"
      >Crafted from yellow gold with turquoise stone-set eyes, the ring features an ancient Egyptian symbol, the Ouroboros—a snake eating its own tail. In medieval alchemical tradition.</div>
    </div>
    <div class="button_box">
      <div class="button">Buy Now</div>
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
      bannerData: [
        {
          img: require("./images/shopping_details.jpg")
        },
        {
          img: require("./images/shopping_details.jpg")
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.shopping_details {
  width: 100%;
}
.m_box {
  margin: 0 0 0.2rem 0;
  padding: 0.1rem 0.3rem 0.4rem;
  background-color: #fff;

  .title {
    font-size: 0.45rem;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: rgba(46, 46, 46, 1);
    line-height: 0.6rem;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .info_box {
    display: flex;
    padding: 0.1rem 0 0 0;
    // height: 0.58rem;
    line-height: 0.58rem;
    .qty {
      font-size: 0.28rem;
      font-family: Helvetica;
      color: rgba(96, 116, 153, 1);
    }
    .f1 {
      flex: 1;
      text-align: right;
      font-size: 0.5rem;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: rgba(46, 46, 46, 1);
      line-height: 0.58rem;
    }
    .stepper_box {
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
        font-family: Helvetica;
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
  }
}
.details_box {
  margin: 0 0 0.2rem 0;
  padding: 0.3rem;
  background-color: #fff;
  .top {
    padding: 0 0 0.2rem 0;
    font-size: 0.28rem;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 0.26rem;
  }
  .details {
    font-size: 0.24rem;
    font-family: Helvetica;
    color: rgba(51, 51, 51, 1);
    line-height: 0.36rem;
  }
}
.button_box {
  margin: 0.4rem 0.3rem 0.5rem;
  .button {
    width: 100%;
    height: 0.8rem;
    background: rgba(0, 32, 91, 1);
    border-radius: 0.4rem;
    text-align: center;
    line-height: 0.8rem;
    color: #fff;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
  }
}
</style>