<template>
  <div>
    <h2 class="abus_block_title">
      <van-cell title="Shopping" class="block_title_background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>
    <div class="abus_scroller_box">
      <Scroller class="nut-hor-list">
        <div slot="list" class="nut-hor-list-item" v-for="(item, index) of 8" :key="index">
          <div class="s-box" v-if="item == 8" style="margin-right: 43px">{{item}}</div>
          <div class="s-box" v-else>{{item}}</div>
        </div>
      </Scroller>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Scroller from "@nutui/nutui/dist/packages/scroller/scroller.js"; // 加载构建后的JS
import "@nutui/nutui/dist/packages/scroller/scroller.css";
Scroller.install(Vue);
export default {
  components: {
    Scroller
  }
};
</script>

<style lang="scss" scoped>
.van-cell {
  font-size: 18px;
}
.block_title_background {
  background-color: #fafafa00;
}
.dish-box {
  position: relative;
  width: 100%;
  height: 100px;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
}

.s-box {
  float: left;
  width: 100px;
  height: 100px;
  background-color: darkkhaki;
  margin: 0 0 0 14px;
}
</style>