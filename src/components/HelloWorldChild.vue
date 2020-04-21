<template>
  <div class="hello">
    color:{{color}}
    age:{{age}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        age:'5'
    }
  },
  props:{
    color:{
      type:String,
      defalut:'blcak'
    }
  },
  created(){
    this.age = '10';
  },
  mounted(){
 
  },
  watch: {
    color(newValue, oldValue) {
       console.log('color:' + 'new:' + newValue + ' ' + 'oldValue:' + oldValue);
    },
    age(newValue, oldValue) {
       console.log('age:' + 'new:' + newValue + ' ' + 'oldValue:' + oldValue);
    }
  },

  methods:{

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
