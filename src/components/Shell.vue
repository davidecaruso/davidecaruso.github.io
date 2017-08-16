<template>
  <div id='shell'></div>
</template>

<script>
  export default {
    name: 'shell',
    props: {
      messages: {
        type: Array,
        required: true
      }
    },
    data () {
      return {}
    },
    mounted: function () {
      let $ = window.jQuery = require('jquery')
      require('../../node_modules/typed.js/lib/typed.min')
      require('../../node_modules/shell.js/dist/js/jquery.shell.min.js')
      $('#shell').shell({
        style: 'osx',
        theme: 'dark',
        typed: true,
        responsive: false,
        commands: this.messages
      })
      console.log(this.messages)
    }
  }
</script>

<style lang='scss' scoped>
  @import "../../node_modules/font-awesome/css/font-awesome.min.css";
  @import "../../node_modules/shell.js/dist/css/shell.min.css";
</style>
