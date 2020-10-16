<template>
  <div>
    <div class="main-ctn">A1_2_1</div>
  </div>


</template>

<script>

export default {
  name: 'A1_2_1',
  data() {
    return {
      name:'A1_2_1'
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
