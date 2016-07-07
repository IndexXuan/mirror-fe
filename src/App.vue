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
  import 'whatwg-fetch'
  import FastClick from 'fastclick'
  import ls from './services/ls'
  import store from './vuex/store'
  import {
    setToken,
    showLoading,
    hideLoading,
    setUserInfo,
    setTodos,
    setMeFeeds
  } from './vuex/actions'
  import { getApiBaseUrl as apiBaseUrl, getLoadingState } from './vuex/getters'
  import ProgressBar from 'vux-components/progress'
  import LoadingIcon from 'vux-components/loading'
  import AppAlert from 'vux-components/alert'
  import TodoView from './containers/Todo'
  import AttendanceView from './containers/Attendance'
  import MeView from './containers/Me'
  import TabBar from 'components/TabBar.vue'
  
  export default {
    store,
    vuex: {
      getters: {
        apiBaseUrl,
        getLoadingState
      },
      actions: {
        setToken,
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
      this.menus = store.state.menus
      this.checkLogin().then((status) => {
        if (status.isLogin) {
          // this.fetchUserInfo()
        } else {
          this.$router.go('login')
        }
      })

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

        menus: []
      }
    },
    computed: {
      showLoadingToast () {
        return this.getLoadingState
      }
    },
    methods: {
      checkLogin () {
        return new Promise((resolve, reject) => {
          let token = ls.get('MIRROR_TOKEN')
          if (token) {
            this.setToken(token)
            resolve({isLogin: true})
          }
          reject({isLogin: false})
        })
      },
      fetchUserInfo () {
        fetch(`${this.apiBaseUrl}/user`, {
          method: 'GET',
          headers: {
            'authentication': `Bearer ${this.token}`
          }
        }).then((res) => {
          console.log(res.json())
        }).catch((err) => {
          console.error('fetch user info error', err)
        })
      },
      fetchTodos () {
        return new Promise((resolve, reject) => {
          fetch(this.apiBaseUrl + '/todos').then((res) => {
            return res.json()
          }).then((l) => {
            const lists = l && l.data
            lists.forEach((item) => (item.done = false))
            resolve(lists)
            this.hideLoading()
          }).catch((err) => {
            reject(new Error(err))
            this.hideLoading()
            console.error('getTodos api failed', err)
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
