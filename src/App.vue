<template>
  <div id="app">
  
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Davide Caruso</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/">Home</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
    
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "../node_modules/bourbon-libsass/dist/bourbon";
  $icon-font-path: "../node_modules/bootstrap-sass/assets/fonts/bootstrap/";
  @import "../node_modules/bootstrap-sass/assets/stylesheets/bootstrap";
  .container-fluid {
    padding: 0;
  }
</style>
