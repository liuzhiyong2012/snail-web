<template>
  <div>
    <h2 class="abus_block_title">
      <van-cell title="Game" class="block_title_background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>
    <div class="abus_scroller_box">
      <banner :bannerData="imgData"/>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/banner";
export default {
  components: {
    Banner
  },
  props: ['imgData'],
  data() {
    return {
        
    };
  },
  created(){
  }
};
</script>

<style lang="scss" scoped>
.block_title_background {
  background-color: #fafafa00;
}
.van-cell {
  font-size: 0.36rem;
}
.abus_scroller_box {
  padding: 0;
  overflow: hidden;
  height: 3.14rem;
}
</style>