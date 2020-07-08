<template>
  <van-swipe :autoplay="3000">
    <van-swipe-item :class="v-swipe-item" v-for="(image, index) in images" :key="index">
      <img v-lazy="image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import Vue from 'vue';
import { Lazyload } from 'vant';

Vue.use(Lazyload);
export default {
data() {
    return {
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.van-swipe-item{
  img{
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 140px;
    text-align: center;
  }
}
</style>