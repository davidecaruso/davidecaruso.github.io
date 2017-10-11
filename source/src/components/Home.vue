<template>
  <b-container fluid class='home'>
    <particles></particles>
    <b-container class="text-center">
      <div id="shell"></div>
    </b-container>
  </b-container>
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
  mounted () {
    let shell = new Shell('#shell', {
      user: 'guest',
      host: 'davidecaruso',
      path: 'shell.js',
      theme: 'dark',
      typed: Typed,
      responsive: false,
      commands: ['Welcome bro', 'I am Davide. I am a full stack web developer']
    })
    shell
  },
  components: {
    particles: particles
  }
}
</script>

<style lang='scss'>
  @import "../../node_modules/bourbon-libsass/dist/bourbon";
  body {
    height: 100vh;
  }
  #shell {
    margin: 15vh auto 0;
    min-width: 50vw;
    min-height: 50vh;
    max-width: 100%;
    max-height: 100%;
  }
</style>
