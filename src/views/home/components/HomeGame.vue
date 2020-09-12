<template>
  <div class="abus-scroller-box" :style="{'backgroundColor': isHaveData?'#fff':'#f2f4f7'}">
    <banner :bannerData="gameList" @stepTo='goToGame($event)' />
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
      isHaveData: false
    };
  },
  created() {
    this.getGameList();
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  },
  methods: {
    // 获取游戏列表
    getGameList() {
      GameService.getGameList().then((res) => {
        if (res.code == 200) {
          this.isHaveData = true
          res.data.Games.forEach((item) => {
            item.img = item.CoverImgPath;
          });
          this.gameList = res.data.Games;
        }
      });
    },
    goToGame(item){
      // console.log('游戏',item);
      this.$router.push({
        name:'game'
      })
    }
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
