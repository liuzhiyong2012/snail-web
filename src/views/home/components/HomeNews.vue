<template>
  <div class="abus-scroller-box news-box">
    <div v-for="(item,index) in musicData" class="news-list" :key="index">
      <div class="news-l">
        <img :src="item.img" :alt="item.name" />
      </div>
      <div class="f1">
        <div class="name">
          <div class="line-two">{{item.name}}</div>
        </div>
        <div class="details">
          <div class="line-one">{{item.details}}</div>
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
          img: require("../images/news.jpg"),
          name: "Let Me Down Slowly",
          details: "Alec Benjamin / Alessia Cara"
        },
        {
          img: require("../images/news.jpg"),
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
.news-box {
  background-color: #fff;
  padding: 0 0.28rem;
  margin: 0 0.28rem;
  border-radius: 0.1rem;
  :last-child {
    border-bottom: none;
  }
}
.news-list {
  display: flex;
  padding: 0.28rem 0;
  border-bottom: 0.02rem solid #efefef;
  align-items: center;
  .news-l {
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
      .line-two {
        height: 0.7rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .details {
      flex: 1;
      font-size: 0.24rem;
      color: #999;
      line-height: 0.4rem;
      .line-one {
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