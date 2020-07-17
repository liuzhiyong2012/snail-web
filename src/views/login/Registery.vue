<template>
  <div class="registery">
    <div class="con">
      <div class="main-item">
        <div class="title line-h">Name</div>
        <input class="main-item-con" type="text" placeholder="Please enter  your name" />
      </div>
      <div class="main-item">
        <div class="title line-h">Portrait</div>
        <van-uploader v-model="fileList" multiple :max-count="1" />
      </div>
      <div class="main-item">
        <div class="title line-h">Gender</div>
        <van-radio-group
          v-model="radio"
          direction="horizontal"
          checked-color="#00205B"
          icon-size="12px"
        >
          <van-radio name="1">
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
            Female
          </van-radio>
          <van-radio name="2">
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
            Male
          </van-radio>
        </van-radio-group>
      </div>
      <div class="main-item">
        <div class="title line-h">Phone</div>
        <input class="main-item-con" type="text" placeholder="Please enter your phone number" />
      </div>
      <div class="main-item">
        <div class="title line-h">Password</div>
        <input class="main-item-con" type="password" placeholder="Please enter password" />
      </div>
      <div class="main-item">
        <div class="title">Confirm password</div>
        <input class="main-item-con" type="password" placeholder="Please Confirm password" />
      </div>
      <div class="main-item">
        <div class="title line-h">Date</div>
        <input
          class="main-item-con"
          @click="showPopup"
          type="text"
          placeholder="Please select your date"
        />
        <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="Date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="getConfirmData"
            cancel-button-text="cancel"
            confirm-button-text="determine"
          />
        </van-popup>
      </div>
      <div class="main-item">
        <div class="title">Security issues</div>
        <input class="main-item-con" type="text" placeholder="Please enter Security issues" />
      </div>
      <div class="main-item">
        <div class="title">Security answer</div>
        <input class="main-item-con" type="text" placeholder="Please enter Security answer" />
      </div>
    </div>
    <p class="policy">《Privacy policy》《Terms of service》</p>
    <div class="button-box">
      <div class="button">Registery</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      radio: "1",
      show: false,
      activeIcon: require("./images/sel.png"),
      inactiveIcon: require("./images/no_sel.png"),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    getConfirmData(val) {
      console.log(val);
      return val;
    }
  }
};
</script>

<style lang="scss" scoped>
.registery {
  padding: 0.3rem 0 0;
  box-sizing: border-box;
  height: 100vh;
  .con {
    background-color: #fff;
    padding: 0.3rem 0.3rem 0;
    .main-item {
      display: flex;
      padding: 0 0 0.3rem 0;
      .title {
        padding: 0.1rem 0 0;
        width: 1.7rem;
        color: #333;
      }
      .main-item-con {
        box-sizing: border-box;
        padding: 0 0 0 0.3rem;
        flex: 1;
        height: 0.8rem;
        border-radius: 0.04rem;
        border: 0.02rem solid rgba(51, 51, 51, 0.1);
        color: #333;
      }
      .title.line-h {
        padding: 0;
        line-height: 0.8rem;
      }
    }
  }
}
.img-icon {
  width: 0.24rem;
  height: 0.24rem;
}
.policy {
    margin-left: .3rem;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0.64rem;
  font-size: .28rem;
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
</style>