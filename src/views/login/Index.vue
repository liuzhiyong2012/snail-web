<template>
  <div class="login">
    <ad-model v-if="isActive"></ad-model>
    <div class="title">LOGIN</div>
    <div class="form">
      <div class="user-details">
        <div class="i-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-phone" />
          </svg>
        </div>
        <input
          @change="getUserPhone"
          :value="userPhone"
          class="form-input"
          placeholder="You phone"
          type="text"
        />
      </div>
      <div class="user-details m40">
        <div class="i-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-code" />
          </svg>
        </div>
        <input
          @change="getUserPassword"
          :value="userPassword"
          class="form-input"
          placeholder="Password"
          type="password"
        />
      </div>
    </div>
    <div class="min-box">
      <router-link to="/registery">
        <div class="registery">Registery</div>
      </router-link>
      <router-link to="/forgot/password">
        <div class="forgot-password">Forgot Password?</div>
      </router-link>
    </div>
    <div class="button-box">
      <button @click="postUserLogin" class="button">Login</button>
    </div>

    <div class="login-other">
      <div class="f1">
        <i class="icon icon-facebook icon-text"></i>
        <div class="login-other-name">facebook</div>
      </div>
      <div class="f1">
        <i class="icon icon-line icon-text"></i>
        <div class="login-other-name">Line</div>
      </div>
      <div class="f1">
        <i class="icon icon-wechat icon-text"></i>
        <div class="login-other-name">Wechat</div>
      </div>
    </div>
    <div class="line">
      <div class="other"></div>
    </div>
    <div class="airbus-bg"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AdModel from "./components/ADModel.vue";
import LoginServe from "../../service/login";

@Component({
  name: "Login",
  components: {
    AdModel
  }
})
export default class Login extends Vue {
  private isActive: boolean = true;
  private userPhone: string = '';
  private userPassword: string = "";
  private get seatNumber(): string {
    return this.$store.state.login.voyageInfo.seatNumber;
  }
  created() {
    clearTimeout();
    setTimeout(() => {
      this.isActive = false;
    }, 1000);
  }
  getUserPhone(e: any) {
    this.userPhone = e.target.value;
  }
  getUserPassword(e: any) {
    this.userPassword = e.target.value;
  }
  postUserLogin() {
    if (this.userPhone != '' && this.userPassword != "") {
      var data = {
        username: '86_' + this.userPhone, // 默认86
        password: this.userPassword
      };
      LoginServe.postUserLogin(data).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          this.$router.push({
            name: "home"
          });
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #00205b;
  width: 100%;
  height: 100vh;
  .title {
    padding: 0.3rem 0 0;
    font-size: 0.32rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 0.32rem;
    width: 100%;
    text-align: center;
  }
  .form {
    margin: 1.72rem 0.3rem 0;
    //   background-color: rgba(0, 32, 91, 0.8);
    .user-details {
      display: flex;
      border: 1px solid #fff;
      border-radius: 0.05rem;
      height: 1rem;
      .i-icon {
        width: 1rem;
        height: 1rem;
        text-align: center;
        line-height: 1.1rem;
        // background-color: #fff;
      }
      .form-input {
        box-sizing: border-box;
        padding: 0 0 0 0.1rem;
        flex: 1;
        background-color: #00205b;
        font-size: 0.32rem;
        color: #fff;
      }
    }
    .m40 {
      margin: 0.4rem 0 0 0;
    }
  }
  .min-box {
    display: flex;
    margin: 0.5rem 0 0 0;
    padding: 0 0.3rem;
    justify-content: space-between;
    .forgot-password {
      padding: 0.2rem 0;
      line-height: 0.2rem;
      box-sizing: border-box;
      text-align: right;
      font-size: 0.26rem;
      color: rgb(102, 121, 156);
    }
    .registery {
      padding: 0.2rem 0;
      line-height: 0.2rem;
      text-align: center;
      box-sizing: border-box;
      font-size: 0.26rem;
      color: #fff;
      text-decoration: underline;
    }
  }

  .button-box {
    box-sizing: border-box;
    margin: 0.65rem 0 0;
    padding: 0 0.3rem;
    .button {
      background-color: #00aec7;
      color: #fff;
      width: 100%;
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      border-radius: 0.5rem;
      font-size: 0.36rem;
      font-weight: bold;
    }
  }

  .login-other {
    display: flex;
    height: 1rem;
    margin: 0.4rem 0 0 0;
    .f1 {
      flex: 1;
      text-align: center;
      height: 1rem;
      img {
        width: 0.64rem;
        height: 0.64rem;
      }
      .login-other-name {
        font-size: 0.22rem;
        color: rgb(102, 121, 156);
      }
    }
  }
  .line {
    margin: 0.6rem 0 0;
    position: relative;
    width: 100%;
    border-bottom: 0.01rem solid #fff;
    .other {
      position: absolute;
      right: 0;
      top: 0;
      width: 80%;
      border-bottom: 0.06rem solid #fff;
    }
  }
  .airbus-bg {
    width: 100%;
    height: 25vh;
    background: url("./images/ab_logo.jpg") no-repeat center;
    background-size: 100%;
  }
}
.icon-text {
  font-size: 0.6rem;
  color: #fff;
}
</style>