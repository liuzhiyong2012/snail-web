<template>
  <div class="abus-scroller-box">
      <banner :bannerData="imgData"/>
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

.abus-scroller-box {
  padding: 0;
  overflow: hidden;
  height: 3.14rem;
}
</style>