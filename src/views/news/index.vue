<template>
  <div class="news">
    <van-sticky>
      <van-nav-bar title="News">
        <template #left>
          <van-icon name="arrow-left" size="18" @click="goBack" />
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="banner">
      <banner :bannerData="goodsData" />
    </div>

    <div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
    </div>

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
      goodsData: [
        {
          img: require("./images/goods.jpg"),
          name: "goodsName",
          details: "goodsDetails",
        },
        {
          img: require("./images/goods.jpg"),
          name: "goodsName",
          details: "goodsDetails",
        },
        {
          img: require("./images/goods.jpg"),
          name: "goodsName",
          details: "goodsDetails",
        },
      ],

      value1: 0,
      value2: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" },
      ],

      newsList: [
        {
          id: "3249853",
          isCollect: true,
          img: require("./images/news.jpg"),

          name:
            "The 2020 Olympic Games will be postponed Other space data indica… Other space data indica…",
          details:
            "The duo have had a t Other space data indica… Other space data indica…",
        },
        {
          id: "32453654",
          isCollect: true,
          img: require("./images/news.jpg"),
          name: "Taylor Swift and Kanye West's phone call leaks",
          details: "Thousands of passengers",
        },
        {
          id: "32654453",
          isCollect: false,
          img: require("./images/news.jpg"),
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
          name: "Tom Hanks and Rita Wilson ‘feel better’ after coron…gfdgf",
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
    goToDetail(id) {
      //进入商品详情
      this.$router.push({
        name: "newsDetail",
        query: {
          productId: id,
          lastFrom: "home",
          //   productId: 15922656
        },
      }); //跳转链接
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  width: 92%;
  margin: 0 auto;
  border-radius: 0.1rem;
  height: 2.6rem;
}
.news_list {
  background: #ffffff;
}
</style>
