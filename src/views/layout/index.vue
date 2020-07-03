<template>
  <section id="layout" class="layout-ctn">
	  <section class="layout-content">
		  <keep-alive>
		    <router-view class="view"/>
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


<style scoped lang="scss">
	.layout-ctn{
		
	}
</style>