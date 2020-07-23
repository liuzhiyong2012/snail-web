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
svg.icon {
  width: .4rem;
  height: .4rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.28rem;
  color: $font-color-theme;
  background-color: $background-color-theme;
  font-family: Helvetica-Bold, Helvetica;
}
.abus-height{
  min-height: 100vh;
}
.abus-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.abus-block-title {
  margin: 0;
  padding: 0.2rem 0 0;
  color: rgb(51, 51, 51);
  font-weight: normal;
  font-size: 0.32rem;
  line-height: 0.32rem;
}
.block-title-background {
  color: rgb(51, 51, 51);
  font-size: 0.36rem;
  font-weight: bold;
}
.abus-scroller-box {
  margin: 0 0.28rem;
  padding: 0.28rem 0 0.2rem;
  background-color: #fff;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.1rem #efefef;
}
.abus-button-box {
  margin: 0.4rem 0.3rem 0.5rem;
  .abus-button {
    width: 100%;
    height: 0.8rem;
    background: rgba(0, 32, 91, 1);
    border-radius: 0.4rem;
    text-align: center;
    line-height: 0.8rem;
    color: #fff;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
  }
}
.discount {
  text-decoration: line-through;
}
</style>
