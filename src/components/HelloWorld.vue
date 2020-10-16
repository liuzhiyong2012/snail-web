<template>
  <div class="hello">
    helloWorld-{{color}}
    <button @click="changeColor">改变颜色</button>
    <HelloWorldChild :color ="color"></HelloWorldChild>
  </div>
</template>

<script>
import HelloWorldChild from "./HelloWorldChild";
export default {
  name: 'HelloWorld',
  components:{
    HelloWorldChild
  },
  data () {
    return {
      color:'red'
    }
  },
  watch: {                                            
    color(newValue, oldValue) {
      debugger;
      console.log('color:' + newValue);
    }
  },
  computed:{
    computerColor(){
      debugger;
      return  '(' + this.color + ')';
    },
    computerColor1(){
      debugger;
      return  '(' + this.computerColor + ')';
    }
  },
  created(){

  },
  mounted(){
       console.log('computerColor:' + this.computerColor);
       console.log('computerColor1:' + this.computerColor1                                                          );
  },
  methods:{
    changeColor(){
       this.color = 'green';
    }
  }

}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
