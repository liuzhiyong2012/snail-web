<template>
  <section class="abus-layout-ctn">
	  <section class="abus-layout-main-ctn">
		  <keep-alive>
		    <router-view class="abus-layout-view-ctn"/>
		  </keep-alive>
	  </section>
  </section>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>


<style lang="scss">
	@import '../../assets/style/index.scss';
	
	
	.abus-layout-ctn{
		
	}
</style>