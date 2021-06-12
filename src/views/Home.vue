<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import HomeService from '../service/HomeService';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created(){

  },
  mounted(){
    debugger;
           HomeService.getWeixinAuth().then(()=>{

           });
  }
}
</script>
