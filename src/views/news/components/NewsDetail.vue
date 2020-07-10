<template>
  <section class="news_detail">
    <van-sticky>
      <van-nav-bar title="News">
        <template #left>
          <van-icon name="arrow-left" size="18" @click="goBack" />
        </template>
        <template #right>
          <span class="news_right_heart" v-if="newsDetail.isCollect">
            <img :src="loveTrue" alt="" @click="changeCollect" />
          </span>
          <span class="news_right_heart" v-else>
            <img :src="loveFalse" alt="" @click="changeCollect" />
          </span>
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="">
      <banner :bannerData="bannerData" />
    </div>
    <div class="news_title">{{ newsDetail.name }}</div>
    <div class="news_time">{{ newsDetail.time }}</div>
    <div class="news_info" v-html="newsDetail.details"></div>
  </section>
</template>
<script>
import Banner from "@/components/banner";
export default {
  name: "newsDetail",
  components: {
    Banner,
  },
  data() {
    return {
      loveTrue: require("../images/love_true.png"),
      loveFalse: require("../images/love_false.png"),
      newsDetail: {
        id: "3249853",
        time: "2020.03.04",
        isCollect: false,
        img: require("../images/news.jpg"),
        name:
            "The 2020 Olympic Games will be postponed Other space data indica Other space data indica The 2020 Olympic Games will be postponed Other space data indica Other space data indica",
        details: `A private healthcare clinic in London has defended its decision to charge £375 ($434) for a coronavirus test.<br />

                The Private Harley Street Clinic said the price reflected "the costs of these logistic and clinical services that we provide" and added that it was offering free tests for NHS staff.

                It followed newspaper reports that the clinic had sold several thousand at full price. <br />

                According to its website, the test is no longer available. <br />

                In a statement released on Monday, the clinic said it was "pausing" the service now that the UK 
                government has committed to carrying out more tests nationwide, with a commitment to carrying out 25,000 tests a day within four weeks. <br>

                Chief executive Dr Mark Ali did not respond to the BBC's request for comment. <br>

                It is believed the test offered was made by a firm called Randox Health, which was selling them online for £120 each, although according to its website it is currently out of stock.
                Randox Health was also contacted by the BBC.`,
      },
      bannerData: [
        {
          img: require("../images/news_banner.png"),
          name: "goodsName",
          details: "goodsDetails",
        },
        {
          img: require("../images/news_banner.png"),
          name: "goodsName",
          details: "goodsDetails",
        },
      ],
    };
  },
  computed: {
    Newsid() {
      return this.$route.query.Newsid;
    },
  },
  created() {
    // this.getNewDetails();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    changeCollect(val) {
      this.newsDetail.isCollect = !this.newsDetail.isCollect;
    },
    // async getNewDetails() {
    //   let res = await this.httpPost("News/GetNewsDetail", {
    //     Newsid: this.Newsid
    //   });
    //   if (res) {
    //     console.log(res);
    //     this.newsDetails = res.Data;
    //   }
    // }
  },
};
</script>
<style lang="scss" scoped>
.news_right_heart {
  display: inline-block;
  img {
    position: absolute;
    right: 0;
    top: 0.1rem;
    width: 0.3rem;
    padding: 0.2rem;
  }
}

.news_title {
  padding: 0.25rem;
  line-height: 0.46rem;
  background: #fff;
  font-family: Helvetica-Bold, Helvetica;
  font-weight: bold;
  font-size: 0.32rem;
  color: #2e2e2e;
}
.news_time {
  padding: 0.1rem 0.25rem;
  height: 0.2rem;
  background: #fff;
  line-height: 0.2rem;
  font-family: Helvetica;
  font-size: 0.24rem;
  color: #ddc8c8;
}
.news_info {
  padding: 0.25rem;
  background: #fff;
  line-height: 0.36rem;
  font-family: Helvetica;
  text-align: justify;
  font-size: 0.3rem;
  color: #333333;
}
</style>
