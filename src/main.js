/**
  File   : main.js
  Date   : 2016年05月12日 星期四 13时02分29秒
*/

import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routerConfig from './router'
import store from './vuex/store'

import http from 'vue-resource'
import filters from './filters'

// install Router
Vue.use(VueRouter)

// install vue-resource, config it and add interceptors
Vue.use(http)
Vue.http.options.root = '/'
Vue.http.interceptors.push({
  request (r) {
    // const token = ls.get('illy-token')

    // if (token) {
    //   Vue.http.headers.common.Authorization = `Bearer ${token}`
    // }

    return r
  },

  response (r) {
    if (r.status === 400 || r.status === 401) {
      console.log(`error with response in ${r.url}`)
    }
  }
})

// export settings to global
// window.mirrorConfig = config

// instance all registed fitlers
Object.keys(filters).forEach((filterName) => Vue.filter(filterName, filters[filterName]))

// create Router
const router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: false
})

// configure Router
routerConfig(router)

// make Vue global
window.Vue = Vue

// just for debugging
if (process.NODE_ENV !== 'production') {
  // debug open
  Vue.config.debug = true
  // sync the store and router for better vue-devtools time traveling debug with vuex
  sync(store, router)
}

// bootstrap the app, bind into dom'root node with id #app
const App = Vue.extend(require('./App.vue'))
// router.start(App, '#app')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App }
})
router.start(App, '#app')

