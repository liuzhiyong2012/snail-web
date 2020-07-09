<template>
  <div>
    <div class="banner">
      <banner :bannerData="goodsData" />
    </div>
    <van-tabs v-model="active" animated>
      <van-tab v-for="(item,index) in 8" :title="'选项 ' + index" :key="index">内容 {{ index }}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Banner from "@/components/banner";
export default {
  components: {
    Banner
  },
  data() {
    return {
      goodsData: [
        {
          img: require("./images/goods.jpg"),
          name: "goodsName",
          details: "goodsDetails"
        },
        {
          img: require("./images/goods.jpg"),
          name: "goodsName",
          details: "goodsDetails"
        },
        {
          img: require("./images/goods.jpg"),
          name: "goodsName",
          details: "goodsDetails"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 2.5rem;
}
</style>