<template>
  <section class="news-detail">
    <van-sticky>
      <van-nav-bar title="News">
        <template #left>
          <van-icon name="arrow-left" size="18" @click="goBack" />
        </template>
        <template #right>
          <div @click="changeCollect(newsDetail.Id)">
            <span
              class="news-right-heart"
              v-show="newsDetail.isCollect == true"
            >
              <img :src="loveTrue" alt="" />
            </span>
            <span
              class="news-right-heart"
              v-show="newsDetail.isCollect == false"
            >
              <img :src="loveFalse" alt="" />
            </span>
          </div>
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
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { localStore } from "../../utils/data-management";
import Banner from "../../components/banner.vue";
import DateUtils from "../../utils/date-utils";
import NewsService from "../../service/news";
declare function require(string): string;

@Component({
  name: "NewsDetailPage",
  components: {
    Banner,
  },
})
export default class NewsDetailPage extends Vue {
  private loveTrue = require("./images/love_true.png");
  private loveFalse = require("./images/love_false.png");
  private newsDetail: any = {};
  private bannerData: any = [];

  private created() {
    const _this = this;
    _this.newsDetail = {};
    _this.bannerData = [];
    _this.newsDetail = localStore.get("newsDetails");
    _this.bannerData.push(_this.newsDetail);
    _this.newsDetail.CreatedAt = DateUtils.formate(_this.newsDetail.CreatedAt);
  }
  private mounted() {}

  public goBack(): void {
    this.$router.go(-1);
  }

  public changeCollect(Id: string): void {
    this.postNewsIsLike(Id);
  }

  // 是否已收藏
  public postNewsIsLike(val: string) {
    const _this = this;
    NewsService.postNewsIsLike({
      id: val,
    }).then((res) => {
      if (res.code == 200) {
        if (res.data == true) {
          _this.postNewsUnLike(val);
        } else if (res.data == false) {
          _this.postNewsLike(val);
        }
      }
    });
  }

  // 进行收藏
  public postNewsLike(val: string) {
    NewsService.postNewsLike({
      id: val,
    }).then((res) => {
      if (res.code == 200) {
        console.log("进行收藏", res);
        this.newsDetail.isCollect = true;
      }
    });
  }

  // 取消收藏
  public postNewsUnLike(val: string) {
    NewsService.postNewsUnLike({
      id: val,
    }).then((res) => {
      if (res.code == 200) {
        console.log("取消收藏", res);
        this.newsDetail.isCollect = false;
      }
    });
  }
}
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
  font-weight: bold;
  font-size: 0.32rem;
  color: #2e2e2e;
}
.news-time {
  padding: 0.1rem 0.25rem;
  height: 0.2rem;
  background: #fff;
  line-height: 0.2rem;
  font-size: 0.24rem;
  color: #ddc8c8;
}
.news-info {
  padding: 0.25rem;
  background: #fff;
  line-height: 0.36rem;
  text-align: justify;
  font-size: 0.3rem;
  color: #333333;
}
</style>
