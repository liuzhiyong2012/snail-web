<template>
  <div>
    <h2 class="abus_block_title">
      <van-cell title="News" class="block_title_background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>
    <div class="abus_scroller_box music_box">
      <div v-for="(item,index) in musicData" class="music_list" :key="index">
        <div class="music_l">
          <img :src="item.img" :alt="item.name" />
        </div>
        <div class="f1">
          <div class="name">
            <div class="line_two">{{item.name}}</div>
          </div>
          <div class="author">
            <div class="line_one">{{item.details}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      musicData: [
        {
          img: require("./images/news.jpg"),
          name: "Let Me Down Slowly",
          details: "Alec Benjamin / Alessia Cara"
        },
        {
          img: require("./images/news.jpg"),
          name:
            "Let Me Down SlowlyLet Me Down SlowlyLet Me Down SlowlyLet Me Down Slowly",
          details: "Alec Benjamin / Alessia CaraAlec Benjamin / Alessia Cara"
        }
      ]
    };
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.block_title_background {
  background-color: #fafafa00;
}
.van-cell {
  font-size: 0.36rem;
}
.music_box {
  background-color: #fff;
  padding: 0 0.28rem;
  margin: 0 0.28rem;
  background-color: #fff;
  border-radius: 0.1rem;
  :last-child {
    border-bottom: none;
  }
}
.music_list {
  display: flex;
  padding: 0.28rem 0;
  border-bottom: 0.02rem solid #efefef;
  align-items: center;
  .music_l {
    width: 2.1rem;
    height: 1.38rem;
    border-radius: 0.12rem;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .f1 {
    flex: 1;
    margin: 0 0 0 0.16rem;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    height: 1.38rem;
    .name {
      flex: 3;
      font-size: 0.28rem;
      color: #666;
      line-height: 0.35rem;
      font-weight: 500;
      .line_two {
        height: .7rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .author {
      flex: 1;
      font-size: 0.24rem;
      color: #999;
      .line_one {
        height: 0.3rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>