import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('icon', Icon)
Vue.use(BootstrapVue)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
