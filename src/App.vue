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
  font-size: 14px;
  color: $font-color-theme;
  background-color: $background-color-theme;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.abus_block_title {
  margin: 0;
  padding: 10px 0px 0px;
  color: rgb(51, 51, 51);
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
}
.block_title_background {
  color: rgb(51, 51, 51);
  font-size: 18px;
  font-weight: bold;
}
.abus_scroller_box {
  margin: 0 14px;
  padding: 14px 0 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #efefef;
}
</style>
