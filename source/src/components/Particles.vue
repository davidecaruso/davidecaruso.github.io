<template>
  <div id='particles'></div>
</template>

<script>
  export default {
    name: 'particles',
    data () {
      return {}
    },
    mounted: function () {
      require('../../node_modules/particles.js/particles.js')
      window.particlesJS('particles', {
        'particles': {
          'number': {
            'value': 50
          },
          'color': {
            'value': '#FFFFFF'
          },
          'shape': {
            'type': 'circle'
          },
          'opacity': {
            'value': 0.5,
            'random': false,
            'anim': {
              'enable': false,
              'speed': 1,
              'opacity_min': 0.1,
              'sync': false
            }
          },
          'size': {
            'value': 2,
            'random': true,
            'anim': {
              'enable': false,
              'speed': 2.5,
              'size_min': 0.1,
              'sync': false
            }
          },
          'line_linked': {
            'enable_auto': true,
            'distance': 100,
            'color': '#ffffff',
            'opacity': 0.5,
            'width': 1,
            'condensed_mode': {
              'enable': false,
              'rotateX': 600,
              'rotateY': 600
            }
          },
          'move': {
            'enable': true,
            'speed': 2,
            'direction': 'none',
            'random': false,
            'straight': false,
            'out_mode': 'out',
            'bounce': false,
            'attract': {
              'enable': false,
              'rotateX': 600,
              'rotateY': 1200
            }
          }
        },
        'interactivity': {
          'detect_on': 'canvas',
          'events': {
            'onhover': {
              'enable': true,
              'mode': 'grab'
            },
            'onclick': {
              'enable': false,
              'mode': 'push'
            },
            'resize': true
          },
          'modes': {
            'grab': {
              'distance': 140,
              'line_linked': {
                'opacity': 0.5
              }
            },
            'bubble': {
              'distance': 400,
              'size': 40,
              'duration': 2,
              'opacity': 8,
              'speed': 3
            },
            'repulse': {
              'distance': 200,
              'duration': 0.4
            },
            'push': {
              'particles_nb': 4
            },
            'remove': {
              'particles_nb': 2
            }
          }
        },
        'retina_detect': true
      })
    }
  }
</script>

<style lang='scss' scoped>
  @import "../../node_modules/bourbon-libsass/dist/bourbon";
  #particles {
    z-index: -1;
    max-width: 100vw;
    height: 100vh;
    width: 100%;
    @include position(absolute, 0 0 0 0);
    
    $deg: 70deg;
    $blue: #1B0D76;
    $violet: #9A308A;
    background-image: linear-gradient($deg, $blue, $violet);
    -webkit-background-image: linear-gradient($deg, $blue, $violet);
    -moz-background-image: linear-gradient($deg, $blue, $violet);
    -o-background-image: linear-gradient($deg, $blue, #9A308A);
  }
</style>
