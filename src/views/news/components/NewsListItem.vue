<template>
  <li class="news-list-wrap">
    <div class="news-list-item">
      <div class="item-img" @click="goToDetail(recommedNewsItem)">
        <img v-lazy="recommedNewsItem.ThumbsImg[0]" />
      </div>

      <div class="item-info">
        <div class="name" @click="goToDetail(recommedNewsItem)">
          <div class="line-two">{{ recommedNewsItem.Title }}</div>
        </div>
        <div class="author">
          <div class="line-one">
            <span class="author-left-info">{{ recommedNewsItem.ShortDescription }}</span>

            <div @click="changeHot(recommedNewsItem.Id)">
              <span class="author-right-heart" v-show="recommedNewsItem.isCollect ==true">
                <img :src="loveTrue" alt=""/>
              </span>
              <span class="author-right-heart" v-show="recommedNewsItem.isCollect ==false">
                <img :src="loveFalse" alt=""/>
              </span>
            </div>
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
  methods: {
    goToDetail(item) {
      //进入新闻详情
      this.$router.push({
        name: "newsDetail",
        query: {
          newsItem: JSON.stringify(item)
        },
      });
    },

    changeHot(val) {
      this.recommedNewsItem.isCollect = !this.recommedNewsItem.isCollect;
    },

  },
};
</script>
<style lang="scss" scoped>
.news-list-wrap {
  width: 92%;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.1rem;

  .news-list-item {
    display: flex;
    padding: 0.28rem 0;
    align-items: center;

    .item-img {
      width: 2.1rem;
      height: 1.38rem;
      border-radius: 0.12rem;
      overflow: hidden;
      img {
        width: 100%;
      }
    }

    .item-info {
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
      .author {
        flex: 1;
        font-size: 0.24rem;
        color: #999;
        .line-one {
          width: 100%;
          height: 0.35rem;
          line-height: 0.35rem;
          display: flex;
          justify-content: space-between;

          .author-left-info {
            display: inline-block;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            width: 92%;
          }
          .author-right-heart {
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
