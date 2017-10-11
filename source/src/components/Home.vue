<template>
  <div class='home'>
    <particles></particles>
    <div id="shell"></div>
  </div>
</template>

<script>
import particles from './Particles.vue'
import Shell from 'shell.js'
import Typed from 'typed.js'
export default {
  name: 'hello',
  data () {
    return {}
  },
  mounted: function () {
    let shell = new Shell('#shell', {
      user: 'guest',
      host: 'davidecaruso',
      path: 'shell.js',
      theme: 'dark',
      typed: Typed,
      responsive: false,
      commands: ['Welcome bro', 'I am Davide, a web developer and also a bug maker', 'Enjoy your trip :D']
    })
    shell
  },
  components: {
    particles: particles
  }
}
</script>

<style lang='scss'>
  body {
    height: 100vh;
    overflow: hidden;
  }
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
