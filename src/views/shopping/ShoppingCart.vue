<template>
  <div class="shopping-cart">
    <van-notice-bar
      color="#2E2E2E"
      background="#E5E8EE"
      left-icon="location"
      mode="link"
    >116 Meihua Hutong, Qianjiang City, Hubei Province</van-notice-bar>
    <van-swipe-cell>
      <van-card
        title="Three Band Ouroboros Ring In Gold"
        class="goods-card"
        thumb="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
      <div class="price">$1232</div>
      <div class="stepper-box">
        <i class="minus">-</i>
        <span class="f1">111111</span>
        <i class="plus">+</i>
      </div>
    </van-swipe-cell>
    <van-swipe-cell>
      <van-card
        title="Three Band Ouroboros Ring In Gold"
        class="goods-card"
        thumb="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
      <div class="price">
        $1232
        <span class="before">$2323</span>
      </div>
      <div class="stepper-box">
        <i class="minus">-</i>
        <span class="f1">111111</span>
        <i class="plus">+</i>
      </div>
    </van-swipe-cell>
    <!-- <van-cell-group>
      <van-cell title="Subtotal" value="$ 3300" />
      <van-cell value-class="discount" title="Discount" value="$ 10" />
      <van-cell
        title-class="total-amount"
        value-class="total-amount"
        border="false"
        title="Total amount"
        value="$ 3300"
      />
    </van-cell-group>-->
    <div class="cell-group">
      <div class="cell">
        <div class="cell-l">12323123</div>
        <div class="cell-r">$12332</div>
      </div>
      <div class="cell">
        <div class="cell-l">12323123</div>
        <div class="cell-r">$12332</div>
      </div>
      <div class="cell">
        <div class="cell-l t-bold">12323123</div>
        <div class="cell-r t-bold">$12332</div>
      </div>
    </div>
    <div class="button-box">
      <div class="button">Pay</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.shopping-cart{
  min-height: 100vh;
}
.goods-card {
  margin: 0 0 1px 0;
  padding: 0.3rem;
  background-color: #fff;

  .van-card-thumb {
    margin-right: 0.3rem;
    width: 1.8rem;
    height: 1.8rem;
  }
  .van-card-title {
    max-height: none;
    font-size: 0.36rem;
    font-family: Helvetica;
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
  font-family: Helvetica-Bold, Helvetica;
  font-weight: bold;
  color: rgba(46, 46, 46, 1);
  line-height: 0.42rem;
  .before {
    text-decoration: line-through;
    font-size: 0.24rem;
    font-family: Helvetica;
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
    font-family: Helvetica;
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
      font-family: Helvetica-Bold, Helvetica;
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
.total-amount {
  font-size: 0.35rem;
  font-family: Helvetica-Bold, Helvetica;
  font-weight: bold;
  color: rgba(46, 46, 46, 1);
  line-height: 0.2rems;
}
.van-cell {
  background-color: #ebedf056;
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
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
  }
}
.discount {
  text-decoration: line-through;
}
</style>