<style>
#attendance {
  padding-top: 10px;
  text-align: center;
}
.weui_icon.weui_icon_safe_success.icon_big,
.attendance-tips {
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.attendance-tips {
  top: 65%;
}
</style>

<template>
  <div id="attendance">
    <component :is="currentView"></component>
  </div> <!-- /.#attendance -->
</template>

<script>
  import { setAttendanceCurrentView } from '../vuex/actions'
  import { getAttendanceCurrentView } from '../vuex/getters'
  import StartAttendance from '../components/attendance/StartAttendance.vue'
  import DoAttendance from '../components/attendance/DoAttendance.vue'

  export default {
    vuex: {
      actions: {
        setAttendanceCurrentView
      },
      getters: {
        getAttendanceCurrentView
      }
    },
    components: {
      StartAttendance,
      DoAttendance
    },
    created () {
    },
    ready () {
    },
    computed: {
      currentView () {
        return this.getAttendanceCurrentView
      }
    },
    data () {
      return {
        currentView: '',
        showConfirm: false
      }
    },
    methods: {
      start () {
        this.showConfirm = true
      }
    },
    events: {
      'on-confirm': function () {
        // this.currentView = 'DoAttendance'
        this.setAttendanceCurrentView('DoAttendance')
        // $.ajax({
        //   method: 'POST',
        //   url: 'http://202.195.67.56/adm/index.php/Index/doattentance',
        //   data: {
        //     'course_id': '1',
        //     'user_id': '3020031615',
        //     'time': '2016-05-27'
        //   }
        // })
      }
    }
  }
</script>
