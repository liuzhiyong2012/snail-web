<template>
  <div class="news">
    <van-sticky>
      <van-nav-bar title="News">
        <template #left>
          <van-icon name="arrow-left" size="18" @click="goBack" />
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="abus-scroller-box">
      <banner :bannerData="bannerData" />
    </div>

    <van-tabs
      v-model="active"
      @click="changeTab()"
      sticky
      line-width="20"
      line-height="4"
      color="rgb(0,32,91)"
      title-active-color="rgb(0,32,91)"
    >
      <van-tab
        v-for="(val, index) in navTar"
        :title="val"
        title-active-color="#3056EF"
        :key="index"
      >
        <div v-if="val == navTar[index]" class="">
          <ul class="news-list">
            <news-list-item
              v-for="(item, index) in newsListBackup"
              :key="index"
              :newsItem.sync="item"
            ></news-list-item>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Banner from "@/components/banner";
import NewsListItem from "@/views/news/components/NewsListItem";
import NewsService from "../../service/news";
export default {
  components: {
    Banner,
    NewsListItem,
  },
  data() {
    return {
      bannerData: [],
      active: 0,
      navTar: ["所有", "收藏", "实事要闻", "娱乐新闻", "体育新闻"],

      newsList: [
        {
          id: "3249853",
          type: 2,
          isCollect: true,
          img: require("./images/news.jpg"),
          name:
            "The 2020 Olympic Games will be postponed Other space data indica Other space data indica",
          details:
            "The duo have had a t Other space data indica 工会 Other space data indica",
        },
      ],
      newsListBackup: [], //新闻列表备份
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getNewsList();
  },
  mounted() {},
  destroyed() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    getNewsList() {
      NewsService.getVideoList({}).then((res) => {
        if (res.code == "200") {
          this.newsList = res.data.News;
          this.newsListBackup = res.data.News;
          this.bannerData = res.data.News;
          this.bannerData.forEach((item) => {
            item.img = item.BannerImg;
          });
        }
      });
    },

    changeTab() {
      console.log(this.active);
      this.newsListBackup = [];
      if (this.active == 0) {
        this.newsListBackup = this.newsList;
      } else if (this.active == 1) {
        this.newsList.forEach((item) => {
          if (item.isCollect == true) {
            this.newsListBackup.push(item);
          }
        });
      } else {
        this.newsList.forEach((item) => {
          if (this.active == item.type) {
            this.newsListBackup.push(item);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.abus-scroller-box {
  margin: 0.2rem auto;
  padding: 0;
  width: 93%;
  overflow: hidden;
  height: 3.14rem;
  background: #fff;
}
.van-cell {
  font-weight: 500;
  padding-top: 0;
  padding-bottom: 0;
  span {
    color: #2e2e2e;
  }
}
.news-filter {
  /deep/ .van-ellipsis {
    font-size: 0.13rem;
  }
  /deep/ .van-dropdown-menu__bar {
    height: 0.7rem;
    box-shadow: 0 0 0 rgba(100, 101, 102, 0.08);
  }
  /deep/ .van-cell__title,
  .van-cell__value {
    font-size: 0.12rem;
  }
  .filter-btn {
    color: linear-gradient(to right, #4bb0ff, #6149f6);
  }
}
.news-list {
  background: #fff;
}
</style>
