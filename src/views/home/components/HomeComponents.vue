<template>
  <div>
    <h2 class="abus-block-title">
      <van-cell :title="title" class="block-title-background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25" />
        </template>
      </van-cell>
    </h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HomeComponents",
  props: ["title"]
};
</script>

<style lang="scss" scoped>
.block-title-background {
  background-color: #fafafa00;
}
.van-cell {
  font-size: 0.36rem;
}
</style>