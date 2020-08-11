<template>
	<section class="crew-income-statistics">
		crew-income-statistics
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';



@Component({
	name: 'CrewCatering',
	components: {
		
	}
})
export default class CrewCatering extends Vue {
	
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
    @function rem($px){//$px为需要转换的字号
	    @return $px / 100px * 1rem; //100px为根字体大小
	} 
	
	.crew-income-statistics{
		
	}


</style>
