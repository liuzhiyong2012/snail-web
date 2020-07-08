<template>
  <div>
    <h2 class="abus_block_title">
      <van-cell value="Flight" class="block_title_background" />
    </h2>
    <div class="home_flight_box">
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
      <div class="map-box">
        <img src="./images/map.jpg" alt />
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
  font-size: 18px;
}
.home_flight_box {
  padding: 4px 14px 14px;
  margin: 0 14px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #efefef;
}
.home_flight_t {
  font-size: 22px;
  color: rgb(51, 51, 51);
  font-weight: bold;
  line-height: 38px;
}
.home_flight_info {
  width: 100%;
  height: 30px;
  font-size: 10px;
}
.home_flight_seat {
  padding: 3px 4px 3px 10px;
  line-height: 16px;
  font-size: 10px;
  color: #fff;
  background-color: rgb(0, 32, 91);
  border-radius: 10px;
}
.home_flight_g {
  padding: 1px 3px;
  line-height: 16px;
  border-radius: 4px;
  background-color: #fff;
  color: rgb(0, 32, 91);
  border-radius: 10px;
  margin-left: 5px;
}
.home_flight_c {
  padding: 3px 10px;
  line-height: 16px;
  font-size: 10px;
  color: #fff;
  background-color: rgb(0, 174, 199);
  border-radius: 10px;
  margin: 0 0 0 8px;
}
.home_flight_place {
  display: flex;
  align-items: baseline;
  margin-top: 10px;
  height: 55px;
}
.place_l {
  position: relative;
  font-size: 12px;
  margin-right: 5px;
  color: rgb(0, 32, 91);
  .initial {
    position: absolute;
    left: 0;
    top: 20px;
    font-size: 16px;
    font-weight: bold;
  }
}
.place_r {
  position: relative;
  font-size: 12px;
  margin-left: 5px;
  margin-right: 50px;
  color: rgb(0, 32, 91);
  .destination {
    position: absolute;
    left: 0;
    top: 20px;
    font-size: 16px;
    font-weight: bold;
  }
}
.f1 {
  height: 4px;
  flex: 1;
  border-top: 1px dotted rgb(0, 32, 91);
}
.map-box {
  // padding: 0 14px 10px;
  img {
    width: 100%;
    height: 75px;
    display: block;
  }
}
</style>