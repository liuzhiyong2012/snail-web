<template>
  <div class="abus-height">
    <div class="cell-group">
      <div class="header">
        <div class="title">Airspace Explorer AIB8888</div>
        <div class="status">processing</div>
      </div>
      <div class="main"></div>
      <div class="footer">
        <div class="time">213213123</div>
        <div class="money">1232131231</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.cell-group {
  background: #fff;
  box-shadow: 0 0 0.1rem #efefef;
  .header {
    display: flex;
    padding: 0.3rem;
    .title {
      flex: 1;
      font-size: 0.32rem;
      font-weight: bold;
      color: rgba(46, 46, 46, 1);
    }
    .status {
      padding: 0.07rem 0.16rem;
      border-radius: 0.05rem;
      background-color: #00205b;
      color: #fff;
    }
  }
  .main {
  }
  .footer {
    display: flex;
    padding: 0 0.3rem;
    line-height: 0.8rem;
    .time {
      font-size: 0.28rem;
      color: #999;
    }
    .money {
      flex: 1;
      text-align: right;
      font-size: 0.32rem;
      font-weight: bold;
      color: #383639;
    }
  }
}
</style>