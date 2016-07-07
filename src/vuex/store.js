/**
 *  Vuex Store Center
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Mon 16 May 2016 07:25:50 PM CST
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  apiBaseUrl: 'http://localhost:3003',
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
  ],
  userInfo: {},
  showLoading: false,
  activeTab: window.location.href.split('#!')[1],

  todo_currentView: 'TodoHome',
  todo_activeTabIndex: 0,
  todo_detailItem: {},
  todos: [],

  attendance_currentView: 'StartAttendance',

  me_currentView: 'MeFeed',
  me_feeds: []
}

// global mutations
const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  SHOW_LOADING (state) {
    state.showLoading = true
  },
  HIDE_LOADING (state) {
    state.showLoading = false
  },
  CHANGE_TAB (state, active) {
    state.activeTab = active
  },
  SET_USER_INFO (state, info) {
    state.userInfo = info
  },
  SET_TODOS (state, todos) {
    state.todos = todos
  },
  SET_DETAIL_TODO_ITEM (state, todo) {
    state.todo_detailItem = todo
  },
  SET_TODO_CURRENT_VIEW (state, view) {
    state.todo_currentView = view
  },
  SET_ATTENDANCE_CURRENT_VIEW (state, view) {
    state.attendance_currentView = view
  },
  SET_ME_CURRENT_VIEW (state, view) {
    state.me_currentView = view
  },
  SET_TODO_ACTIVE_TAB_INDEX (state, activeTabIndex) {
    state.todo_activeTabIndex = activeTabIndex
  },
  DONE_ONE_TODO_ITEM (state, id) {
    state.todos.forEach((item) => {
      if (item.id === id) {
        item.done = true
      }
    })
  },
  SET_ME_FEEDS (state, meFeeds) {
    state.me_feeds = meFeeds
  },
  ADD_ONE_FEED (state, info) {
    state.me_feeds.unshift(info)
    localStorage.setItem(`${STORAGE_PREFIX}-feeds`, JSON.stringify(state.me_feeds))
    // ajax me
  }
}

export default new Vuex.Store({
  state,
  mutations
})

export const STORAGE_PREFIX = 'mirror-'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  localStorage.clear()
}

