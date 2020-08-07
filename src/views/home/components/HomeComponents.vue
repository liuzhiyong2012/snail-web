<template>
  <div>
    <h2 class="abus-block-title">
      <van-cell :title="titleConfig.title" class="block-title-background">
        <template #right-icon>
          <van-icon name="ellipsis" style="line-height: inherit;" size="25"  @click="stepTo(titleConfig.value)" />
        </template>
      </van-cell>
    </h2>    
    <slot></slot>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
	name:'HomeComponents',
	components:{
		
	}
})
export default class HomeComponents extends Vue{
	@Prop()
	private titleConfig:any = {};
	
	public stepTo(value:string){
		this.$emit('stepTo',value);
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
</style>