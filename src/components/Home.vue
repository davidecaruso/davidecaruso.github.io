<template>
  <div class='home'>
    <h1>{{ msg }}</h1>
    <div class="container-fluid">
      <particles message="test"></particles>
      <shell :messages="['Cats', 'test']"></shell>
    </div>
  </div>
</template>

<script>
import particles from './Particles.vue'
import shell from './Shell.vue'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'This is the homepage'
    }
  },
  mounted: function () {
//    let $ = window.jQuery = require('jquery')
//    $('body').css('background', 'blue')
  },
  components: {
    particles: particles,
    shell: shell
  }
}
</script>

<style lang='scss' scoped>
  #shell {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 50vw;
    height: 30vh;
  }
</style>
