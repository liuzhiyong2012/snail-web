<template>
  <div class="login">
      <div class="login_top">LOGIN &#xe660;</div>
    <van-form @submit="onSubmit" >
      <van-field
        class="v_field_control"
        v-model="username"
        name="UserName"
        left-icon="friends-o"
        placeholder="You name"
        :rules="[{ required: true, message: 'Please fill in the user name' }]"
      ></van-field>
      <van-field
        class="v_field_control"
        v-model="password"
        type="password"
        name="Password"
        left-icon="more-o"
        corlor="#fff"
        placeholder="Password"
        :rules="[{ required: true, message: 'Please fill in the password' }]"
      ></van-field>
      <div class="forgot_password">Forgot Password?</div>
      <div style="margin: 16px;">
        <van-button class="v_ab_button" round block type="info" native-type="submit">Login</van-button>
      </div>
    </van-form>
    <div class="registery">Registery</div>
    <div class="login_other">
        <div class="f1">
            <img src="./images/facebook.png" alt="">
            <div class="login_other_name">facebook</div>
        </div>
        <div class="f1">
            <img src="./images/facebook.png" alt="">
            <div class="login_other_name">facebook</div>
        </div>
        <div class="f1">
            <img src="./images/facebook.png" alt="">
            <div class='login_other_name'>facebook</div>
        </div>
    </div>
    <div class="login_bottom">AIRBUS</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 32, 91, 0.9);
}
.forgot_password {
  width: 100%;
  padding: 0 15px;
  line-height: 20px;
  box-sizing: border-box;
  text-align: right;
  font-size: 13px;
  color: rgb(102,121,156);
}
.registery {
  width: 100%;
  line-height: 20px;
  text-align: center;
  font-size: 13px;
  color: #fff;
  text-decoration: underline ;
}
.login_top {
  width: 100vw;
  height: 20vh;
  text-align: center;
  line-height: 20vh;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}
.login_bottom {
  width: 100vw;
  height: 25vh;
  text-align: center;
  line-height: 25vh;
  color: #fff;
  font-weight: bold;
  font-size: 30px;
}
.v_ab_button {
  background-color: rgb(0, 174, 199);
  border: 1px solid rgb(0, 174, 199);
}
.van-cell {
  width: auto;
  margin: 0 15px 10px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #fff;
}
.van-cell::after {
  border: none;
}
.van-cell input {
  color: #fff;
}
.van-icon-more::before {
  color: #fff;
}
input {
  box-shadow: inset 0 0 0 1000px #f7f7f7 !important;
  color: #fff;
}
.v_grid_item {
  div {
    padding: 0;
    background-color: rgba(0, 0, 0, 0);
  }
}
.v_field_control {
  color: #fff;
  input{
      color: #fff;
  }
}
.login_other{
    display: flex;
    height: 50px;
    margin: 20px 0 0 0;
    .f1{
        flex: 1;
        text-align: center;
        height: 50px;
        line-height: 20px;
        img{
            width: 32px;
            height: 32px;
        }
        .login_other_name {
            font-size: 11px;
            color: rgb(102,121,156);
        }
    }
}
</style>