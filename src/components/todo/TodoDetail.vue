<style lang="scss">
@import "../../vars";

.fl {
  float: left;
}
.fr {
  float: right;
}
#todo-detail {
  text-align: center;
  padding: 5px 20px;
}
.detail-title {
  font-size: 20px;
}
.action-wrapper {
  text-align: right;
  color: $grey;
  position: relative;
  top: -37px;
}
.course-info {
  padding: 5px;
  text-align: left;
  color: #777373;
}
</style>

<template>
  <div id="todo-detail">
    <div class="action-wrapper"><a class="" @click="doneMe">完成</a></div>
    <div style="overflow: hidden;">
      <span class="classFor fl">班级: {{ item.classFor }}</span>
      <span class="place fr">地点: {{ item.place }}</span>
      <span class="start-time fl">开始时间: {{ item.start_time}}</span>
      <span class="end-time fl">结束时间: {{ item.end_time}}</span>
    </div>
    <span class="detail-title">课程大纲</span><br>
    <!-- <p class="course-info" v-html="info"></p> -->
    <p class="course-info" v-html="item.info || info"></p>
    <a v-if="!item.done" class="weui_btn weui_btn_plain_primary" @click.prevent="startCourse">开始上课</a>
    <a v-if="!item.done" class="weui_btn weui_btn_plain_default" @click.prevent="closeCourse">结束课程</a>
    <a v-else>课程已经结束, 您辛苦了~</a>

    <dialog-confirm
      :show.sync="showConfirm"
      :title="dialogTitle"
      confirm-text="确认"
      cancel-text="取消"
      mask-transition="vux-fade"
      dialog-transition="vux-dialog"
    >
    </dialog-confirm>
  </div>
</template>

<script>
  import {
    changeTab,
    setTodoCurrentView,
    setAttendanceCurrentView,
    setMeCurrentView,
    doneOneTodoItem
  } from '../../vuex/actions'
  import { getTodoDetailItem } from '../../vuex/getters'
  import DialogConfirm from 'vux-components/confirm'

  export default {
    vuex: {
      getters: {
        getTodoDetailItem
      },
      actions: {
        changeTab: changeTab,
        setTodoCurrentView,
        setAttendanceCurrentView,
        setMeCurrentView,
        doneOneTodoItem
      }
    },
    components: {
      DialogConfirm
    },
    ready () {
    },
    computed: {
      item () {
        return this.getTodoDetailItem
      }
    },
    data () {
      return {
        action: '', // 区分是哪个发起的dialog
        showConfirm: false,
        dialogTitle: '',
        info: 'web编程基础知识 <br>1.1 web的工作原理 <br>1.2 Internet网络协议 <br>1.3 web程序设计 <br>1.4 web开发工具的使用'
      }
    },
    methods: {
      doneMe () {
        // 取消
        this.setTodoCurrentView('TodoHome')
      },
      doneThisItem () {
        let id = this.item.id
        this.doneOneTodoItem(id)
      },
      startCourse () {
        this.showConfirm = true
        this.dialogTitle = '请确认开始本节课并考勤?'
        this.action = '0'
      },
      closeCourse () {
        this.showConfirm = true
        this.dialogTitle = '请确认本节课程结束?'
        this.action = '1'
      }
    },
    events: {
      'on-confirm': function () {
        if (this.action === '0') { // 发起考勤
          this.doneThisItem()
          this.setTodoCurrentView('TodoHome')
          this.setAttendanceCurrentView('DoAttendance')
          this.changeTab('/attendance')
          this.$router.go('/attendance')
        }
        if (this.action === '1') { // 结束课程
          this.doneThisItem()
          this.setTodoCurrentView('TodoHome')
          this.setMeCurrentView('MeAssess')
          this.changeTab('/me')
          this.$router.go('/me')
        }
      }
    }
  }
</script>
