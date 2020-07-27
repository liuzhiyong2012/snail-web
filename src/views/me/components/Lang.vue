<template>
  <div class="abus-height">
      <abus-title title="Language" backRootName="meIndex"></abus-title>
    <div class="lang-box">
      <van-radio-group v-model="radio" checked-color="#00205B">
        <van-radio name="0" class="lang-cell">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <span :class="[props.checked ? 'text-selected': 'text-unselected']">English</span>
          </template>
        </van-radio>
        <van-radio name="1" class="lang-cell">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <span :class="[props.checked ? 'text-selected': 'text-unselected']">简体中文</span>
          </template>
        </van-radio>
      </van-radio-group>
    </div>
  </div>
</template>

<script>
import AbusTitle from "../../../components/AbusTitle.vue";
export default {
    components:{
        AbusTitle
    },
  data() {
    return {
      radio: "0",
    };
  },
};
</script>

<style lang="scss" scoped>
.lang-box {
  padding: 0 0.3rem;
  background-color: #fff;
  .lang-cell {
    padding: 0.3rem 0;
  }
  .text-selected {
    padding: 0 0 0 0.3rem;
    font-size: 0.32rem;
    color: rgba(0, 32, 91, 1);
    transition: all ease-in-out 0.3s;
  }
  .text-unselected {
    padding: 0 0 0 0.2rem;
    font-size: 0.32rem;
    color: #999;
    transition: all ease-in-out 0.3s;
  }
}
.icon-text {
  width: 0.24rem;
  height: 0.24rem;
}
</style>