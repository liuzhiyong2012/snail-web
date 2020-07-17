<template>
  <div>
    <h2 class="abus-block-title">
      <van-cell title="Music" class="block-title-background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>
    <div class="abus-scroller-box music-box">
      <div v-for="(item,index) in musicData" class="music-list" :key="index">
        <div class="music-l">
          <img :src="item.img" :alt="item.name" />
        </div>
        <div class="f1">
          <div class="name">{{item.name}}</div>
          <div class="author">{{item.author}}</div>
        </div>
        <van-icon name="play-circle" color="rgb(229,232,228)" size="20" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicData: [
        {
          img: require("../images/music.jpg"),
          name: "Let Me Down Slowly",
          author: "Alec Benjamin / Alessia Cara"
        },
        {
          img: require("../images/music.jpg"),
          name: "Let Me Down Slowly",
          author: "Alec Benjamin / Alessia Cara"
        },
        {
          img: require("../images/music.jpg"),
          name: "Let Me Down Slowly",
          author: "Alec Benjamin / Alessia Cara"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.block-title-background {
  background-color: #fafafa00;
}
.van-cell {
  font-size: 0.36rem;
}
.music-box {
  background-color: #fff;
  padding: 0 0.28rem;
  margin: 0 0.28rem;
  background-color: #fff;
  border-radius: 0.1rem;
  :last-child {
    border-bottom: none;
  }
}
.music-list {
  display: flex;
  padding: 0.28rem 0;
  border-bottom: 0.02rem solid #efefef;
  align-items: center;
  .music-l {
    width: 1rem;
    height: 1rem;
    overflow: hidden;
    border-radius: 0.12rem;
    img {
      width: 100%;
    }
  }

  .f1 {
    flex: 1;
    margin: 0 0 0 0.16rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    .name {
      flex: 1;
      font-size: 0.28rem;
      color: #666;
      line-height: 0.5rem;
      font-weight: 500;
    }
    .author {
      flex: 1;
      font-size: 0.24rem;
      color: #999;
      line-height: 0.5rem;
    }
  }
}
</style>