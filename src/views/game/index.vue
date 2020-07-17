<template>
  <div class="news">
    <van-sticky>
      <van-nav-bar title="Game">
        <template #left>
          <van-icon name="arrow-left" size="18" @click="goBack" />
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="scroller_box">
      <div
        class="scroller_item"
        v-for="(item, index) of gameBannerData"
        :key="index"
      >
        <img :src="item.img" alt="" />
        <p class="scoller_name">{{ item.name }}</p>
      </div>
    </div>

    <hot-game-list />

    <h2 class="abus_block_title">
      <van-cell title="Popular series" class="block_title_background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>

    <div class="game_box">
      <div class="game_item" v-for="(item, index) in gameList" :key="index">
        <div class="game">
          <div class="game_img">
            <img class="game_img_up" :src="item.imgUp" alt="" />
            <div class="game_img_down">
              <img :src="item.imgLeft" alt="" />
              <img :src="item.imgRight" alt="" />
            </div>
          </div>
          <div class="game_name game_word">{{ item.name }}</div>
          <div class="game_tips game_word">{{ item.details }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotGameList from "@/views/game/components/HotGameList";
export default {
  components: {
    HotGameList,
  },
  data() {
    return {
      gameBannerData: [
        {
          img: require("./images/tab1.png"),
          name: "Game sort",
          details: "",
        },
        {
          img: require("./images/tab2.png"),
          name: "Hot game",
          details: "",
        },
        {
          img: require("./images/tab3.png"),
          name: "Recent updates",
          details: "",
        },
      ],

      gameList: [
        {
          id: "001",
          imgUp: require("./images/game3_up.png"),
          imgLeft: require("./images/game3_left.png"),
          imgRight: require("./images/game3_right.png"),
          name: "ICE Rage",
          details: "Mountian Sheep",
        },
        {
          id: "002",
          imgUp: require("./images/game3_up.png"),
          imgLeft: require("./images/game3_left.png"),
          imgRight: require("./images/game3_right.png"),
          name: "The Night Clock",
          details: "Travelers Program",
        },
        {
          id: "003",
          imgUp: require("./images/game3_up.png"),
          imgLeft: require("./images/game3_left.png"),
          imgRight: require("./images/game3_right.png"),
          name:
            "Earth's deepest ice canyon vulnerable to melting How did Australia's Ruby Princess cruise happen? you can do it you can do this thing",
          details:
            "Other space data indica How did Australia's Ruby Princess cruise happen? you can do it you can do this thing",
        },
        {
          id: "004",
          imgUp: require("./images/game3_up.png"),
          imgLeft: require("./images/game3_left.png"),
          imgRight: require("./images/game3_right.png"),
          name:
            "How did Australia's Ruby Princess cruise happen? you can do it you can do this thing",
          details:
            "Other space data indica GREWHG How did Australia's Ruby Princess cruise happen? you can do it you can do this thing ",
        },
        {
          id: "005",
          imgUp: require("./images/game3_up.png"),
          imgLeft: require("./images/game3_left.png"),
          imgRight: require("./images/game3_right.png"),
          name:
            "Tom Hanks and Rita Wilson ‘feel better’ after coron gfdgf grdg How did Australia's Ruby Princess cruise happen? you can do it you can do this thing",
          details:
            "Other space data indica 规范和投入让他 How did Australia's Ruby Princess cruise happen? you can do it you can do this thing",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    window.scrollTo(0, 0);
  },
  mounted() {},
  destroyed() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // goToDetail(id) {
    //   //进入新闻详情
    //   this.$router.push({
    //     name: "newsDetail",
    //     query: {
    //       newsId: id,
    //     },
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.scroller_box {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 2.14rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .scroller_item {
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0.24rem;
    font-family: Helvetica;
    color: #2e2e2e;
    .scoller_name {
      margin-top: 0.17rem;
    }
  }
}

.block_title_background {
  background-color: #fafafa00;
  font-size: 0.36rem;
}

.game_box {
  display: flex;
  flex-wrap: wrap;
  margin: 0;

  .game_item {
    box-sizing: border-box;
    width: 44%;
    margin: 0 0.13rem 0.3rem 0.3rem;

    .game {
      width: 100%;
      background: #fff;
      border-radius: 0.14rem;
      box-shadow: 0 0 0.1rem #efefef;
      box-sizing: border-box;
      padding-bottom: 0.2rem;
      .game_img {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .game_img_up {
          width: 100%;
          border-radius: 0.14rem 0.14rem 0 0;
          margin-bottom: 0.02rem;
        }

        .game_img_down {
          margin: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            width: 49.5%;
          }
          :nth-child(even) {
            margin: 0;
          }
        }
      }
      .game_name {
        font-family: Helvetica-Bold, Helvetica;
        font-weight: bold;
        font-size: 0.26rem;
        color: #2e2e2e;
      }
      .game_tips {
        font-family: Helvetica;
        font-size: 0.22rem;
        color: #333333;
      }
      .game_word {
        margin: 0;
        padding: 0.15rem 0.2rem 0 0.15rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  :nth-child(even) {
    margin: 0 0.3rem 0.3rem 0.13rem;
  }
}
</style>
