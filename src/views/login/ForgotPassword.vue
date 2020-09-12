<template>
  <div class="forgot-password">
    <abus-title :title="$t('ForgotPassword')"></abus-title>
    <div class="tab">
      <div class="place active">
        <div class="place-icon">1</div>
      </div>
      <div :class="[isActiveTwo? 'f1 active': 'f1']"></div>
      <div :class="[isActiveTwo? 'place active': 'place']">
        <div class="place-icon">2</div>
      </div>
      <div :class="[isActiveThr? 'f1 active': 'f1']"></div>
      <div :class="[isActiveThr? 'place active': 'place']">
        <div class="place-icon">3</div>
      </div>
    </div>
    <div class="tab-flex">
      <div class="text1">{{$t('PhoneNumber')}}</div>
      <div class="text1">{{$t('IdentityVerification')}}</div>
      <div class="text1">{{$t('NewPassword')}}</div>
    </div>
    <div class="tab-con">
      <div class="item" :style="{width: fullWidth * 3 + 'px', left: aLeft + 'px'}">
        <div class="f1">
          <div class="main-box">
            <div class="title">{{$t('Phone')}}</div>
            <!-- @change="getPhoneNum($event)" -->
            <input 
            class="flex1" 
            :placeholder="$t('PhoneTips')" 
            @keydown="getUserPhoneLength"
            v-model="phone" 
            type="number" />
          </div>
          <div class="next" @click="postCheckPhone">{{$t('Next')}}</div>
        </div>
        <div class="f1">
          <ul class="ul-box">
            <li :class="[isShowSMS? 'collapse-item active': 'collapse-item']">
              <div class="collapse-item-title" @click="showSMS">{{$t('SMSVerification')}}</div>
              <div class="collapse-item-con">
                <div class="collapse-item-main">
                  <div class="title">{{$t('Phone')}}</div>
                  <div class="flex1 no-inp">{{phone}}</div>
                </div>
                <div class="collapse-item-main no-pad on-sms">
                  <div class="title">{{$t('VerificationCode')}}</div>
                  <input
                    class="flex1"
                    v-model="code"
                    :placeholder="$t('VerificationCodeTips')"
                    type="text"
                  />
                  <!-- <div class="on-sms">获取验证码</div> -->
                  <div v-if="isShowCode" class="sms-code" @click="getVerificationCode">获取验证码</div>
                  <div v-else class="sms-code">{{countdown}}s</div>
                </div>
              </div>
            </li>
            <li :class="[isshowSecurityProblem? 'collapse-item active': 'collapse-item']">
              <div
                class="collapse-item-title"
                @click="showSecurityProblem"
              >{{$t('SecurityProblem')}}</div>
              <div class="collapse-item-con add-height">
                <div class="collapse-item-main">
                  <div class="title">{{$t('SecurityIssues')}}</div>
                  <div class="flex1 no-inp add-line-h">{{question}}</div>
                </div>
                <div class="collapse-item-main no-pad">
                  <div class="title">{{$t('SecurityAnswer')}}</div>
                  <input
                    v-model="answer"
                    class="flex1"
                    :placeholder="$t('SecurityAnswerTips')"
                    type="text"
                  />
                </div>
              </div>
            </li>
          </ul>
          <div class="next" @click="onClickTwo">{{$t('Next')}}</div>
        </div>
        <div class="f1">
          <div class="main-box line-height">
            <div class="title pad">{{$t('NewPassword')}}</div>
            <input
              v-model="newPassword"
              class="flex1"
              :placeholder="$t('NewPasswordTips')"
              type="password"
            />
          </div>
          <div class="main-box no-pad line-height">
            <div class="title pad">{{$t('ConfirmPassword')}}</div>
            <input
              v-model="confirmPassword"
              class="flex1"
              :placeholder="$t('ConfirmPasswordTips')"
              type="password"
            />
          </div>
          <div class="next" @click="onClickConfirm">{{$t('Confirm')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<i18n>
  {
    "zh":{
      "ForgotPassword": "忘记密码",
      "PhoneNumber":"你的手机号",
      "IdentityVerification": "身份验证",
      "NewPassword":"新密码",
      "Phone":"手机号",
      "PhoneTips":"请输入手机号码",
      "Next":"下一步",
      "SMSVerification":"短信验证",
      "VerificationCode":"验证码",
      "VerificationCodeTips":"请输入验证码",
      "SecurityProblem":"安全问题验证",
      "SecurityIssues":"安全问题",
      "SecurityAnswer":"问题答案",
      "SecurityAnswerTips":"请输入你的答案",
      "NewPasswordTips":"请输入新密码",
      "ConfirmPassword":"确认密码",
      "ConfirmPasswordTips":"请再次输入密码",
      "Confirm":"确认"
    },
    "en":{
      "ForgotPassword": "Forgot Password",
      "PhoneNumber":"Your phone number",
      "IdentityVerification": "Identity verification",
      "NewPassword":"New password",
      "Phone":"Phone",
      "PhoneTips":"Enter your phone number",
      "Next":"Next",
      "SMSVerification":"SMS verification",
      "VerificationCode":"Verification Code",
      "VerificationCodeTips":"Enter Verification Code",
      "SecurityProblem":"Security problem verification",
      "SecurityIssues":"Security issues",
      "SecurityAnswer":"Security answer",
      "SecurityAnswerTips":"Please enter your answer",
      "NewPasswordTips":"Please set new password",
      "ConfirmPassword":"Confirm password",
      "ConfirmPasswordTips":"Please Confirm password",
      "Confirm":"Confirm"
    }
  }
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LoginService from "../../service/login";
import AbusTitle from "../../components/AbusTitle.vue";
@Component({
  name: "ForgotPassword",
  components: { AbusTitle },
})
export default class ForgotPassword extends Vue {
  private isActiveTwo: boolean = false;
  private isActiveThr: boolean = false;
  private isShowCode: boolean = true;
  private isShowSMS: boolean = false;
  private isshowSecurityProblem: boolean = false;
  private fullWidth: number = 750;
  private countdown: number = 60;
  private aLeft: number = 0;
  private phone: string = "";
  private code: string = "";
  private question: string = "";
  private answer: string = "";
  private password: string = "";
  private newPassword: string = "";
  private confirmPassword: string = "";
  private userId: string = "";

  private created() {
    this.fullWidth = document.documentElement.clientWidth;
  }
  private mounted() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  }
  public getUserPhoneLength(e:any){
    if(e.target.value.length >= 11 && e.keyCode != 8){
      this.$toast('数字不可以超出11位')
      this.phone = e.target.value.substring(0,10)
    }
  }
  // 验证手机号是否注册
  public postCheckPhone() {
    var data = {
      phone: this.phone,
    };
    //JSON.stringify(data)
    LoginService.postCheckPhone(data)
      .then((res: any) => {
        if (res.code == 200) {
          this.userId = res.data.id;
          this.question = res.data.question;
          this.aLeft = -this.fullWidth;
          this.isActiveTwo = true;
        } else {
          this.$toast(res.message);
        }
      })
      .catch((reason: any) => {
        console.log("=== Error ===");
        console.log(reason);
        this.$toast(reason.message);
      });
  }
  // 验证码请求接口
  public getVerificationCode() {
    let data = {
      phone: this.phone,
    };
    // 验证码请求接口位置
    LoginService.postSendCode(data)
      .then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          clearInterval(intervalId);
          this.isShowCode = false;
          var intervalId = setInterval(() => {
            this.countdown = this.countdown - 1;
            if (this.countdown == 0) {
              clearInterval(intervalId);
              this.countdown = 60;
              this.isShowCode = true;
            }
          }, 1000);
        } else {
          this.$toast(res.message);
        }
      })
      .catch((reason: any) => {
        console.log("=== Error ===");
        this.$toast(reason.message);
      });
  }
  public onClickTwo() {
    if (this.isshowSecurityProblem) {
      var data = {
        id: this.userId,
        answer: this.answer,
      };
      LoginService.postCheckAnswer(data)
        .then((res: any) => {
          console.log(res);
          if (res.code == 200) {
            this.password = res.password;
            this.aLeft = -(this.fullWidth * 2);
            this.isActiveThr = true;
          } else {
            this.$toast(res.message);
          }
        })
        .catch((reason: any) => {
          console.log("=== Error ===");
          console.log(reason);
          this.$toast(reason.message);
        });
    } else if (this.isShowSMS) {
      var aData = {
        phone: this.phone,
        code: this.code,
      };
      // 验证码验证
      LoginService.postCheckCode(aData).then((res: any) => {
        console.log(res)
        if (res.code == 200) {
          this.aLeft = -(this.fullWidth * 2);
          this.isActiveThr = true;
        } else {
          this.$toast(res.message);
        }
      });
    } else {
      this.$toast("Please select an item from the list");
    }
  }
  
  public onClickConfirm() {
    if (this.newPassword != "" && this.newPassword == this.confirmPassword) {
      var data = {
        id: this.userId,
        password: this.password,
        newPassword: this.newPassword,
      };
      LoginService.postResetPassword(data).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          this.aLeft = 0;
          this.isActiveTwo = false;
          this.isActiveThr = false;
          this.$router.push({
            path: "/login",
          });
        } else {
          this.$toast(res.message);
        }
      });
    } else if (
      this.newPassword != "" &&
      this.newPassword != this.confirmPassword
    ) {
      this.$toast("Password inconsistency");
    } else {
      this.$toast("Please set new password");
    }
  }
  public showSMS() {
    this.isShowSMS = true;
    this.isshowSecurityProblem = false;
  }
  public showSecurityProblem() {
    this.isShowSMS = false;
    this.isshowSecurityProblem = true;
  }
}
</script>

<style lang="scss" scoped>
.forgot-password {
  min-height: 100vh;
  overflow: hidden;
  .tab {
    box-sizing: border-box;
    display: flex;
    align-items: baseline;
    padding: 0.4rem 1rem 0;
    height: 1rem;
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
  .tab-flex {
    display: flex;
    text-align: center;
    padding: 0 0 0.3rem 0;
    .text1 {
      flex: 1;
      font-size: 0.24rem;
      color: rgba(51, 51, 51, 1);
      line-height: 0.24rem;
    }
  }
  .tab-con {
    position: relative;
    width: 100%;
    min-height: 60vh;
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
          color: rgba(51, 51, 51, 1);
          line-height: 1rem;
          .title {
            width: 1.6rem;
          }
          .title.pad {
            display: flex;
            align-items: center;
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
            .on-sms {
              position: relative;
            }
            .sms-code {
              position: absolute;
              right: 0.35rem;
              top: 0.05rem;
              padding: 0.2rem;
              font-size: 0.24rem;
              min-width: 1rem;
              color: #fff;
              background: rgba(0, 32, 91, 1);
              line-height: 0.5rem;
              border-radius: 0.1rem;
              text-align: center;
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
                line-height: 0.32rem;
                .title {
                  width: 1.6rem;
                  line-height: 0.5rem;
                  display: flex;
                  align-items: center;
                }
                .title.pad {
                  // padding: 0.2rem 0 0 0;
                  display: flex;
                  align-items: center;
                }
                .flex1 {
                  flex: 1;
                  padding: 0 0 0 0.24rem;
                  border: 0.02rem solid rgba(51, 51, 51, 0.1);
                  border-radius: 0.04rem;
                  background-color: #f3f2f9;
                }

                .flex1.no-inp {
                  padding: 0;
                  line-height: 0.5rem;
                  border: none;
                }
                .flex1.add-line-h {
                  line-height: 1rem;
                }
              }
              .collapse-item-main.no-pad {
                padding: 0 0.3rem 0.3rem;
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
            .add-height {
              height: 2.9rem;
            }
            .add-line-h {
              line-height: 1rem;
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