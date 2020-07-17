<template>
  <div class="forgot-password">
    <div class="tab">
      <div class="place active">
        <div class="place-icon">1</div>
        <div class="text">Your phone number</div>
      </div>
      <div :class="[isActiveTwo? 'f1 active': 'f1']"></div>
      <div :class="[isActiveTwo? 'place active': 'place']">
        <div class="place-icon">2</div>
        <div class="text">Identity verification</div>
      </div>
      <div :class="[isActiveThr? 'f1 active': 'f1']"></div>
      <div :class="[isActiveThr? 'place active': 'place']">
        <div class="place-icon">3</div>
        <div class="text">New password</div>
      </div>
    </div>
    <div class="tab-con">
      <div class="item" :style="{width: fullWidth * 3 + 'px', left: aLeft + 'px'}">
        <div class="f1">
          <div class="main-box">
            <div class="title">Phone</div>
            <input class="flex1" placeholder="Enter your phone number" type="text" />
          </div>
          <div class="next" @click="onClickOne">Next</div>
        </div>
        <div class="f1">
          <ul class="ul-box">
            <li :class="[isShowSMS? 'collapse-item active': 'collapse-item']">
              <div class="collapse-item-title" @click="showSMS">SMS verification</div>
              <div class="collapse-item-con">
                  <div class="collapse-item-main">
                  <div class="title">Phone</div>
                  <div class="flex1 no-inp">123123123123</div>
                </div>
                <div class="collapse-item-main no-pad">
                  <div class="title ">Verification Code</div>
                  <input class="flex1" placeholder="Enter Verification Code" type="text" />
                </div>
              </div>
            </li>
            <li :class="[isshowSecurityProblem? 'collapse-item active': 'collapse-item']">
              <div
                class="collapse-item-title"
                @click="showSecurityProblem"
              >Security problem verification</div>
              <div class="collapse-item-con">
                  <div class="collapse-item-main">
                  <div class="title">Phone</div>
                  <div class="flex1 no-inp">123123123123</div>
                </div>
                <div class="collapse-item-main no-pad">
                  <div class="title ">Security answer</div>
                  <input class="flex1" placeholder="Please enter your answer" type="text" />
                </div>
              </div>
            </li>
          </ul>
          <div class="next" @click="onClickTwo">Next</div>
        </div>
        <div class="f1">
          <div class="main-box line-height">
            <div class="title pad">New password</div>
            <input class="flex1" placeholder="Please set new password" type="password" />
          </div>
          <div class="main-box no-pad line-height">
            <div class="title pad">Confirm password</div>
            <input class="flex1" placeholder="Please Confirm password" type="password" />
          </div>
          <div class="next" @click="onClickThree">Confirm</div>
        </div>
      </div>
    </div>
    <!-- <router-view>

    </router-view>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActiveTwo: false,
      isActiveThr: false,
      isShowSMS: false,
      isshowSecurityProblem: false,
      fullWidth: document.documentElement.clientWidth,
      aLeft: 0
    };
  },
  mounted() {},
  methods: {
    onClickOne() {
      this.aLeft = -this.fullWidth;
      this.isActiveTwo = true;
    },
    onClickTwo() {
      this.aLeft = -(this.fullWidth * 2);
      this.isActiveThr = true;
    },
    onClickThree() {
      this.$router.push({
        path: "/login/index"
      });
    },
    showSMS() {
      this.isShowSMS = true;
      this.isshowSecurityProblem = false;
    },
    showSecurityProblem() {
      this.isShowSMS = false;
      this.isshowSecurityProblem = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.forgot-password {
  min-height: 100vh;
  .tab {
    box-sizing: border-box;
    display: flex;
    align-items: baseline;
    padding: 0.4rem 1rem;
    height: 1.7rem;
    .place {
      position: relative;
      font-size: 0.24rem;
      color: rgb(0, 32, 91);
      .place-icon {
        box-sizing: border-box;
        width: 0.45rem;
        height: 0.45rem;
        border: 0.02rem dashed rgba(51, 51, 51, 0.2);
        border-radius: 50%;
        text-align: center;
        line-height: 0.42rem;
        font-weight: bold;
        color: rgba(168, 168, 168, 1);
        font-size: 0.28rem;
      }
      .text {
        position: absolute;
        left: -0.75rem;
        top: 0.6rem;
        width: 3rem;
        font-size: 0.24rem;
        font-family: Helvetica;
        color: rgba(51, 51, 51, 1);
        line-height: 0.24rem;
      }
    }
    .place.active {
      .place-icon {
        background-color: #00205b;
        color: #fff;
        border: 0.02rem solid #00205b;
        transition: all ease-out 0.3s;
      }
      .text {
        color: #00205b;
        font-weight: bold;
      }
    }
    .f1 {
      height: 0.08rem;
      flex: 1;
      border-top: 0.02rem dashed #cfcfcf;
    }
    .f1.active {
      border-top: 0.02rem solid #00205b;
      transition: all ease-out 0.3s;
    }
  }
  .tab-con {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    .item {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #fafafa;
      transition: all ease-out 0.3s;

      .f1 {
        flex: 1;
        .main-box {
          box-sizing: border-box;
          display: flex;
          padding: 0.3rem;
          height: 1.6rem;
          background-color: #fff;
          font-family: Helvetica;
          color: rgba(51, 51, 51, 1);
          line-height: 1rem;
          .title {
            width: 1.6rem;
          }
          .title.pad {
            padding: 0.2rem 0 0 0;
          }
          .flex1 {
            flex: 1;
            padding: 0 0 0 0.24rem;
            border: 0.02rem solid rgba(51, 51, 51, 0.1);
            border-radius: 0.04rem;
          }
        }
        .main-box.no-pad {
          height: 1.3rem;
          padding: 0 0.3rem 0.3rem;
        }
        .main-box.line-height {
          line-height: 0.32rem;
        }
        .next {
          margin: 0.3rem;
          height: 0.8rem;
          background: rgba(0, 32, 91, 1);
          border-radius: 0.5rem;
          color: #fff;
          line-height: 0.8rem;
          text-align: center;
          font-weight: bold;
          font-size: 0.34rem;
        }
        .ul-box {
          padding: 0 0.3rem;
          background: #fff;
          .collapse-item {
            position: relative;
            overflow: hidden;
            .collapse-item-title {
              padding: 0.46rem 0;
              color: #333;
              background: #fff;
            }
            .collapse-item-con {
              height: 0;
              background: #f3f2f9;
              transition: all ease-in-out 0.3s;
              .collapse-item-main {
                box-sizing: border-box;
                display: flex;
                padding: 0.3rem;
                color: rgba(51, 51, 51, 1);
                line-height: .32rem;
                .title {
                  width: 1.6rem;
                  line-height: .5rem;
                }
                .title.pad {
                  padding: 0.2rem 0 0 0;
                }
                .flex1 {
                  flex: 1;
                  padding: 0 0 0 0.24rem;
                  border: 0.02rem solid rgba(51, 51, 51, 0.1);
                  border-radius: 0.04rem;
                  background-color: #f3f2f9;
                }
                .flex1.no-inp{
                    line-height: .5rem;
                    border: none;
                }
              }
              .collapse-item-main.no-pad {
                padding: 0 .3rem .3rem;
                height: 1.3rem;
              }
              .main-boxcollapse-item-main.line-height {
                line-height: 0.32rem;
              }
            }
          }
          .collapse-item.active {
            .collapse-item-con {
              height: 2.4rem;
              .main-boxcollapse-item-main.no-pad {
                padding: 0 0.3rem 0.3rem;
              }
            }
            .collapse-item-title {
              color: #001f5b;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>