<template>
	<section class="crew-catering-item">
		  <div class="img-ctn">
			  
		  </div>
		  <div class="info-ctn">
			  <div class="">
				  
			  </div>
			  
			  <div class="">
			  				  
			  </div>
			  
		  </div>
	</section>
</template>




<script lang = "ts">
	import {Vue,Component,Prop} from 'vue-property-decorator';
	
	@Component({
		name:'CrewCateringItem',
		components: {
		}
	})
	export default class CrewCateringItem extends Vue{
		
		
	}
</script>

<style lang="scss" scoped>
	
	@function rem($px){
	    @return $px / 100px * 1rem; //100px为根字体大小
	} 
	
	.crew-catering-item{
		width:rem(976px);
		height:rem(140px);
		border-radius:rem(30px);
		box-sizing: border-box;
		overflow: hidden;
		border:rem(4px) solid rgba(175,213,253,1);
		
		.img-ctn{
			height: 100%;
			width: rem(132px);
			background-color: blue;
		}
		
		.info-ctn{
			height: 100%;
			margin-right:rem(132px);
			
		}
	}
	
	
		
</style>

