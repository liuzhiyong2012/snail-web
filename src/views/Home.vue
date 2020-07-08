<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar title="Airbus">
        <template #right>
          <van-icon name="scan" size="18" />
        </template>
        <template #left>
          <van-icon name="chat" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <van-tabs
      v-model="active"
      scrollspy
      sticky
      offset-top="46"
      line-width="20"
      line-height="4"
      color="rgb(0,32,91)"
      title-active-color="rgb(0,32,91)"
    >
      <van-tab v-for="(val,index) in navTar" :title="val" title-active-color="#3056EF" :key="index">
        <div v-if="val == 'Flight'" class="flight">
          <home-flight />
        </div>
        <div v-else-if="val == 'Dish'">
          <home-dish />
        </div>
        <div v-else-if="val == 'Shopping'">
          <home-shopping />
        </div>
        <div v-else-if="val == 'Music'">
          <home-music />
        </div>
        <div v-else-if="val == 'Game'">
          <h3>Game</h3>
          <div class style="height:150px;"></div>
        </div>
        <div v-else-if="val == 'Video'">
          <h3>Video</h3>
          <div class style="height:150px;"></div>
        </div>
        <div v-else-if="val == 'News'">
          <h3>News</h3>
          <div class style="height:150px;"></div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeFlight from "@/views/home/HomeFlight";
import HomeDish from "@/views/home/HomeDish";
import HomeShopping from "@/views/home/HomeShopping";
import HomeMusic from "@/views/home/HomeMusic";
// import { getApprovalDetail } from "@/service/center";

export default {
  name: "Home",
  components: {
    HomeFlight,
    HomeDish,
    HomeShopping,
    HomeMusic
  },
  data() {
    return {
      navTar: ["Flight", "Dish", "Shopping", "Music", "Game", "Video", "News"]
    };
  },
  created() {
    //  getApprovalDetail({}).then((res) => {
    //     let  data = res.data;
    //   }).finally(() => {
    //   })
  }
};
</script>

<style scoped lang="scss">

</style>