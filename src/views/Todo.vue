<style>
</style>

<template>
  <div id="">
    <component :is="currentView" keep-alive></component>
  </div>
</template>

<script>
  import { setTodoCurrentView } from '../vuex/actions'
  import { getTodoCurrentView } from '../vuex/getters'
  import TodoHome from './TodoHome.vue'
  import TodoDetail from './TodoDetail.vue'

  export default {
    vuex: {
      getters: {
        getTodoCurrentView
      },
      actions: {
        setTodoCurrentView
      }
    },
    components: {
      TodoHome,
      TodoDetail
    },
    watch: {
      // getTodoCurrentView (val) {
        // this.currentView = val
      // }
    },
    computed: {
      currentView () {
        return this.getTodoCurrentView
      }
    },
    created () {
      // this.currentView = 'TodoHome'
      // this.currentView = this.getTodoCurrentView
      this.setTodoCurrentView('TodoHome')
    },
    ready () {
    },
    data () {
      return {
        currentView: ''
      }
    },
    methods: {
    }
  }
</script>
