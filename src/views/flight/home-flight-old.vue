<template>
  <div>
    <h2 class="abus_block_title">
      <van-cell value="Flight" class="block_title_background" />
    </h2>
    <div class="home_flight_box">
      <div class="flex-box">
        <div class="flex-l">
          <span class="home_flight_title">visian airlines VA3928</span>
          <span>Seat No:C30</span>
        </div>
        <div class="flex-r">26°C</div>
      </div>
      <div>
        <div style="width:50%">
          <van-steps direction="vertical" :active="0" active-color="#3056EF" >
            <van-step>
              <p class="step_time">2016-07-12 12:40</p>
              <h3 class="step_place">Shenzhen</h3>
            </van-step> 
            <van-step>
              <p class="step_time">2016-07-11 10:00</p>
              <h3 class="step_place">Beijing</h3>
            </van-step>
          </van-steps>
        </div>
      </div>
      <div class="map-box">
          <img src="./images/map.jpg" alt="">
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
.home_flight_box {
  margin: 0 16px;
  background-color: #fff;
}

.flex-box {
  display: flex;
  line-height: 24px;
  padding: 5px 14px 0;
  .flex-l {
    flex: 1;
    font-size: 12px;
    color: #666;
  }
  .flex-r {
    width: 30px;
    font-size: 12px;
    color: darkgoldenrod;
  }
}
.step_time{
    margin: 0;
    color: #888;
    font-size: 10px;
}
.step_place{
    margin: 5px 0 0;
    color: #333;
}

.van-step--vertical:not(:last-child)::after{
    border-bottom-width: 0;
}
.map-box{
    padding: 0 14px 10px;
    img{
        width: 100%;
        height: 75px;
    }
}
</style>