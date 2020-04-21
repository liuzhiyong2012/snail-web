<template>
  <div>
    大家好,我的名字是{{
      name
    }}
  </div>

</template>

<script>
import HomeService from '../../service/home';

export default {
  name: 'A1',
  data() {
    return {
      name:''
    };
  },
  created() {

    HomeService.getUserInfo().then((data)=>{
      // debugger;
      this.name = data.name;
    }).catch((e)=>{
        // debugger;
    });
    console.log(this.name + ':' + 'created');
  },
  mounted() {
    console.log(this.name + ':' + 'mounted');
  },
  destroyed() {
    console.log(this.name + ':' + 'destroyed');
  },
  methods: {

  }
};
</script>

<style scoped>

</style>
