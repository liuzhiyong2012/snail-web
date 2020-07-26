<template>
  <section class="news-detail">
    <van-sticky>
      <van-nav-bar title="News">
        <template #left>
          <van-icon name="arrow-left" size="18" @click="goBack" />
        </template>
        <template #right>
          <span class="news-right-heart" v-show="newsDetail.isLike != null">
            <img
              :src="loveTrue"
              alt=""
              @click="changeCollect(newsDetail.Id, newsDetail.isLike)"
            />
          </span>
          <span class="news-right-heart" v-show="newsDetail.isLike == null">
            <img
              :src="loveFalse"
              alt=""
              @click="changeCollect(newsDetail.Id, newsDetail.isLike)"
            />
          </span>
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="" v-if="bannerData.length != 0">
      <banner :bannerData="bannerData" />
    </div>
    <div class="news-title">{{ newsDetail.Title }}</div>
    <div class="news-time">{{ newsDetail.CreatedAt }}</div>
    <div class="news-info" v-html="newsDetail.FullDescription"></div>
  </section>
</template>
<script>
import { localStore } from "@/utils/data-management";
import { mapState } from "vuex";
import Banner from "@/components/banner";
import DateUtils from '../../utils/date-utils';
export default {
  name: "",
  components: {
    Banner,
  },
  data() {
    return {
      loveTrue: require("./images/love_true.png"),
      loveFalse: require("./images/love_false.png"),
      newsDetail: {
        // BannerImg:
        //   "http://172.16.125.11:8010/0c48a0b7-b4b6-46d6-af34-8afb69c159d4",
        // Category: "2",
        // CreatedAt: 1554782586,
        // CreatedBy: {
        //   UserName: "yiwen",
        //   NickName: null,
        //   PhoneNumber: null,
        //   Email: "yiwen.mai@airbus.com",
        //   Id: "843123f8-2a24-4fa4-a624-59f370407214",
        // },
        // FullDescription: `
        // `,
        // Id: "f6638a60-7c5a-e911-962f-fb9f18fa3bb4",
        // ShortDescription:
        //   "Airbus Connected Experience goes from concept phase to reality",
        // ThumbsImg: [
        //   "http://172.16.125.11:8010/0c48a0b7-b4b6-46d6-af34-8afb69c159d4",
        // ],
        // Title: "Airbus Connected Experience goes from concept phase to reality",
        // img: "http://172.16.125.11:8010/0c48a0b7-b4b6-46d6-af34-8afb69c159d4",
        // isLike: null,
      },
      bannerData: [],
    };
  },
  computed: {
    ...mapState(["news"]),
  },
  created() {
    const _this = this;
    _this.bannerData = [];
    _this.newsDetail = {};
    _this.newsDetail = localStore.get("newsDetails");
    _this.bannerData.push(_this.newsDetail);
    _this.newsDetail.CreatedAt = DateUtils.formate(_this.newsDetail.CreatedAt);
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    changeCollect(Id, isLike) {
      if (isLike == null) {
        this.newsDetail.isLike = true;
      } else {
        this.newsDetail.isLike = null;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.news-right-heart {
  display: inline-block;
  img {
    position: absolute;
    right: 0;
    top: 0.1rem;
    width: 0.3rem;
    padding: 0.2rem;
  }
}

.news-title {
  padding: 0.25rem;
  line-height: 0.46rem;
  background: #fff;
  font-family: Helvetica-Bold, Helvetica;
  font-weight: bold;
  font-size: 0.32rem;
  color: #2e2e2e;
}
.news-time {
  padding: 0.1rem 0.25rem;
  height: 0.2rem;
  background: #fff;
  line-height: 0.2rem;
  font-family: Helvetica;
  font-size: 0.24rem;
  color: #ddc8c8;
}
.news-info {
  padding: 0.25rem;
  background: #fff;
  line-height: 0.36rem;
  font-family: Helvetica;
  text-align: justify;
  font-size: 0.3rem;
  color: #333333;
}
</style>
