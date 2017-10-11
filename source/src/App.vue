<template>
  <div id="app">
  
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
      <b-navbar-brand to="/">d10o</b-navbar-brand>
    </b-navbar>
  
    <b-container fluid>
      <router-view></router-view>
    </b-container>
  
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "../node_modules/bourbon-libsass/dist/bourbon";
  html, body {
    border: 0;
    margin: 0;
    padding: 0;
  }
  #app {
    height: 100%;
  }
  .container-fluid {
    padding: 0;
  }
</style>
