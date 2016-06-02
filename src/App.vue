<template>
  <div>
    <progress-bar
      :required="true"
      :percent.sync="progress"
      :template="3"
    >
    </progress-bar>

    <header class="app-header">
      教师随身助理
      <i class="logo"></i>
    </header>

    <loading-icon
      :show.sync="showLoadingToast"
      :text="loadingText"
    >
    </loading-icon>

    <app-alert
      :show.sync="showErrorAlert"
      title="系统提示"
      button-text="确认"
    >
    >
    </app-alert>

    <router-view 
      class="view" 
      keep-alive
    > 
    </router-view>

    <div class="fixed-bottom">
      <tab-bar :menus="menus"></tab-bar>
    </div>
  </div>
</template>

<style lang="scss">
  [v-cloak] {
    display: none;
  }
  html,
  body {
    height: 100%;
    overflow: hidden;
  }
  .view {
    transition: all .5s ease;
  }
  .mirror-enter, 
  .mirror-leave {
    opacity: 0;
    transform: translate3d(10px, 0, 0);
  }
  .v-link-active {
    color: #ccc;
  }
  .app-header {
    position: relative;
    font-size: 16px;
    color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(54, 56, 54, 0.9);
      z-index: -1;
    }
    
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255, .1);
      z-index: -1;
    }
  }
  .app-header .logo {
    background: url(../static/images/logo.png) no-repeat center;
    background-size: 100%;
    position: absolute;
    left: 11px;
    top: 11px;
    width: 18px;
    height: 18px;
  }
  .fixed-bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
</style>

<script>
  import $ from 'jquery'
  import './apis/getTodos'

  import 'whatwg-fetch'
  import FastClick from 'fastclick'

  import store from './vuex/store'
  import {
    showLoading,
    hideLoading,
    setUserInfo,
    setTodos,
    setMeFeeds
  } from './vuex/actions'
  import { getLoadingState } from './vuex/getters'

  import ProgressBar from 'vux-components/progress'
  import LoadingIcon from 'vux-components/loading'
  import AppAlert from 'vux-components/alert'

  import TodoView from './views/Todo'
  import TabBar from './components/TabBar.vue'

  import AttendanceView from './views/Attendance'

  import MeView from './views/Me'
  
  export default {
    store,
    vuex: {
      getters: {
        getLoadingState
      },
      actions: {
        showLoading,
        hideLoading,
        setUserInfo,
        setTodos,
        setMeFeeds
      }
    },
    components: {
      ProgressBar,
      AppAlert,
      LoadingIcon,
      TodoView,
      AttendanceView,
      MeView,
      TabBar
    },
    created () {
      FastClick.attach(document.body)
      setTimeout(() => {
        this.showLoading()
        this.loading()
        this.fetchTodos()
          .then((data) => {
            this.setTodos(data)
          })
          .catch((err) => {
            console.error(err)
          })
      }, 500)
    },
    ready () {
    },
    data () {
      return {
        dialogText: '',
        showErrorAlert: false,

        progress: 5,
        showProgressBar: false,

        loadingText: '',

        menus: [
          {
            'label': '待办',
            'link': '/todo',
            'icon': './static/images/todo'
          },
          {
            'label': '考勤',
            'link': '/attendance',
            'icon': './static/images/attendance'
          },
          {
            'label': '记录',
            'link': '/me',
            'icon': './static/images/me'
          }
        ]
      }
    },
    computed: {
      showLoadingToast () {
        return this.getLoadingState
      }
    },
    methods: {
      fetchTodos () {
        return new Promise((resolve, reject) => {
          $.ajax({
            type: 'GET',
            url: 'http://a.com/todos'
          }).done((data) => {
            const l = JSON.parse(data)
            const lists = l && l.list
            lists.forEach((item) => (item.done = false))
            resolve(lists)
          }).fail((err) => {
            reject(new Error(err))
            console.error(err)
          }).always(() => {
            this.hideLoading()
          })
        })
      },
      loading () {
        let progress = 0
        let timer = setInterval(() => {
          if (progress < 80) {
            progress = progress + 5
            this.loadingText = `${progress}%`
          } else if (progress >= 80 && progress < 100) {
            if (this.showLoadingToast === false) {
              progress++
              this.loadingText = `${progress}%`
            }
          } else {
            this.showLoadingToast = false
            this.progress = 100
            clearInterval(timer)
          }
        }, 4)
      } // end of loading
    }
  }
</script>
