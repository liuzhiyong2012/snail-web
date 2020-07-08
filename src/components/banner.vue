<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item class="van_swipe_item" v-for="(item, index) in bannerData" :key="index">
        <img v-lazy="item.img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";

Vue.use(Lazyload);
export default {
  props: ["bannerData"],
  data() {
    return {
      
    };
  }
};
</script>

<style lang="scss" scoped>
.van_swipe_item {
  img {
    display: block;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
  }
}
</style>