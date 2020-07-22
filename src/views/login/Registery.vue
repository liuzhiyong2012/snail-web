<template>
  <div class="registery">
    <div class="con">
      <div class="main-item">
        <div class="title line-h">Name</div>
        <input
          v-model="nickname"
          class="main-item-con"
          type="text"
          placeholder="Please enter  your name"
        />
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
          <van-radio name="0">
            <template #icon="props">
              <svg class="icon icon-text" aria-hidden="true">
                <use v-if="props.checked" xlink:href="#icon-selected" />
                <use v-else xlink:href="#icon-unselected" />
              </svg>
              <!-- <i
                :class="[props.checked ? 'icon icon-selected icon-text': 'icon icon-unselected icon-text']"
              ></i>-->
              <span :class="[props.checked ? 'text-selected': 'text-unselected']">Female</span>
            </template>
          </van-radio>
          <van-radio name="1">
            <template #icon="props">
              <svg class="icon icon-text" aria-hidden="true">
                <use v-if="props.checked" xlink:href="#icon-selected" />
                <use v-else xlink:href="#icon-unselected" />
              </svg>
              <!-- <i
                :class="[props.checked ? 'icon icon-selected icon-text': 'icon icon-unselected icon-text']"
              ></i>-->
              <span :class="[props.checked ? 'text-selected': 'text-unselected']">Male</span>
            </template>
          </van-radio>
        </van-radio-group>
      </div>
      <div class="main-item">
        <div class="title line-h">Phone</div>
        <input
          v-model="phone"
          class="main-item-con"
          type="text"
          placeholder="Please enter your phone number"
        />
      </div>
      <div class="main-item">
        <div class="title line-h">IDCard</div>
        <input v-model="idCard" class="main-item-con" type="text" placeholder="Please enter IDCard" />
      </div>
      <div class="main-item">
        <div class="title line-h">Password</div>
        <input
          v-model="password"
          class="main-item-con"
          type="password"
          placeholder="Please enter password"
        />
      </div>
      <div class="main-item">
        <div class="title">Confirm password</div>
        <input
          v-model="confirmPassword"
          @blur="checkPassword"
          class="main-item-con"
          type="password"
          placeholder="Please Confirm password"
        />
      </div>
      <div class="main-item">
        <div class="title line-h">Date</div>
        <input
          class="main-item-con"
          @click="showPopup"
          :value="datetime"
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
        <input
          @click="showQuestion"
          class="main-item-con"
          type="text"
          :value="question"
          placeholder="Please enter Security issues"
        />
        <van-popup v-model="showIssues" position="bottom" :style="{ height: '30%' }">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showIssues = false"
            @confirm="onConfirm"
            :default-index="1"
            cancel-button-text="cancel"
            confirm-button-text="determine"
          />
        </van-popup>
      </div>
      <div class="main-item">
        <div class="title">Security answer</div>
        <input
          v-model="answer"
          class="main-item-con"
          type="text"
          placeholder="Please enter Security answer"
        />
      </div>
    </div>
    <p class="policy">
      <svg class="icon icon-read" aria-hidden="true" @click="onClickRead">
        <use v-if="isReaded" xlink:href="#icon-readed1" />
        <use v-else xlink:href="#icon-unread" />
      </svg>
      《Privacy policy》《Terms of service》
    </p>
    <div class="button-box">
      <div class="button" @click="onClickRegistery">Registery</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LoginServe from "../../service/login";

@Component({
  name: "Registery",
  components: {}
})
export default class Register extends Vue {
  private fileList: Array<any> = [];
  private radio: string = "0";
  private show: boolean = false;
  private showIssues: boolean = false;
  private isReaded: boolean = false;
  // date
  private minDate: Date = new Date(1920, 1, 1);
  private maxDate: Date = new Date();
  private currentDate: Date = new Date(2000, 1, 15);
  private datetime: string = "";
  private columns: Array<any> = [
    "My father's name?",
    "My mother's name?",
    "My favorite singer?",
    "My favorite animal?"
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
  showPopup() {
    if (this.isCheckPassword) {
      this.show = true;
    }
  }
  showQuestion() {
    this.showIssues = true;
  }
  onConfirm(value: any) {
    this.question = value;
    this.showIssues = false;
  }
  onClickRead() {
    this.isReaded = !this.isReaded;
  }
  getConfirmData(val: any) {
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
  checkPassword() {
    if (this.password != this.confirmPassword) {
      this.isCheckPassword = false;
      this.$toast("Password inconsistency");
    } else {
      this.isCheckPassword = true;
    }
  }
  onClickRegistery() {
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
        phone: this.phone,
        idCard: this.idCard,
        password: this.password,
        birthday: this.birthday,
        question: this.question,
        answer: this.answer
      };
      console.log(this.radio)
      LoginServe.postUserRegistery(data).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          // 存储用户信息
          this.$router.push({
            path: "/login"
          });
        } else {
          this.$toast(res);
        }
      });
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
  }
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
    font-family: Helvetica-Bold, Helvetica;
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