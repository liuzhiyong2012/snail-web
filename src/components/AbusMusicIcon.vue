<template>
	<section class="music-icon-ctn">
		  <span class="bar-item bar-item1"></span>
		  <span class="bar-item bar-item2"></span>
		  <span class="bar-item bar-item3"></span>
	</section>
</template>

<i18n>
	{
		"zh":{
			
		},
		"en":{
			
		}
	}
</i18n>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
	name: 'AbusMusicIcon',
	components: {
		
	} 
})
export default class AbusMusicIcon extends Vue {
	
}
</script>

<style lang="scss" scoped>
	@keyframes up-and-down {
	  10% {
	    height: 30%;
	  }
	  30% {
	    height: 100%;
	  }
	  60% {
	    height: 50%;
	  }
	  80% {
	    height: 75%;
	  }
	  100% {
	    height: 20%;
	  }
	}
	
.music-icon-ctn {
	    background: rgba(255, 255, 255, 0.1);
	    width: 0.40rem;
	    height: 0.40rem;
	    border-radius: 0;
	    display: flex;
	    justify-content: space-between;
	    align-items: flex-end;
	    padding: 0.08rem;
	    box-sizing: border-box;
		
		.bar-item{
			&.bar-item1{
				height: 60%;
			}
			&.bar-item2{
				    height: 30%;
				    -webkit-animation-delay: -2.4s;
				    animation-delay: -2.4s;
			}
			&.bar-item3{
				height: 75%;
				    -webkit-animation-delay: -3.7s;
				    animation-delay: -3.7s;
				
			}
			display: inline-block;
			    background: #03225c;
			    width: 0.05rem;
			    height: 100%;
			    -webkit-animation: up-and-down 1.3s ease infinite alternate;
			    animation: up-and-down 1.3s ease infinite alternate;
			
		} 
}
</style>
