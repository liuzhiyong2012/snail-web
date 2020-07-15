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
// @font-face {
//   font-family: 'iconfont';  /* project id 1932862 */
//   src: url('//at.alicdn.com/t/font_1932862_adx9qr7koph.eot');
//   src: url('//at.alicdn.com/t/font_1932862_adx9qr7koph.eot?#iefix') format('embedded-opentype'),
//   url('//at.alicdn.com/t/font_1932862_adx9qr7koph.woff2') format('woff2'),
//   url('//at.alicdn.com/t/font_1932862_adx9qr7koph.woff') format('woff'),
//   url('//at.alicdn.com/t/font_1932862_adx9qr7koph.ttf') format('truetype'),
//   url('//at.alicdn.com/t/font_1932862_adx9qr7koph.svg#iconfont') format('svg');
// }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.28rem;
  color: $font-color-theme;
  background-color: $background-color-theme;
}
.abus-icon {
width: 1em; height: 1em;
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
</style>
