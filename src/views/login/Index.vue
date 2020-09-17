<template>
  <div class="login">
    <ad-model v-if="isActive"></ad-model>
    <!-- <div class="title">
       {{$t('LOGIN')}} 
       <span class="lang" @click="showLang">
        {{lang}}
        <i class="icon icon-selectwhite"></i>
        <div :class="[isShowLang?'lang-change active':'lang-change']">
          <div class="t" @click="changeEn">English</div>
          <div class="t" @click="changeZh">简体中文</div>
        </div>
      </span> 
    </div> -->
    <div class="login-bg"></div>
    <div class="form">
      <div class="user-details">
        <div class="i-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-phone" />
          </svg>
        </div>
        <!-- @keyup="getUserPhone" -->
        <input
          v-model="userPhone"
          class="form-input"
          maxlength="20"
          :placeholder="$t('placeholderPhone')"
          type="number"
          @keydown="getUserPhoneLength"
        />
      </div>
      <div class="user-details m40">
        <div class="i-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-code" />
          </svg>
        </div>
        <input
          v-model="userPassword"
          class="form-input"
          :placeholder="$t('placeholderPassword')"
          type="password"
        />
      </div>
    </div>

    <div class="min-box">
      <router-link to="/registery">
        <div class="registery">{{$t('Registery')}}</div>
      </router-link>
      <router-link to="/forgot/password">
        <div class="forgot-password">{{$t('ForgotPassword')}}?</div>
      </router-link>
    </div>
    <div class="button-box">
      <button @click="postUserLogin" class="button">{{$t('Login')}}</button>
    </div>

    <div class="login-other">
      <div class="f1">
        <i class="icon icon-facebook_11 icon-text"></i>
        <div class="login-other-name">facebook</div>
      </div>
      <div class="f1">
        <i class="icon icon-line-diable icon-text"></i>
        <div class="login-other-name">Line</div>
      </div>
      <div class="f1">
        <i class="icon icon-wechat_11 icon-text"></i>
        <div class="login-other-name">Wechat</div>
      </div>
    </div>
    <div class="line">
      <div class="other"></div>
    </div>
    <div class="airbus-bg"></div>
  </div>
</template>
<i18n>
	{
		"zh":{
			  "LOGIN": "登录",
        "Login": "登录",
        "Registery": "注册",
        "ForgotPassword": "忘记密码",
        "placeholderPhone": "你的手机号码",
        "placeholderPassword": "请输入密码",
        "showError":"手机号码有误，请重填",
        "toast1": "手机号码不可以超出11位",
        "toast2": "用户名或密码不正确"
		},
		"en":{
			  "LOGIN": "LOGIN",
        "Login": "Login",
        "Registery": "Sign up",
        "ForgotPassword": "Forgot Password",
        "placeholderPhone": "Your phone",
        "placeholderPassword": "Password",
        "showError":"Wrong mobile number, please fill in again",
        "toast1": "Phone number cannot exceed 11 digits",
        "toast2": "The user name or password is incorrect."
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AdModel from './components/ADModel.vue';
import LoginService from '../../service/login';
import { localStore } from '../../utils/data-management';

@Component({
  name: 'Login',
  components: {
    AdModel
  }
})
export default class Login extends Vue {
  private isActive: boolean = true;
  private isShowLang: boolean = false;
  private lang: string = '';
  private userPhone: string = '';
  private userPassword: string = '';
  
  private created() {
    clearTimeout();
    setTimeout(() => {
      this.isActive = false;
    }, 1000);
    // console.log(navigator.language)
    if(navigator.language == 'zh-CN'){
      this.lang = '简体中文';
      this.$i18n.locale = 'zh';
      localStorage.setItem('lang', 'zh');
      this.$store.commit('changeLanguage', 'zh')
    }else{
      this.lang = 'English';
      this.$i18n.locale = 'en';
      localStorage.setItem('lang', 'en');
      this.$store.commit('changeLanguage', 'en')
    }
    // if(localStorage.getItem('lang') == 'en'){
    //   this.lang = 'English';
    //   this.$i18n.locale = 'en';
    //   localStorage.setItem('lang', 'en');
    // }else{
    //   this.lang = '简体中文';
    //   this.$i18n.locale = 'zh';
    //   localStorage.setItem('lang', 'zh');
    // }
  }
  private get seatNumber(): string {
    return this.$store.state.login.voyageInfo.seatNumber;
  }
  // public getUserPhone(e: any) {
  //   console.log(e)
  //   if(e.target.value.length > 11){
  //     this.$toast('数字不可以超出11位')
  //   }
  // }
  public getUserPhoneLength(e:any){
    if(e.target.value.length >= 11 && e.keyCode != 8){
      this.$toast(this.$i18n.t('toast1'))
      this.userPhone = e.target.value.substring(0,10)
    }
  }
  // public getUserPassword(e: any) {
  //   this.userPassword = e.target.value;
  // }
  public showLang() {
    this.isShowLang = !this.isShowLang;
  }
  public changeEn(){
    this.lang = 'English';
    this.$i18n.locale = 'en';
    localStorage.setItem('lang', 'en');
  }
  public changeZh(){
    this.lang = '简体中文';
    this.$i18n.locale = 'zh';
    localStorage.setItem('lang', 'zh');
  }
  public postUserLogin() {
    // console.log(this.$store.state.login.name)
    if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){ 
        this.$toast(this.$i18n.t('showError'));  
        return false; 
    } else if (this.userPhone != '' && this.userPassword != '') {
      var data = {
        username: '86_' + this.userPhone, // 默认86
        password: this.userPassword
      };
      LoginService.postUserLogin(data)
        .then((res: any) => {
          console.log(res);
		  // debugger;
          if (res.code == 200) {
            // 写入成功后，判断是否有座位
            this.$store.dispatch('setUserInfo', {
              name: res.data.userName,
              token: res.data.access_token,
              id: res.data.id,
			  airbusId:res.data.airbusId
            }).then((res:any)=>{
				// debugger;
              console.log('token:' + localStore.get('token'));
              LoginService.getUserMe().then((res: any)=>{
                console.log(res);
                if (res.code == 200 && res.data.Seat == null) {
                      this.$router.push({
                    name: 'selectSeat'
                  });
                } else if (res.code == 200 && res.data.Seat.Name){
                  this.$store.commit('setSeatNumber',res.data.Seat.Name);
                  this.$store.commit('setSeatName',res.data.Seat.Name);
                  this.$store.commit('setSeatType',res.data.Seat.SeatType);
                   this.$router.push({
                    name: 'home'
                  });
                }else{
                  this.$toast(res.message);
                }
              });
            });
            
            // this.$router.push({
            //   name: "home"
            // });
          }else{
            this.$toast(res.message);
          }
        })
        .catch((error: any) => {
          console.log(error);
          this.$toast(this.$i18n.t('toast2'));
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
  .login-bg{
    width: 100%;
    height: 2.7rem;
    background-image: url('./images/login_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .title {
    position: relative;
    padding: 0.3rem 0 0;
    font-size: 0.32rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 0.32rem;
    width: 100%;
    text-align: center;
    .lang {
      position: absolute;
      right: 0.3rem;
      top: 0.1rem;
      padding: 0.2rem;
      font-size: 0.28rem;
      color: rgba(255, 255, 255, 1);
      font-weight: 400;
      .lang-change {
        display: none;
        position: absolute;
        right: 0;
        top: 0.7rem;
        width: 100%;
        height: auto;
        font-size: 0.28rem;
        font-weight: 400;
        text-align: center;
        .t {
          padding: 0.1rem 0;
        }
      }
      .lang-change.active {
        display: block;
      }
    }
  }
  .form {
    margin: 0 0.3rem 0;
    //   background-color: rgba(0, 32, 91, 0.8);
    .user-details {
      display: flex;
      border: 0.02rem solid #fff;
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
        font-size: 0.30rem;
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