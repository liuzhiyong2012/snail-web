<template>
  <div>
    <abus-title :title="$t('Registery')" />
    <div class="registery">
      <div class="con">
        <div class="main-item">
          <div class="title line-h">{{$t('Name')}}</div>
          <input
            v-model="nickname"
            class="main-item-con"
            maxlength="20"
            type="text"
            :placeholder="$t('NameTips')"
          />
        </div>
        <!-- <div class="main-item">
        <div class="title line-h">{{$t('Portrait')}}</div>
        <van-uploader v-model="fileList" multiple :max-count="1" />
        </div>-->
        <div class="main-item">
          <div class="title line-h">{{$t('Gender')}}</div>
          <van-radio-group
            v-model="radio"
            direction="horizontal"
            checked-color="#00205B"
            icon-size="12px"
          >
            <van-radio name="0">
              <template #icon="props">
                <svg class="icon icon-text" aria-hidden="true">
                  <use v-if="props.checked" xlink:href="#icon-selected" />
                  <use v-else xlink:href="#icon-unselected" />
                </svg>
                <span :class="[props.checked ? 'text-selected': 'text-unselected']">{{$t('Female')}}</span>
              </template>
            </van-radio>
            <van-radio name="1">
              <template #icon="props">
                <svg class="icon icon-text" aria-hidden="true">
                  <use v-if="props.checked" xlink:href="#icon-selected" />
                  <use v-else xlink:href="#icon-unselected" />
                </svg>
                <span :class="[props.checked ? 'text-selected': 'text-unselected']">{{$t('Male')}}</span>
              </template>
            </van-radio>
          </van-radio-group>
        </div>
        <div class="main-item">
          <div class="title line-h">{{$t('Phone')}}</div>
          <input
            v-model="phone"
            class="main-item-con"
            type="number"
            maxlength="20"
            @keydown="getUserPhoneLength"
            :placeholder="$t('PhoneTips')"
          />
        </div>
        <div class="main-item">
          <div class="title line-h">{{$t('IDCard')}}</div>
          <input
            v-model="idCard"
            maxlength="25"
            class="main-item-con"
            type="text"
            :placeholder="$t('IDCardTips')"
          />
        </div>
        <div class="main-item">
          <div class="title line-h">{{$t('Password')}}</div>
          <input
            v-model="password"
            class="main-item-con"
            type="password"
            :placeholder="$t('PasswordTips')"
            @blur="checkUserPassword"
          />
        </div>
        <div class="main-item">
          <div class="title">{{$t('Confirm-password')}}</div>
          <input
            v-model="confirmPassword"
            @blur="checkPassword"
            class="main-item-con"
            type="password"
            :placeholder="$t('ConfirmPasswordTips')"
          />
        </div>
        <div class="main-item location">
          <div class="title line-h">{{$t('Date')}}</div>
          <input
            class="main-item-con"
            @click="showPopup"
            :value="datetime"
            type="text"
            :placeholder="$t('DateTips')"
          />
          <div class="data-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-date" />
            </svg>
          </div>
          <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              :title="$t('Date')"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="getConfirmData"
              :cancel-button-text="$t('Cancel')"
              :confirm-button-text="$t('Determine')"
            />
          </van-popup>
        </div>
        <div class="main-item">
          <div class="title">{{$t('Security-issues')}}</div>
          <input
            @click="showQuestion"
            class="main-item-con"
            type="text"
            :value="question"
            :placeholder="$t('IssuesTips')"
          />
          <van-popup v-model="showIssues" position="bottom" :style="{ height: '30%' }">
            <van-picker
              show-toolbar
              :columns="columns"
              @cancel="showIssues = false"
              @confirm="onConfirm"
              :default-index="1"
              :cancel-button-text="$t('Cancel')"
              :confirm-button-text="$t('Determine')"
            />
          </van-popup>
        </div>
        <div class="main-item">
          <div class="title">{{$t('Security-answer')}}</div>
          <input v-model="answer" class="main-item-con" type="text" :placeholder="$t('AnswerTips')" />
        </div>
      </div>
      <p class="policy">
        <svg class="icon icon-read" aria-hidden="true" @click="onClickRead">
          <use v-if="isReaded" xlink:href="#icon-readed_1" />
          <use v-else xlink:href="#icon-unread" />
        </svg>
        {{$t('Agreement')}}
      </p>
      <div class="button-box">
        <div class="button" @click="onClickRegistery">{{$t('Registery')}}</div>
      </div>
    </div>
  </div>
</template>
<i18n>
	{
		"zh":{
			"Name": "昵称",
			"Portrait":"头像",
			"Gender":"性别",
			"Female":"女",
			"Male":"男",
      "Phone":"手机号",
      "IDCard": "身份证号",
			"Password":"密码",
			"Confirm-password":"确认密码",
			"Date":"出生日期",
			"Security-issues":"密保问题",
      "Security-answer":"密保答案",
      "Agreement":"《隐私政策》《服务条款》",
      "Registery": "注册",
      "NameTips":"请输入你的名字",
      "PhoneTips":"请输入你的手机号码",
      "IDCardTips":"请输入身份证号",
      "PasswordTips":"请输入密码",
      "ConfirmPasswordTips":"请确认密码",
      "DateTips":"请选择你的生日",
      "IssuesTips":"请选择密保问题",
      "AnswerTips":"请输入答案",
      "Cancel":"取消",
      "Determine":"确定",
      "Date":"日期"
		},
		"en":{
			"Name": "Name",
			"Portrait":"Portrait",
			"Gender":"Gender",
			"Female":"Female",
			"Male":"Male",
      "Phone":"Phone",
      "IDCard": "IDCard",
			"Password":"Password",
			"Confirm-password":"Confirm password",
			"Date":"Date",
			"Security-issues":"Security issues",
      "Security-answer":"Security answer",
      "Agreement":"《Privacy policy》《Terms of service》",
      "Registery": "Sign up",
      "NameTips":"Please enter your name",
      "PhoneTips":"Please enter your phone number",
      "IDCardTips":"Please enter IDCard",
      "PasswordTips":"Please enter your password",
      "ConfirmPasswordTips":"Please Confirm password",
      "DateTips":"Please enter your date",
      "IssuesTips":"Please enter Security issues",
      "AnswerTips":"Please enter Security answer",
      "Cancel":"Cancel",
      "Determine":"Determine",
      "toast1":"Determine",
      "toast2":"Determine",
      "toast3":"Determine",
      "Date":"Date"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LoginService from "../../service/login";
import AbusTitle from "../../components/AbusTitle.vue";

@Component({
  name: "Registery",
  components: {
    AbusTitle,
  },
})
export default class Register extends Vue {
  private fileList: Array<any> = [];
  private radio: string = "0";
  private show: boolean = false;
  private showIssues: boolean = false;
  private isReaded: boolean = false;
  // date
  private minDate: Date = new Date(1920, 1, 1);
  private maxDate: Date = new Date(2020, 7, 1);
  private currentDate: Date = new Date(2000, 1, 15);
  private datetime: string = "";
  private columns: Array<any> = [
    "My father's name?",
    "My mother's name?",
    "My favorite singer?",
    "My favorite animal?",
  ];
  // 校验密码是否一致
  private isCheckPassword: boolean = false;
  // 用户输入信息
  private nickname: string = "";
  private phone: string = "";
  private idCard: string = "";
  private birthday: string = "";
  private password: string = "";
  private confirmPassword: string = "";
  private question: string = "";
  private answer: string = "";
  private mounted() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
      this.columns = [
        "我爸爸的名字?",
        "我妈妈的名字?",
        "我最喜欢的歌手?",
        "我最喜欢的动物?",
      ];
    }
  }

  public getUserPhoneLength(e:any){
    if(e.target.value.length >= 11 && e.keyCode != 8){
      this.$toast('数字不可以超出11位')
      this.phone = e.target.value.substring(0,10)
    }
  }
  public showPopup() {
    if (this.isCheckPassword) {
      this.show = true;
    }else{
      this.$toast('请先正确填写密码')
    }
  }
  public showQuestion() {
    this.showIssues = true;
  }
  public onConfirm(value: any) {
    this.question = value;
    this.showIssues = false;
  }
  public onClickRead() {
    this.isReaded = !this.isReaded;
  }
  public getConfirmData(val: any) {
    this.show = false;
    this.currentDate = val;
    this.datetime =
      val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate();
    this.birthday =
      this.datetime +
      " " +
      val.getHours() +
      ":" +
      val.getMinutes() +
      ":" +
      val.getSeconds();
    return val;
  }
  public checkUserPassword(e: any) {
    if (e.target.value.length < 6) {
      this.$toast("密码不能少于6位");
    }
  }
  public checkPassword() {
    if (this.password != this.confirmPassword) {
      this.isCheckPassword = false;
      this.$toast("Password inconsistency");
    } else {
      this.isCheckPassword = true;
    }
  }
  public onClickRegistery() {
    if (
      this.phone != "" &&
      this.idCard != "" &&
      this.isCheckPassword &&
      this.isReaded
    ) {
      // (['nickname','gender','phone','idCard','password','birthday','question','answer']);

      var data = {
        nickname: this.nickname,
        gender: this.radio,
        phone: "86_" + this.phone,
        idCard: this.idCard,
        password: this.password,
        birthday: this.birthday,
        question: this.question,
        answer: this.answer,
      };
      // console.log(this.radio);
      LoginService.postUserRegistery(data).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          // 存储用户信息
          // 写入成功后，判断是否有座位
          this.$store
            .dispatch("setUserInfo", {
              name: res.data.userName,
              token: res.data.access_token,
              id: res.data.airbusId,
            })
            .then((res: any) => {
              LoginService.getUserMe().then((res: any) => {
                // AvatarPath: ""
                // DisplayName: "mizao"
                // Email: null
                // Flow: {flow: -1}
                // Id: "3a03a40ac79b4f0d6eef58fcd99271d7"
                // IsWeChatBinded: false
                // NickName: "mizao"
                // PhoneNumber: "13570492375"
                // Seat:{
                // Id: "1"
                // Name: "1A"
                // col: 1
                // col-number: 1
                // row: 1
                // }
                // __proto__: Object
                // UserName: "86_13570492375"
                // WeChatId: null
                // points: "2000"
                if (res.code == 200 && res.data.Seat == null) {
                  this.$router.push({
                    name: "selectSeat",
                  });
                } else if (res.code == 200 && res.data.Seat.Name) {
                  this.$store.commit("setSeatNumber", res.data.Seat.Name);
                  this.$router.push({
                    name: "home",
                  });
                }
              });
            });
        } else {
          this.$toast(res.message);
        }
      });
      // .catch((reason: any) => {
      //   this.$toast("The current mobile number is registered");
      // });
    } else if (!this.isCheckPassword) {
      this.$toast("Password inconsistency");
    } else if (!this.isReaded) {
      this.$toast("Have you read the 《Privacy policy》《Terms of service》");
    } else {
      this.$toast("Please complete the information");
    }
  }
}
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
    .location {
      position: relative;
      .data-icon {
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
        width: 0.32rem;
        height: 0.32rem;
      }
    }
  }
}
.text-selected,
.text-unselected {
  font-size: 0.24rem !important;
}
.img-icon {
  width: 0.24rem;
  height: 0.24rem;
}
.policy {
  margin-left: 0.3rem;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0.64rem;
  font-size: 0.28rem;
}
.button-box {
  margin: 0.1rem 0.3rem 0.5rem;
  .button {
    width: 100%;
    height: 0.8rem;
    background: rgba(0, 32, 91, 1);
    border-radius: 0.4rem;
    text-align: center;
    line-height: 0.8rem;
    color: #fff;
    font-weight: bold;
  }
}
.text-selected {
  margin: 0 0 0 0.1rem;
  color: rgba(51, 51, 51, 1);
  line-height: 0.32rem;
  transition: all ease-in-out 0.3s;
}
.text-unselected {
  margin: 0 0 0 0.1rem;
  color: rgba(51, 51, 51, 0.3);
  line-height: 0.32rem;
  transition: all ease-in-out 0.3s;
}
.icon-text {
  font-size: 0.22rem;
  width: 0.22rem;
  height: 0.22rem;
}
.icon-read {
  width: 0.3rem;
  height: 0.3rem;
}
</style>