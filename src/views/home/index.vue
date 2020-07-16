<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar title="Airbus" @click-right="showPopup">
        <template #right>
          <van-icon name="scan" size="18" />
        </template>
        <template #left>
          <van-icon name="chat" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <van-popup v-model="show">
      <div class="popup-toast">
        <div class="title">Connet To The Internet</div>
        <div class="surplus">
          <span class="now">Now</span>0 GB
        </div>
        <div class="cell-group">
          <div class="cell">
            <div class="cell-l">12323123</div>
            <div class="cell-r">$12332</div>
          </div>
          <div class="cell">
            <div class="cell-l">12323123</div>
            <div class="cell-r">$12332</div>
          </div>
          <div class="cell">
            <div class="cell-l">12323123</div>
            <div class="cell-r">$12332</div>
          </div>
          <div class="cell">
            <div class="cell-l vip">Vip</div>
            <div class="cell-r buy">Buy</div>
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showService">
      <div class="popup-toast">
        <div class="title service">
          Terms of Service
          <br />& Privacy Policy
        </div>
        <div class="con">
          We have updated our <span class="txt">privacy policy</span>
          to comply with the latest laws and regulations. The updated policy explains the mechanism of how we collect and treat your personal data.
          <span class="txt">tems of service</span>
          You can learn more about the rights you have by reading our .Please read them carefully.By clicking AGREE,you indicate that you have read and agreed to our privacy policies.
        </div>
        <div class="btn">Agree</div>
        <div class="btn later">later</div>
      </div>
    </van-popup>
    <van-tabs
      v-model="active"
      scrollspy
      sticky
      offset-top="46"
      line-width="20"
      line-height="4"
      color="rgb(0,32,91)"
      title-active-color="rgb(0,32,91)"
    >
      <van-tab v-for="(val,index) in navTar" :title="val" title-active-color="#3056EF" :key="index">
        <div v-if="val == 'Flight'" class="flight">
          <home-flight />
        </div>
        <div v-else-if="val == 'Dish'">
          <home-dish />
        </div>
        <div v-else-if="val == 'Shopping'">
          <home-shopping />
        </div>
        <div v-else-if="val == 'Music'">
          <home-music />
        </div>
        <div v-else-if="val == 'Game'">
          <home-game :imgData="imagesData" />
        </div>
        <div v-else-if="val == 'Video'">
          <home-video />
        </div>
        <div v-else-if="val == 'News'">
          <home-news />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeFlight from "@/views/home/components/HomeFlight";
import HomeDish from "@/views/home/components/HomeDish";
import HomeShopping from "@/views/home/components/HomeShopping";
import HomeMusic from "@/views/home/components/HomeMusic";
import HomeGame from "@/views/home/components/HomeGame";
import HomeVideo from "@/views/home/components/HomeVideo";
import HomeNews from "@/views/home/components/HomeNews";
// import { getApprovalDetail } from "@/service/center";

export default {
  name: "Home",
  components: {
    HomeFlight,
    HomeDish,
    HomeShopping,
    HomeMusic,
    HomeGame,
    HomeVideo,
    HomeNews
  },
  data() {
    return {
      show: false,
      showService: true,
      navTar: ["Flight", "Dish", "Shopping", "Music", "Game", "Video", "News"],
      imagesData: [
        {
          img: require("./images/game.jpg"),
          name: "name0",
          details: "details"
        },
        {
          img: require("./images/game.jpg"),
          name: "name",
          details: "details"
        },
        {
          img: require("./images/game.jpg"),
          name: "name",
          details: "details"
        }
      ]
    };
  },
  created() {
    clearTimeout();
    setTimeout(()=>{
      this.showService = false
    },1000)
    //  getApprovalDetail({}).then((res) => {
    //     let  data = res.data;
    //   }).finally(() => {
    //   })
  },
  methods: {
    showPopup() {
      this.show = true;
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  padding: 0 0 0.5rem 0;
}
.van-tab--active {
  font-weight: 600;
}
.van-popup {
  background-color: rgba(255, 255, 255, 0);
}
.popup-toast {
  padding: 0 0 0.01rem;
  width: 5.42rem;
  background-color: #fff;
  border-radius: 0.12rem;
  .title {
    width: 100%;
    height: 1.2rem;
    background-color: #00205b;
    text-align: center;
    font-size: 0.36rem;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 1.2rem;
    border-radius: 0.12rem 0.12rem 0 0;
  }
  .service {
    padding: 0.3rem 0;
    height: auto;
    line-height: 0.42rem;
  }
  .con {
    padding: 0.3rem;
    background-color: #fff;
    font-size: 0.28rem;
    font-family: Helvetica;
    color: rgba(51, 51, 51, 1);
    line-height: 0.42rem;
    word-break: normal;
    word-wrap: break-word;
    .txt{
      color: #00205B;
      text-decoration: underline;
      font-weight: bold;
    }
  }
  .btn {
    margin: 0 0.3rem;
    background-color: #00205b;
    font-size: 0.34rem;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 0.74rem;
    text-align: center;
    border-radius: 0.37rem;
  }
  .later {
    margin: .3rem 0;
    padding: 0 .3rem;
    font-size: 0.26rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    background-color: #fff;
    line-height: .3rem;
    height: .5rem;
    
  }
  .surplus {
    padding: 0 0.3rem;
    text-align: right;
    background: #f2f4f7;
    line-height: 0.7rem;
    font-size: 0.28rem;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: rgba(0, 32, 91, 1);
    .now {
      margin: 0 0.2rem 0 0;
      font-size: 0.28rem;
      font-family: Helvetica;
      color: rgba(51, 51, 51, 1);
      font-weight: 400;
    }
  }
}

.cell-group {
  padding: 0.3rem 0.3rem 0.01rem;
  background-color: #fff;
  border-radius: 0 0 0.12rem 0.12rem;
  .cell {
    margin: 0 0 0.3rem 0;
    display: flex;
    font-size: 0.3rem;
    font-family: Helvetica;
    color: #2e2e2e;
    line-height: 0.36rem;
    .cell-r {
      flex: 1;
      text-align: right;
      font-size: 0.32rem;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: rgba(0, 32, 91, 1);
    }
    .vip {
      box-sizing: border-box;
      width: 45%;
      height: 0.66rem;
      border: 0.03rem solid #00205b;
      color: #00205b;
      text-align: center;
      line-height: 0.66rem;
      border-radius: 0.33rem;
      font-weight: bold;
    }
    .buy {
      margin: 0 0 0 10%;
      width: 45%;
      height: 0.66rem;
      background-color: #00205b;
      color: #fff;
      text-align: center;
      line-height: 0.66rem;
      border-radius: 0.33rem;
      font-weight: bold;
    }
    .t-bold {
      font-size: 0.35rem;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: rgba(46, 46, 46, 1);
      line-height: 0.42rem;
    }
  }
}
</style>