addCourseComment: 添加一个随堂评价
----------------------------------
method: POST
data: {
  userId: '3020032014'
  course: '软件工程导论'
  time: '2016-05-21 14:01'
  comment: '表现不错，大家都认真听讲',
  stars: '4' // 满分五颗星
}
res: {

}

getTodos: 获取相应时间段内要上课的信息
------------------
method: GET
data: {
  userId: '3020031025'
  startDate: '2016-05-21',
  endDate: '2016-05-27'
}
res: {
  {
    'course': '软件工程导论',
    'classFor': '12计71'
  }...
}

recordStartCourse: 记录上课时间
---------------------------------
method: GET
data: {
  userId: '',
  time: '',
  course: ''
}
res: {
  success: true
}

doAttentance: 发起一次考勤
------------------
method: GET
data: {
  userId: '',
  classFor: '13计71',
  course: '软件工程导论',
  time: '2016-05-21 14:01'
}
res: {
  teacher
  attendanceId: '', 生成的一个考勤任务id,用于定位后台任务或网页被手动关闭的考勤状态恢复
  autoIndex(自增id,前后台同步随时间变化，用于前端拼接生成url,动态渲染二维码
  超过一定的时间访问此url，则不合法,疑似作弊,比如分享给了别人，
  拍照扫码等)
}

checkAttendanceState: 获取某个考勤任务的状态(比如是否完成总人数点名)
---------------------
method: GET
data: {
  attendanceId
}
res: {
  total: 50
  current: 38
}


