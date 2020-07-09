<template>
	<section class="main-ctn">
		
	</section>
</template>

<script lang="ts">
// import VoyageInfo from './components/VoyageInfo.vue'; 
import { Component, Prop, Vue } from 'vue-property-decorator';  

@Component({
  name: 'DishIndex',
  components:{
	  // VoyageInfo
  }
})
export default class DishIndex extends Vue {
  // @Prop() private msg!: string;
  private dataList: any = [];
  private activeCamera: string = ''; //header,body,footer
  
  created() {
    // this.getRuleList()
  }
  
  private handleSetting(data?: any) {
	  
  }
  
  private getRuleList() {
	  
  }
}

</script>

<style lang="scss" scoped>
	
</style>
