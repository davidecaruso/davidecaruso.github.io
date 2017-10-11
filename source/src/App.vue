<template>
  <div id="app">
    <header class="header">
      <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
        <b-navbar-brand to="/">d10o</b-navbar-brand>
      </b-navbar>
    </header>
  
    <router-view></router-view>
  
    <footer class="footer">
      <b-container fluid>
        <b-row>
          <b-col sm="2">
            <p>Davide Caruso</p>
          </b-col>
          <b-col sm="10" class="text-right">
            <a class="github" href="https://github.com/davidecaruso"><icon name="github"></icon></a>
            <a class="linkedin" href="https://www.linkedin.com/in/davidecaruso93"><icon name="linkedin"></icon></a>
            <a class="twitter" href="https://twitter.com/davidecaruso93"><icon name="twitter"></icon></a>
            <a class="facebook" href="https://www.facebook.com/davidecaruso93"><icon name="facebook"></icon></a>
            <a class="envelope" href="mailto: davide.caruso93+@gmail.com"><icon name="envelope"></icon></a>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "../node_modules/bourbon-libsass/dist/bourbon";
  html {
    font-family: 'Inconsolata', monospace;
    border: 0;
    margin: 0;
    padding: 0;
    height: 100%;
  }
  body {
    border: 0;
    margin: 0;
    padding: 0;
    min-height: 100%;
  }
  .fa-icon {
    width: auto;
    height: 1em;
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }
  #app {
    overflow: hidden;
    min-height: 100%;
    position: relative;
    padding-bottom: 60px;
    
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 60px;
      background-color: rgba(#000000, .6);
      p {
        font-size: em(15px);
        line-height: 60px;
        color: rgba(#FFFFFF, .7);
        @media screen and (max-width: 767px) {
          font-size: em(13px);
        }
      }
      a {
        font-size: em(25px);
        line-height: 60px;
        color: rgba(#FFFFFF, .7);
        margin: 0 5px;
        @media screen and (max-width: 767px) { font-size: em(13px); }
        &.github:hover { color: #24292E; }
        &.linkedin:hover { color: #0084BF; }
        &.twitter:hover { color: #1DA1F2; }
        &.facebook:hover { color: #4267B2; }
        &.envelope:hover { color: #FFFFFF; }
      }
    }
  }
</style>
