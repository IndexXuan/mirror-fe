/**
 *  Vuex Getters
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Tue 24 May 2016 05:04:08 PM CST
 */

export function getApiBaseUrl (state) {
  return state.apiBaseUrl
}

export function getLoadingState (state) {
  return state.showLoading
}

export function getActiveTab (state) {
  return state.activeTab
}

export function getUserInfo (state) {
  return state.userInfo
}

export function getTodos (state) {
  return state.todos
}

export function getTodoActiveTabIndex (state) {
  return state.todo_activeTabIndex
}

export function getTodoCurrentView (state) {
  return state.todo_currentView
}

export function getTodoDetailItem (state) {
  return state.todo_detailItem
}

export function getAttendanceCurrentView (state) {
  return state.attendance_currentView
}

export function getMeCurrentView (state) {
  return state.me_currentView
}

export function getMeFeeds (state) {
  return state.me_feeds
}
