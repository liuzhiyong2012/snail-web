<template>
  <div>
    <h2 class="abus-block-title">
      <van-cell :title="$t(titleConfig.value)" class="block-title-background">
        <template #right-icon>
          <van-icon class="i-icon" name="ellipsis" style="line-height: inherit;"  @click="stepTo(titleConfig.value)" />
        </template>
      </van-cell>
    </h2>    
    <slot></slot>
  </div>
</template>

<i18n>
	{
		"zh":{
			"flight":"航班",
			"dish":"餐品",
			"shopping":"机上购物",
			"music":"音乐",
			"game":"游戏",
			"video":"视频",
			"news":"新闻",
			"aboutUs":"关于我们"
		},
		"en":{
			"flight":"Flight",
			"dish":"Dish",
			"shopping":"Shopping",
			"music":"Music",
			"game":"Game",
			"video":"Video",
			"news":"News",
			"aboutUs":"About Us"
		}
	}
</i18n>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
	name:'HomeComponents',
	components:{
		
	}
})
export default class HomeComponents extends Vue{
	@Prop({
		default:()=>{
			return {};
		}
	})
	private titleConfig:any;
	
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
      padding: 0.1rem 0.3rem !important; 
}
.i-icon{
	font-size: .5rem !important;
}
</style>