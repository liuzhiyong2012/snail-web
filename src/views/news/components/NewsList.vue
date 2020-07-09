<template>
  <li class="news_list_wrap">
    <div class="news_list_item">
      <div class="item_img">
        <img v-lazy="recommedNewsItem.img" />
      </div>

      <div class="item_info">
        <div class="name">
          <div class="line_two">{{ recommedNewsItem.name }}</div>
        </div>
        <div class="author">
          <div class="line_one">
            <span class="author_left_info">{{ recommedNewsItem.details }}</span>
            <span class="author_right_heart" v-if="recommedNewsItem.isCollect"
              ><img :src="loveTrue" alt=""
            /></span>
            <span class="author_right_heart" v-else
              ><img :src="loveFalse" alt=""
            /></span>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  props: ["newsItem"],
  data() {
    return {
      recommedNewsItem: this.newsItem,
      //   defaultImg: require("../images/goods.jpg"),
      loveTrue: require("../images/love_true.png"),
      loveFalse: require("../images/love_false.png"),
    };
  },
  created() {},
  watch: {
    newsItem(val) {
      this.recommedNewsItem = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.news_list_wrap {
  width: 92%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 0.1rem;

  .news_list_item {
    display: flex;
    padding: 0.28rem 0;
    align-items: center;

    .item_img {
      width: 2.1rem;
      height: 1.38rem;
      border-radius: 0.12rem;
      overflow: hidden;
      img {
        width: 100%;
      }
    }

    .item_info {
      flex: 1;
      margin: 0 0 0 0.16rem;
      display: flex;
      flex-direction: column;
      align-content: space-around;
      height: 1.38rem;
      .name {
        flex: 3;
        font-size: 0.3rem;
        color: #333333;
        line-height: 0.35rem;
        font-weight: 600;
        .line_two {
          height: 0.7rem;
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
          width: 100%;
          height: 0.3rem;
          display: flex;
          justify-content: space-between;

          .author_left_info {
            display: inline-block;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            width: 93%;
          }
          .author_right_heart {
            display: inline-block;
            width: 0.3rem;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
