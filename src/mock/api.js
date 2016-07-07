/**
 *  API Mock Data
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Tue 05 Jul 2016 04:33:28 PM CST
 */

'use strict'

const Mock = require('mockjs')
const Random = Mock.Random

module.exports = function () {
  var data = {
    user: {
      "errno": "0",
      "errmsg": "success",
      "data": []
    },
    todos: {
      "errno": "0",
      "errmsg": "success",
      "data": []
    },
    feeds: {
      "errno": "0",
      "errmsg": "success",
      "data": []
    }
  }

  // mock userInfo
  data.user = {
    "username": Random.cname(),
    "userno": Random.integer(100000000, 200000000)
  }

  // mock todos
  for (let i = 0; i < 10; i++) {
    data.todos.data.push({
      "id": i,
      "course": Random.cword(4, 8),
      "start_time": Random.datetime('yyyy-MM-dd HH:mm'),
      "end_time": Random.datetime('yyyy-MM-dd HH:mm'),
      "place": Random.city(true),
      "classFor": "12计71"
    })
  }

  // mock feeds
  for (let i = 0; i < 15; i++) {
    data.feeds.data.push({
      "id": i,
      "course": Random.cword(4, 8),
      "rate": Random.float(1, 5, 2),
      "time": Random.datetime('yyyy-MM-dd HH:mm:ss'),
      "comment": Random.cparagraph(3, 4),
      "classFor": "12计71"
    })
  }

  return data
}
