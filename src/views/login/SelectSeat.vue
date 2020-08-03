<template>
  <div class="registery">
    <div class="con">
      <div class="main-item">
        <div class="title line-h">Name</div>
        <p class="main-p">Vision Airlines VA3928</p>
      </div>
      <div class="main-item">
        <div class="title line-h">Name</div>
        <input
          v-model="seat"
          @click="showSeat"
          class="main-item-con"
          type="text"
          placeholder="Please enter  your name"
        />
        <van-popup v-model="showIssues" position="bottom" :style="{ height: '30%' }">
          <van-picker
            show-toolbar
            :columns="columnsName"
            @cancel="showIssues = false"
            @confirm="onConfirm"
            :default-index="1"
            cancel-button-text="cancel"
            confirm-button-text="determine"
          />
        </van-popup>
      </div>
    </div>
    <div class="button-box">
      <div class="button" @click="getCrmSelectSeat">Registery</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LoginServer from "../../service/login";

@Component({
  name: "SelectSeat",
  components: {},
})
export default class SelectSeat extends Vue {
  private seat: string = "";
  private seatId: string = "";
  private showIssues: boolean = false;
  private columns: Array<any> = [];
  private columnsName: Array<string> = [];

  private created() {
    // this.getCrmSeatInfo()
    this.getCrmOtherSeatList();
  }

  public showSeat() {
    this.showIssues = true;
  }
  public onConfirm(value: any) {
    this.seat = value;
    this.showIssues = false;
  }
  public getCrmSeatInfo() {
    LoginServer.getCrmSeatInfo().then((res: any) => {
      console.log(res);
    });
  }
  public getCrmOtherSeatList() {
    LoginServer.getCrmOtherSeatList().then((res: any) => {
      console.log(res);
      if (res.code == 200) {
        this.columns = res.data;
        this.columns.forEach((item: any, index: any) => {
          this.columnsName.push(item.Name);
        });
      }
    });
  }
  public getCrmSelectSeat() {
    this.columns.forEach((item: any, index: any) => {
      if (item.Name == this.seat) {
        this.seatId = item.id;
        return;
      }
    });
    if (this.seatId != "") {
      LoginServer.getCrmSelectSeat(this.seatId).then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          this.$toast(res.data)
          this.$router.push({
            name: "login",
          });
        }
      });
    }
  }
  public onClickRegistery() {
    // 接口
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
      .main-p {
        flex: 1;
        color: #333;
        line-height: 0.8rem;
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
    font-weight: bold;
  }
}
</style>