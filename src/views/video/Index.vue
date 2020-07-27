<template>
  <div class="home">
    <van-tabs
      v-model="active"
      scrollspy
      sticky
      line-width="20"
      line-height="4"
      color="rgb(0,32,91)"
      title-active-color="rgb(0,32,91)"
    >
      <van-tab v-for="(val,index) in navTar" :title="val" title-active-color="#3056EF" :key="index">
        <div v-if="val == 'Video'" class="flight">
          <video-list />
        </div>
        <div v-else-if="val == 'Video1'" class="flight">
          <video-list />
        </div>
        <div v-else-if="val == 'Video2'" class="flight">
          <video-list />
        </div>
       <div v-else-if="val == 'Video3'" class="flight">
          <video-list />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

import VideoList from "@/views/video/components/VideoList";

export default {
  name: "Video",
  components: {
    VideoList
  },
  data() {
    return {
      navTar: ["Video","Video1","Video2","Video3" ],
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
}
.van-tab--active {
  font-weight: 600;
}
</style>