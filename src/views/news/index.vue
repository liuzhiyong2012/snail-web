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
      @click="changeTab"
      sticky
      line-width="20"
      line-height="4"
      color="rgb(0,32,91)"
      title-active-color="rgb(0,32,91)"
    >
      <van-tab
        v-for="(val, index) in navTar"
        :title="val.category"
        title-active-color="#3056EF"
        :key="index"
      >
        <div v-if="val.category == navTar[index].category" class="">
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

<script lang="ts">
import Banner from "../../components/banner.vue";
import NewsListItem from "./components/NewsListItem.vue";
import NewsService from "../../service/news";
import { localStore } from "../../utils/data-management";
import Tile from "ol/Tile";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "NewsList",
  components: {
    Banner,
    NewsListItem,
  },
})
export default class NewsList extends Vue {
  private bannerData: any = [];
  private active: any = 0;
  private navTar: any = [
    {
      Id: "-1",
      category: "所有",
      CreatedAt: false,
    },
    {
      Id: "0",
      category: "收藏",
      CreatedAt: false,
    },
  ];
  private newsList: any = [];
  private newsListBackup: any = [];

  private created() {
    this.getCategory(); //获取分类
    this.getNewsList(); //获取新闻列表

    this.postNewsMyLike(); //收藏列表
    // this.postNewsUnLike() //取消收藏
    // this.postNewsLike() // 进行收藏
    // this.postNewsIsLike() //是否已收藏
  }
  private mounted() {}
  private destroyed() {}

  public goBack(): void {
    this.$router.go(-1);
  }

  // 获取新闻列表
  public getNewsList(): void {
    NewsService.getNewsList({}).then((res) => {
      if (res.code == 200) {
        this.newsList = res.data.News;
        this.newsListBackup = res.data.News;
        this.bannerData = res.data.News;
        this.bannerData.forEach((item) => {
          item.img = item.BannerImg;
        });
      }
    });
  }

  // 获取新闻的分类
  public getCategory(): void {
    NewsService.getNewsCategory({}).then((res) => {
      if (res.code == 200) {
        this.navTar = [...this.navTar, ...res.data];
      }
    });
  }

  // 切换分类
  public changeTab(name: number, title: string): void {
    this.newsListBackup = [];
    if (title == "所有") {
      this.newsListBackup = this.newsList;
    } else if (title == "收藏") {
      this.newsList.forEach((item) => {
        if (item.isLike != null) {
          this.newsListBackup.push(item);
        }
      });
    } else {
      let i = "";
      this.navTar.forEach((item) => {
        if (item.category == title) {
          i = item.Id;
        }
      });
      this.newsList.forEach((item) => {
        if (i == item.Category) {
          this.newsListBackup.push(item);
        }
      });
    }
  }

  // 我收藏的新闻
  public postNewsMyLike(): void {
    NewsService.postNewsMyLike({}).then((res) => {
      if (res.code == 200) {
        console.log("2222222", res);
      }
    });
  }

  // 取消收藏
  public postNewsUnLike(): void {
    NewsService.postNewsUnLike({
      Id: "48f918ed-ee33-e911-b13c-96af276fddb7",
    }).then((res) => {
      if (res.code == 200) {
        console.log("3333333", res);
      }
    });
  }

  // 进行收藏
  public postNewsLike(): void {
    NewsService.postNewsLike({
      Id: "48f918ed-ee33-e911-b13c-96af276fddb7",
    }).then((res) => {
      if (res.code == 200) {
        console.log("4444444", res);
      }
    });
  }

  // 是否已收藏
  public postNewsIsLike(): void {
    NewsService.postNewsIsLike({
      Id: "48f918ed-ee33-e911-b13c-96af276fddb7",
    }).then((res) => {
      if (res.code == 200) {
        console.log("555555", res);
      }
    });
  }
}
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
