<template>
  <div class="abus-height">
    <abus-title title="Shopping address"></abus-title>
    <div class="enter-box">
      <van-field
        v-model="address"
        rows="3"
        autosize
        type="textarea"
        placeholder="Please enter the address"
        show-word-limit
      />
    </div>
    <div class="abus-button-box">
      <div class="abus-button" @click="postUpdateAddress">Sure</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import AbusTitle from "../../../components/AbusTitle.vue";
import MeServer from "../../../service/me"
@Component({
  name: "ShoppingAddress",
  components: {
    AbusTitle,
  },
})
export default class ShoppingAddress extends Vue {
  private address: string = "";

  private created() {
   this.postAddress() 
  }
  private mounted() {
    console.log(this.$store.state.me)
    this.address = this.$store.state.me.address;
  }
  private get getAddress() {
    return this.$store.state.me.address;
  }
  @Watch("address", { immediate: true })
  private addressData() {
    this.$store.commit("addressData", this.address);
  }
  
  public postUpdateAddress(){
    if(this.address != ''){
      let data = {
      address: this.address
    }
    MeServer.postUpdateAddress(data).then((res: any) => {
      if(res.code == 200) {
        this.$toast(res.data)
        setTimeout(()=>{
          this.$router.go(-1);
        },200)
      }
    })
    }else{
      this.$toast('收货地址不能为空')
    }
  }
  public postAddress(){
    MeServer.postAddress().then((res: any) => {
      if(res.code == 200) {
        this.address = res.data.Address
        this.$store.dispatch('setAddressData',{
          data: res.data.Address
        })
      }
    })
  }
  
}
</script>

<style lang="scss" scoped>
.enter-box {
  padding: 0.3rem;
  background-color: #fff;
  .van-field {
    border: 0.02rem solid #ccc;
    border-radius: 0.05rem;
  }
}
</style>