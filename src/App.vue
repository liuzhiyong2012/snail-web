<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/style/variables.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.28rem;
  color: $font-color-theme;
  background-color: $background-color-theme;
}

.abus_block_title {
  margin: 0;
  padding: 0.2rem 0 0;
  color: rgb(51, 51, 51);
  font-weight: normal;
  font-size: 0.32rem;
  line-height: 0.32rem;
}
.block_title_background {
  color: rgb(51, 51, 51);
  font-size: 0.36rem;
  font-weight: bold;
}
.abus_scroller_box {
  margin: 0 0.28rem;
  padding: 0.28rem 0 0.2rem;
  background-color: #fff;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.1rem #efefef;
}
</style>
