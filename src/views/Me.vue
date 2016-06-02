<template>
  <div class="me-view-container">
    <component :is="currentView" keep-alive></component>
  </div>
</template>

<style lang="scss">
  @import "../vars";

  .fr {
    float: right;
  }
  .me-view-container {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .comment {
    padding: 10px;
    position: relative;
    overflow: hidden;
  }
  .comment::after {
    content: "";
    position: absolute;
    width: 100%;
    bottom: 0;
    border-bottom: 1px solid $light-grey;
  }
  .comment-course,
  .comment-time {
    font-size: 14px;
  }
  .comment-text {
    line-height: 1.7;
    color: #333;
  }
</style>

<script>
  import 'weui'
  import { getMeCurrentView } from '../vuex/getters'
  import MeFeed from '../views/MeFeed.vue'
  import MeAssess from '../views/MeAssess.vue'

  export default {
    vuex: {
      getters: {
        getMeCurrentView
      }
    },
    components: {
      MeFeed,
      MeAssess
    },
    created () {
    },
    ready () {
    },
    data () {
      return {
      }
    },
    computed: {
      currentView () {
        return this.getMeCurrentView
      }
    },
    route: {
      data ({ to }) {
        return {
        }
      }
    }
  }
</script>
