<template>
  <div class="me"> 
    <abus-title title="Me" backRootName="home"></abus-title>
    <div class="user-info">
      <div class="user">
        <div class="user-img">
          <van-image
            round
            fit="cover"
            width="1.26rem"
            height="1.26rem"
            :src="userInfo.AvatarPath || 'https://img.yzcdn.cn/vant/cat.jpeg'"
          />  
        </div>
        <div class="f1">
          <div class="name" >{{userInfo.NickName|| '--'}}</div>
          <div class="phone">{{userInfo.PhoneNumber|| '--'}}</div>
        </div>
      </div>
      
      <router-link to="/me/pointsexchange">
        <div class="exchange">
          exchange
          <div class="icon-box">
            <span class="i-icon"></span>
            {{userInfo.points|| '--'}}
          </div>
        </div>
      </router-link>
    </div>
    <div class="cell-group mt2">
      <div class="cell-item" @click="stepToPage('myorder')">
        <div class="title">My order</div>
        <div class="f1">
          <svg class="icon icon-right" aria-hidden="true">
            <use xlink:href="#icon-youjiantou_1" />
          </svg>
        </div>
      </div>
        <div class="cell-item" @click="stepToPage('address')" >
          <div class="title">Shopping address</div>
          <div class="f1">
            <div class="icon-right-2">{{address}}</div>
            <svg class="icon icon-right" aria-hidden="true">
              <use xlink:href="#icon-youjiantou_1" />
            </svg>
          </div>
        </div>
        <div class="cell-item" @click="stepToPage('payment')">
          <div class="title">Payment method</div>
          <div class="f1">
            <svg class="icon icon-right-1" aria-hidden="true">
              <use v-if="payType == '1'" xlink:href="#icon-wechat-pay" />
						<use v-if="payType == '2'" xlink:href="#icon-ali-pay" />
						<use v-if="payType == '3'" xlink:href="#icon-credit-card" />
						<use v-if="payType == '4'" xlink:href="#icon-cash" />
            </svg>
            <svg class="icon icon-right" aria-hidden="true">
              <use xlink:href="#icon-youjiantou_1" />
            </svg>
          </div>
        </div>
        <div class="cell-item" @click="stepToPage('thirdaccount')">
          <div class="title">Other account number</div>
          <div class="f1">
            <svg class="icon icon-right" aria-hidden="true">
              <use xlink:href="#icon-youjiantou_1" />
            </svg>
          </div>
        </div>
        <div class="cell-item" @click="stepToPage('lang')">
          <div class="title">language</div>
          <div class="f1">
            <div class="icon-right-2">English</div>
            <svg class="icon icon-right" aria-hidden="true">
              <use xlink:href="#icon-youjiantou_1" />
            </svg>
          </div>
        </div>
    </div>

    <div class="cell-group mt2">
      <div class="cell-item">
        <div class="title">Privacy policy</div>
        <div class="f1">
          <svg class="icon icon-right" aria-hidden="true">
            <use xlink:href="#icon-youjiantou_1" />
          </svg>
        </div>
      </div>
      <div class="cell-item">
        <div class="title">Terms of service</div>
        <div class="f1">
          <svg class="icon icon-right" aria-hidden="true">
            <use xlink:href="#icon-youjiantou_1" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AbusTitle from "../../components/AbusTitle.vue";
import { Vue, Prop, Component } from "vue-property-decorator";
import MeServer from '../../service/me'

@Component({
  name: "meIndex",
  components: {
    AbusTitle,
  },
})
export default class meIndex extends Vue {
  private userInfo: Object = {}
  private address: string = ''
  private created() {
    this.getUserInfo()
    this.postAddress()
  }
  private get payType():number{
		return this.$store.state.me.payType;
  }
  public getUserInfo(){
// AvatarPath: ""
// DisplayName: "mizao"
// Email: null
// Flow:
// flow: null
// used: null
// __proto__: Object
// Id: "3a03a40ac79b4f0d6eef58fcd99271d7"
// IsWeChatBinded: false
// NickName: "mizao"
// PhoneNumber: "13570492375"
// Seat: null
// UserName: "86_13570492375"
// WeChatId: null
    MeServer.getUserInfo().then((res:any)=>{
      console.log(res)
      if(res.code == 200){
        this.userInfo = res.data
        
      }
    })
  }
  public postAddress(){
    MeServer.postAddress().then((res: any) => {
      if(res.code == 200) {
        this.address = res.data.Address
        this.$store.dispatch('setAddressData',{
          data: res.data.Address
        })
      }
    })
  }
  public stepToPage(pageType: any) {
    let routeMap: any = {
      exchange: "pointsExchange",
      address: "address",
      payment: "payment",
      myorder: "myOrder",
      lang: "lang",
      thirdaccount: "thirdAccount",
    };
    if (routeMap[pageType]) {
      this.$router.push({
        name: routeMap[pageType],
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.me {
  min-height: 100vh;
}
.user-info {
  padding: 0.45rem 0.3rem 0.3rem;
  background: #fff;
  .user {
    display: flex;
    .user-img {
      align-content: space-around;
      margin: 0 0.2rem 0 0;
      width: 1.26rem;
      height: 1.26rem;
    }
    .f1 {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      line-height: 0.6rem;
      .name {
        width: 100%;
        font-size: 0.46rem;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .phone {
        width: 100%;
        font-size: 0.26rem;
        color: #999;
      }
    }
  }
  .exchange {
    position: relative;
    box-sizing: border-box;
    margin: 0.3rem 0 0;
    padding: 0 0 0 0.3rem;
    width: 100%;
    height: 0.8rem;
    background-color: #00205b;
    border-radius: 0.1rem;
    color: #fff;
    line-height: 0.8rem;
    font-size: 0.32rem;
    font-weight: bold;
    .icon-box {
      position: absolute;
      right: 0;
      top: 0.16rem;
      padding: 0 0.1rem 0 0;
      background-color: #00aec7;
      height: 0.48rem;
      line-height: 0.48rem;
      font-weight: 400;
      font-style: oblique;
      .i-icon {
        position: absolute;
        top: 0;
        left: -0.8rem;
        width: 0.8rem;
        height: 0.48rem;
        background-position-x: 0.3rem;
        background-image: url("./images/rectangle.png");
        background-repeat: no-repeat;
      }
    }
  }
}
.mt2 {
  margin: 0.2rem 0 0 0;
}
.cell-group {
  background-color: #fff;
  .cell-item {
    display: flex;
    padding: 0 0.3rem;
    line-height: 1rem;
    .title {
      font-size: 0.32rem;
      color: rgba(51, 51, 51, 1);
    }
    .f1 {
      position: relative;
      flex: 1;
      .icon-right {
        position: absolute;
        right: -0.3rem;
        padding: 0.3rem;
      }
      .icon-right-1 {
        position: absolute;
        right: 0.1rem;
        padding: 0.3rem;
      }
      .icon-right-2 {
        position: absolute;
        right: 0.3rem;
        color: #999;
        max-width: 2.2rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>