<template>
  <div class="abus-height">
    <abus-title title="Payment" backRootName="meIndex"></abus-title>
    <div class="lang-box">
      <van-radio-group v-model="radio" checked-color="#00205B">
        <van-radio name="0" class="lang-cell">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <svg class="icon i-icon" aria-hidden="true">
              <use xlink:href="#icon-wechat-pay" />
            </svg>

            <span :class="[props.checked ? 'text-selected': 'text-unselected']">Wechat Pay</span>
          </template>
        </van-radio>
        <van-radio name="1" class="lang-cell">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <svg class="icon i-icon" aria-hidden="true">
              <use xlink:href="#icon-wechatpaycopy_1" />
            </svg>
            <span :class="[props.checked ? 'text-selected': 'text-unselected']">Alipay</span>
          </template>
        </van-radio>
        <van-radio name="2" class="lang-cell">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <svg class="icon i-icon" aria-hidden="true">
              <use xlink:href="#icon-wechatpaycopy2_1" />
            </svg>
            <span :class="[props.checked ? 'text-selected': 'text-unselected']">International Credit Card</span>
          </template>
        </van-radio>
        <van-radio name="3" class="lang-cell">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <svg class="icon i-icon" aria-hidden="true">
              <use xlink:href="#icon-wechatpaycopy3_1" />
            </svg>
            <span :class="[props.checked ? 'text-selected': 'text-unselected']">Cash</span>
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
    padding: 0 0 0 0.2rem;
    font-size: 0.32rem;
    color: rgba(0, 32, 91, 1);
    font-weight: bold;
  }
  .text-unselected {
    padding: 0 0 0 0.2rem;
    font-size: 0.32rem;
    color: #999;
    font-weight: 400;
  }
}
.icon-text {
  margin: 0 0 0.08rem 0;
  width: 0.24rem;
  height: 0.24rem;
}
.i-icon {
  padding: 0 0 0 0.2rem;
}
</style>