<template>
  <div class="login">
    <div class="title">LOGIN</div>
    <div class="form">
      <div class="user_details">
        <div class="icon"></div>
        <input class="form_input" placeholder="You phone" type="text" />
      </div>
      <div class="user_details m40">
        <div class="icon"></div>
        <input class="form_input" placeholder="Password" type="password" />
      </div>
    </div>
    <div class="forgot_password">Forgot Password?</div>
    <div class="button_box">
      <button class="button">Login</button>
    </div>
    <div class="registery">Registery</div>
    <div class="login_other">
      <div class="f1">
        <img src="./images/facebook.png" alt />
        <div class="login_other_name">facebook</div>
      </div>
      <div class="f1">
        <img src="./images/facebook.png" alt />
        <div class="login_other_name">facebook</div>
      </div>
      <div class="f1">
        <img src="./images/facebook.png" alt />
        <div class="login_other_name">facebook</div>
      </div>
    </div>
    <div class="line">
        <div class="other"></div>
    </div>
    <div class="airbus_bg"></div>
  </div>
</template>

<script>
export default {
  name: "login"
};
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
    .user_details {
      display: flex;
      border: 1px solid #fff;
      border-radius: 0.05rem;
      height: 1rem;
      .icon {
        width: 1rem;
        height: 1rem;
        background-color: #fff;
      }
      .form_input {
        box-sizing: border-box;
        padding: 0 0 0 0.1rem;
        flex: 1;
        background-color: #00205b;
        font-size: 0.38rem;
        color: #fff;
      }
    }
    .m40 {
      margin: 0.4rem 0 0 0;
    }
  }
  .forgot_password {
    margin: 0.3rem 0 0 0;
    width: 100%;
    padding: 0 0.3rem;
    line-height: 0.2rem;
    box-sizing: border-box;
    text-align: right;
    font-size: 0.26rem;
    color: rgb(102, 121, 156);
  }
  .button_box {
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
  .registery {
    margin: 0.3rem 0 0;
    width: 100%;
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.23rem;
    color: #fff;
    text-decoration: underline;
  }
  .login_other {
    display: flex;
    height: 1rem;
    margin: 0.4rem 0 0 0;
    .f1 {
      flex: 1;
      text-align: center;
      height: 1rem;
      line-height: 0.4rem;
      img {
        width: 0.64rem;
        height: 0.64rem;
      }
      .login_other_name {
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
    .other{
        position: absolute;
        right: 0;
        top: 0;
        width: 80%;
        border-bottom: 0.06rem solid #fff;
    }
  }
  .airbus_bg{
      width: 100%;
      height: 25vh;
      background: url('./images/airbus.jpg') no-repeat;
      background-size: 100%;
  }
}
</style>