<template>
  <div>
    <div class="main-ctn">A1_2_2</div>
  </div>


</template>

<script>
export default {
  name: 'A1_2_2',
  data() {
    return {
      name:'A1_2_2'
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
