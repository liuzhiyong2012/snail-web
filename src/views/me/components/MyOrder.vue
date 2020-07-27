<template>
  <div class="abus-height">
    <abus-title title="My order" backRootName="meIndex"></abus-title>
    <van-tabs
      line-width="20"
      line-height="4"
      color="rgb(0,32,91)"
      title-active-color="rgb(0,32,91)"
      sticky
    >
      <van-tab v-for="(item,index) in tabData" :title="item" :key="index">
        <div v-if="item == 'Dish'" >
            <my-dish-order></my-dish-order>
        </div>
        <div v-else-if="item == 'Shopping'" ><my-shopping-order></my-shopping-order></div>
        <div v-else-if="item == 'Internet'" ><my-internet-order></my-internet-order></div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import AbusTitle from "../../../components/AbusTitle.vue";
import MyDishOrder from "./MyDishOrder";
import MyShoppingOrder from "./MyShoppingOrder";
import MyInternetOrder from "./MyInternetOrder";
export default {
  components: {
    MyDishOrder,
    MyShoppingOrder,
    MyInternetOrder,
    AbusTitle
  },
  data() {
    return {
      tabData: ["Dish", "Shopping", "Internet"],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>