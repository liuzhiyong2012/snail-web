<template>
  <div>
    <div class="main-ctn">A1</div>
    <A1_1></A1_1>
    <A1_2></A1_2>
  </div>

</template>

<script>
import A1_1 from './A1_1';
import A1_2 from './A1_2';
export default {
  name: 'A1',
  components:{
    A1_1,
    A1_2
  },
  data() {
    return {
      name:'A1'
    };
  },
  created() {
    console.log(this.name + ':' + 'created');
  },
  mounted() {
    console.log(this.name + ':' + 'mounted');
  },
  destroyed() {
    console.log(this.name + ':' + 'destroyed');
  },
  methods: {}
};
</script>

<style scoped>

</style>
