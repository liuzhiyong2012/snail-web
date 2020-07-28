<template>
  <div class="chat">
    <van-sticky>
      <!-- <section class="header-box"> -->
      <section>
        <!-- <div class="left">
          <img src="./images/tab1.png" alt="" />
        </div> -->
   
        <div class="center">
          <van-tabs
            v-model="active"
            animated
            swipeable
            line-width="20"
            line-height="4"
            color="rgb(0,32,91)"
            title-active-color="rgb(0,32,91)"
          >
            <!-- <template slot="nav-left" class="nav-left"> -->
            <template #nav-left class="nav-left">
              <van-icon
                name="arrow-left"
                size="18"
                color="#001F5B"
                @click="goBack"
              />
            </template>
            <van-tab title="Chat">内容 1</van-tab>
            <van-tab title="System">内容 2</van-tab>
            <!-- <template slot="nav-right" class="nav-right"> -->
            <template #nav-right class="nav-right">
              <van-icon
                name="manager"
                size="18"
                color="#001F5B"
                @click="goBack"
              />
            </template>
          </van-tabs>
        </div>

        <!-- <div class="right">
          <img src="./images/tab2.png" alt="" />
        </div> -->
      </section>
    </van-sticky>
    <!-- <van-sticky>
      <van-nav-bar>
        <template #left>
          <van-icon name="arrow-left" size="18" @click="goBack" />
        </template>
        <template >
          <van-tabs v-model="active">
            <van-tab title="标签 1">内容 1</van-tab>
            <van-tab title="标签 2">内容 2</van-tab>
          </van-tabs>
        </template>
        <template #right>
          <van-icon name="manager" size="18" color="#001F5B" @click="goBack" />
        </template>
      </van-nav-bar>
    </van-sticky> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      active: 0,
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
.header-box {
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    width: 15%;
  }
  .right {
    width: 15%;
  }
  .center {
    width: 70%;
  }
}

.nav-left,
.nav-right {
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scroller-box {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 2.14rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .scroller-item {
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0.24rem;
    font-family: Helvetica;
    color: #2e2e2e;
    .scoller-name {
      margin-top: 0.17rem;
    }
  }
}

.block-title-background {
  background-color: #fafafa00;
  font-size: 0.36rem;
}
</style>
