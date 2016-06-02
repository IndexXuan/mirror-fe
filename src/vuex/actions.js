/**
 *  Vuex actions
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Date   : Mon 16 May 2016 07:28:04 PM CST
 */

export const showLoading = makeAction('SHOW_LOADING')
export const hideLoading = makeAction('HIDE_LOADING')

export const changeTab = makeAction('CHANGE_TAB')

export const setUserInfo = makeAction('SET_USER_INFO')

export const setTodos = makeAction('SET_TODOS')
export const setTodoActiveTabIndex = makeAction('SET_TODO_ACTIVE_TAB_INDEX')
export const setDetailTodoItem = makeAction('SET_DETAIL_TODO_ITEM')
export const setTodoCurrentView = makeAction('SET_TODO_CURRENT_VIEW')
export const doneOneTodoItem = makeAction('DONE_ONE_TODO_ITEM')

export const setAttendanceCurrentView = makeAction('SET_ATTENDANCE_CURRENT_VIEW')

export const setMeCurrentView = makeAction('SET_ME_CURRENT_VIEW')
export const setMeFeeds = makeAction('SET_ME_FEEDS')
export const addOneFeed = makeAction('ADD_ONE_FEED')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
