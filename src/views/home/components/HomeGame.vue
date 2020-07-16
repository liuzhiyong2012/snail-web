<template>
  <div>
    <h2 class="abus-block-title">
      <van-cell title="Game" class="block-title-background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>
    <div class="abus-scroller-box">
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
.block-title-background {
  background-color: #fafafa00;
}
.van-cell {
  font-size: 0.36rem;
}
.abus-scroller-box {
  padding: 0;
  overflow: hidden;
  height: 3.14rem;
}
</style>