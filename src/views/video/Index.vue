<template>
  <div class="home">
    <abus-title title="Video" backRouteName="home"></abus-title>
    <!-- backRouteName -->
    <van-tabs
      sticky
      line-width="20"
      line-height="4"
      color="rgb(0,32,91)"
      title-active-color="rgb(0,32,91)"
    >
      <van-tab v-for="(val,index) in navTar" :title="val" title-active-color="#3056EF" :key="index">
        <div v-if="val == 'All'" class="flight">
          <video-lists />
        </div>
        <div v-else-if="val == 'My collection'" class="flight">
          <video-list />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

import VideoLists from "@/views/video/components/VideoLists";
import VideoList from "@/views/video/components/VideoList";
import AbusTitle from "../../components/AbusTitle.vue";
export default {
  name: "Video",
  components: {
    VideoList,
    VideoLists,
    AbusTitle
  },
  data() {
    return {
      navTar: ["All","My collection"],
      imagesData: [
        {
          img: require("./images/video.jpg"),
          name: "name0",
          details: "details"
        },
        {
          img: require("./images/video.jpg"),
          name: "name",
          details: "details"
        },
        {
          img: require("./images/video.jpg"),
          name: "name",
          details: "details"
        }
      ]
    };
  },
  created() {

  }
};
</script>
 
<style scoped lang="scss">
.home {
  padding: 0 0 0.5rem 0;
  .video-top{
    margin: .3rem 0 0;
  }
}
.van-tab--active {
  font-weight: 600;
}
</style>