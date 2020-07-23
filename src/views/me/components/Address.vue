<template>
    <div class="abus-height">
<div class="enter-box">
    <van-field
  v-model="message"
  rows="3"
  autosize
  type="textarea"
  placeholder="Please enter the address"
  show-word-limit
/>
</div>
<div class="abus-button-box">
      <div class="abus-button">Pay</div>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: ''
            }
        },
    }
</script>

<style lang="scss" scoped>
.enter-box{
    padding: .3rem;
    background-color: #fff;
    .van-field{
        border: .02rem solid #ccc;
        border-radius: .05rem;
    }
}
</style>