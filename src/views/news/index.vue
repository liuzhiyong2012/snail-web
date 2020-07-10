<template>
  <div class="news">
    <van-sticky>
      <van-nav-bar title="News">
        <template #left>
          <van-icon name="arrow-left" size="18" @click="goBack" />
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="abus_scroller_box">
      <banner :bannerData="bannerData" />
    </div>

    <h2 class="abus_block_title">
      <van-cell center title="Filter" icon="filter-o">
        <span>Sort by:</span>
        <template #right-icon>
          <div class="news_filter">
            <van-dropdown-menu>
              <van-dropdown-item
                v-model="filterValue"
                :options="filterOption"
                @change="filterFun"
              />
            </van-dropdown-menu>
          </div>
        </template>
      </van-cell>
    </h2>

    <ul class="news_list">
      <li
        is="news-list-item"
        v-for="(item, index) in newsList"
        :key="index"
        v-bind:newsItem="item"
        @click.native="goToDetail(item.id)"
      ></li>
    </ul>
  </div>
</template>

<script>
import Banner from "@/components/banner";
import NewsListItem from "@/views/news/components/NewsList";
export default {
  components: {
    Banner,
    NewsListItem,
  },
  data() {
    return {
      bannerData: [
        {
          img: require("./images/news_banner.png"),
          name: "goodsName",
          details: "goodsDetails",
        },
        {
          img: require("./images/news_banner.png"),
          name: "goodsName",
          details: "goodsDetails",
        },
        {
          img: require("./images/news_banner.png"),
          name: "goodsName",
          details: "goodsDetails",
        },
      ],

      filterValue: 0,
      filterOption: [
        { text: "recommend", value: 0 },
        { text: "default", value: 1 },
        { text: "hot-most", value: 2 },
      ],

      newsList: [
        {
          id: "3249853",
          isCollect: true,
          img: require("./images/news.jpg"),
          name:
            "The 2020 Olympic Games will be postponed Other space data indica Other space data indica",
          details:
            "The duo have had a t Other space data indica 工会 Other space data indica",
        },
        {
          id: "32453654",
          isCollect: true,
          img: require("./images/goods.jpg"),
          name: "Taylor Swift and Kanye West's phone call leaks",
          details: "Thousands of passengers",
        },
        {
          id: "32654453",
          isCollect: false,
          img: require("./images/news_banner.png"),
          name: "Earth's deepest ice canyon vulnerable to melting",
          details: "Other space data indica",
        },
        {
          id: "32456543",
          isCollect: false,
          img: require("./images/news.jpg"),
          name: "How did Australia's Ruby Princess cruise happen?",
          details: "Other space data indica GREWHG ",
        },
        {
          id: "3243253",
          isCollect: true,
          img: require("./images/news.jpg"),
          name: "Tom Hanks and Rita Wilson ‘feel better’ after coron gfdgf grdg ",
          details: "Other space data indica 规范和投入让他",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    filterFun(val) {
      console.log("11", val);
      console.log("22", this.filterValue);
    },
    goToDetail(id) {
      //进入新闻详情
      this.$router.push({
        name: "newsDetail",
        query: {
          newsId: id,
        },
      }); //跳转链接
    },
  },
};
</script>

<style lang="scss" scoped>
.abus_scroller_box {
  margin: 0.3rem auto 0.1rem;
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
.news_filter {
  /deep/ .van-ellipsis {
    font-size: 0.13rem;
  }
  /deep/ .van-dropdown-menu__bar {
    height: 0.7rem;
    box-shadow: 0 0 0 rgba(100, 101, 102, 0.08);
  }
  /deep/ .van-cell__title, .van-cell__value {
    font-size: 0.12rem;
  }
  .filter_btn {
    color: linear-gradient(to right, #4bb0ff, #6149f6);
  }
}
.news_list {
  background: #fff;
}
</style>
