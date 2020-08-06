<template>
  <div class="abus-scroller-box">
    <banner :bannerData="gameList" />
  </div>
</template>

<script>
import Banner from "@/components/banner";
import GameService from "../../../service/game";
export default {
  components: {
    Banner,
  },
  data() {
    return {
      gameList: [],
    };
  },
  created() {
    this.getGameList();
  },
  methods: {
    // 获取游戏列表
    getGameList() {
      GameService.getGameList().then((res) => {
        if (res.code == 200) {
          res.data.Games.forEach((item) => {
            item.img = item.CoverImgPath;
          });
          this.gameList = res.data.Games;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.abus-scroller-box {
  padding: 0;
  overflow: hidden;
  height: 3.14rem;
}
</style>
