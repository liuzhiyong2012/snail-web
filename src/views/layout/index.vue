<template>
  <section class="abus-layout-ctn">
	  <section class="abus-layout-main-ctn">
		  <!-- <keep-alive> -->
		    <router-view class="abus-layout-view-ctn"/>
		  <!-- </keep-alive> -->
	  </section>
	  <music-player></music-player>
  </section>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MusicPlayer from '../music/components/player/player.vue';

@Component({
	name:'LayoutIndex',
	components:{
		MusicPlayer
	}
})
export default class LayoutIndex extends Vue {
  @Prop() private msg!: string;
  
  private created():void{
	  
  }
  
}
</script>


<style lang="scss">
	@import '../../assets/style/index.scss';
	
	
	.abus-layout-ctn{
		
	}
</style>