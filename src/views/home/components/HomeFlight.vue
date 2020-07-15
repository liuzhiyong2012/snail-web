<template>
  <div>
    <h2 class="abus-block-title">
      <van-cell value="Flight" class="block-title-background" />
    </h2>
    <div class="abus-scroller-box home-flight-box">
      <div class="home-flight-t">Visian Airlines VA3928</div>
      <div class="home-flight-info">
        <span class="home-flight-seat">
          Seat No: C30
          <i class="home-flight-g">G</i>
        </span>
        <span class="home-flight-c">26°C</span>
      </div>
      <div class="home-flight-place">
        <div class="place-l">
          From 12312312312
          <div class="initial">Shenzhen</div>
        </div>
        <div class="f1"></div>
        <div class="place-r">
          To 12323
          <div class="destination">Beijing</div>
        </div>
      </div>
      <div class="map-box">
        <img src="../images/map.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.block-title-background {
  background-color: #fafafa00;
}
.van-cell {
  font-size: 0.36rem;
}
.home-flight-box {
  padding: 0.08rem 0.28rem 0.28rem;
  margin: 0 0.28rem;
  background-color: #fff;
  border-radius: 0.1rem;
}
.home-flight-t {
  font-size: 0.44rem;
  color: rgb(51, 51, 51);
  font-weight: bold;
  line-height: 0.76rem;
}
.home-flight-info {
  width: 100%;
  height: 0.6rem;
  font-size: 0.2rem;
  .home-flight-seat {
    padding: 0.06rem 0.08rem 0.06rem 0.2rem;
    line-height: 0.32rem;
    font-size: 0.2rem;
    color: #fff;
    background-color: rgb(0, 32, 91);
    border-radius: 0.2rem;
  }
  .home-flight-g {
    padding: 0.025rem 0.06rem;
    line-height: 0.32rem;
    background-color: #fff;
    color: rgb(0, 32, 91);
    border-radius: 50%;
    margin-left: 0.1rem;
    box-shadow: 0 0 0.01rem #efefef;
  }
  .home-flight-c {
    padding: 0.06rem 0.2rem;
    line-height: 0.32rem;
    font-size: 0.2rem;
    color: #fff;
    background-color: rgb(0, 174, 199);
    border-radius: 0.2rem;
    margin: 0 0 0 0.16rem;
  }
}

.home-flight-place {
  display: flex;
  align-items: baseline;
  margin-top: 0.2rem;
  height: 1.1rem;
  .place-l {
    position: relative;
    font-size: 0.24rem;
    margin-right: 0.1rem;
    color: rgb(0, 32, 91);
    .initial {
      position: absolute;
      left: 0;
      top: 0.4rem;
      font-size: 0.32rem;
      font-weight: bold;
    }
  }
  .place-r {
    position: relative;
    font-size: 0.24rem;
    margin-left: 0.1rem;
    margin-right: 1rem;
    color: rgb(0, 32, 91);
    .destination {
      position: absolute;
      left: 0;
      top: 0.4rem;
      font-size: 0.32rem;
      font-weight: bold;
    }
  }
  .f1 {
    height: 0.08rem;
    flex: 1;
    border-top: 0.02rem dotted rgb(0, 32, 91);
  }
}

.map-box {
  // padding: 0 14px 10px;
  img {
    width: 100%;
    height: 1.6rem;
    display: block;
  }
}
</style>