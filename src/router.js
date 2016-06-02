/**
  File   : router.js
  Date   : 2016年05月12日 星期四 13时02分29秒
*/

export default function routerConfig (router) {
  // normal routes
  router.map({
    '/todo': {
      name: 'todo',
      component: require('./views/Todo.vue')
    },

    '/attendance': {
      name: 'attendance',
      component: require('./views/Attendance.vue')
    },
    '/me': {
      name: 'me',
      component: require('./views/Me.vue')
    },
    '/result': {
      name: 'result',
      component: require('./views/result.vue')
    },

    // not found handler
    '*': {
      component: require('./views/Todo.vue')
    }
  })

  // redirect
  router.redirect({
    '/': '/todo'
  })

  // global before
  // 3 options
  // 1. return a boolean
  // 2. return a Promise that resolves to a boolean
  // 3. call transition.next() or transition.abort()
  // router.beforeEach( (transition) => {
    // if (transition.to.path === '/forbidden') {
      // router.app.authenticating = true
      // setTimeout( () => {
        // router.app.authenticating = false
        // alert('this route is forbidden by a global before hook!')
        // transition.abort()
      // }, 3000)
    // } else {
      // transition.next()
    // }
  // })
}
