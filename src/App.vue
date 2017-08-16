<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  $icon-font-path: "../node_modules/bootstrap-sass/assets/fonts/bootstrap/";
  @import "../node_modules/bootstrap-sass/assets/stylesheets/bootstrap";
</style>
