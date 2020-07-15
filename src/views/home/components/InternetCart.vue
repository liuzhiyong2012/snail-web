<template>
  <div class="internet_cart">
    <div class="cart">
      <div class="name_bg">ALL DAY</div>
      <div class="f1">
        <div class="name">123213</div>
        <div class="price">$123123</div>
      </div>
      <div class="stepper_box">
        <i class="minus">-</i>
        <span class="f1">111111</span>
        <i class="plus">+</i>
      </div>
    </div>
    <div class="cell_group">
      <div class="cell">
        <div class="cell_l">12323123</div>
        <div class="cell_r">$12332</div>
      </div>
      <div class="cell">
        <div class="cell_l">12323123</div>
        <div class="cell_r">$12332</div>
      </div>
      <div class="cell">
        <div class="cell_l t_bold">12323123</div>
        <div class="cell_r t_bold">$12332</div>
      </div>
    </div>
    <div class="button_box">
      <div class="button">Pay</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.internet_cart {
  min-height: 100vh;
  .cart {
    position: relative;
    display: flex;
    padding: 0.3rem;
    background-color: #fff;
    .name_bg {
      margin: 0 0.3rem 0 0;
      padding: 0.15rem;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background-color: #00205b;
      color: #fff;
      text-align: center;
      line-height: 0.4rem;
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
        font-family: Helvetica;
        color: rgba(51, 51, 51, 1);
        line-height: 0.55rem;
      }
      .price {
        flex: 1;
        font-size: 0.42rem;
        font-family: Helvetica;
        color: rgba(51, 51, 51, 1);
        font-weight: bold;
        line-height: 0.55rem;
      }
    }
  }
}
.cell_group {
  margin: 0.3rem;
  .cell {
    margin: 0 0 0.3rem 0;
    display: flex;
    font-size: 0.3rem;
    font-family: Helvetica;
    color: rgba(155, 154, 170, 1);
    line-height: 0.36rem;
    .cell_l {
    }
    .cell_r {
      flex: 1;
      text-align: right;
    }
    .t_bold {
      font-size: 0.35rem;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: rgba(46, 46, 46, 1);
      line-height: 0.42rem;
    }
  }
}
.stepper_box {
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
    font-size: 0.32rem;
  }
}
</style>