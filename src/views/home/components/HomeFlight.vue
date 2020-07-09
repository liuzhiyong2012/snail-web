<template>
  <div>
    <h2 class="abus_block_title">
      <van-cell value="Flight" class="block_title_background" />
    </h2>
    <div class="abus_scroller_box home_flight_box">
      <div class="home_flight_t">Visian Airlines VA3928</div>
      <div class="home_flight_info">
        <span class="home_flight_seat">
          Seat No: C30
          <i class="home_flight_g">G</i>
        </span>
        <span class="home_flight_c">26°C</span>
      </div>
      <div class="home_flight_place">
        <div class="place_l">
          From 12312312312
          <div class="initial">Shenzhen</div>
        </div>
        <div class="f1"></div>
        <div class="place_r">
          To 12323
          <div class="destination">Beijing</div>
        </div>
      </div>
      <div class="map_box">
        <img src="../images/map.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.block_title_background {
  background-color: #fafafa00;
}
.van-cell {
  font-size: 0.36rem;
}
.home_flight_box {
  padding: 0.08rem 0.28rem 0.28rem;
  margin: 0 0.28rem;
  background-color: #fff;
  border-radius: 0.1rem;
}
.home_flight_t {
  font-size: 0.44rem;
  color: rgb(51, 51, 51);
  font-weight: bold;
  line-height: 0.76rem;
}
.home_flight_info {
  width: 100%;
  height: 0.6rem;
  font-size: 0.2rem;
}
.home_flight_seat {
  padding: 0.06rem 0.08rem 0.06rem 0.2rem;
  line-height: 0.32rem;
  font-size: 0.2rem;
  color: #fff;
  background-color: rgb(0, 32, 91);
  border-radius: 0.2rem;
}
.home_flight_g {
  padding: 0.025rem 0.06rem;
  line-height: 0.32rem;
  background-color: #fff;
  color: rgb(0, 32, 91);
  border-radius: 50%;
  margin-left: 0.1rem;
  box-shadow: 0 0 0.01rem #efefef;
}
.home_flight_c {
  padding: 0.06rem 0.2rem;
  line-height: 0.32rem;
  font-size: 0.2rem;
  color: #fff;
  background-color: rgb(0, 174, 199);
  border-radius: 0.2rem;
  margin: 0 0 0 0.16rem;
}
.home_flight_place {
  display: flex;
  align-items: baseline;
  margin-top: 0.2rem;
  height: 1.1rem;
}
.place_l {
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
.place_r {
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
.map_box {
  // padding: 0 14px 10px;
  img {
    width: 100%;
    height: 1.6rem;
    display: block;
  }
}
</style>