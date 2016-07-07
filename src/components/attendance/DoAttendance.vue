<style>
.do-attendance-tips {

}
.action-wrapper1 {
  text-align: right;
  position: relative;
  top: -91px;
  right: 10px;
}
.qrcode-container {
  position: fixed;
  left: 50%;
  top: 55%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.icon-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.fingerprint {
  width: 60px;
  height: 80px;
}
.done-link {
  color: #333;
}
</style>

<template>
  <div id="do-attendance">

    <span class="do-attendance-tips">
      {{ user.username }}老师 - {{ item.course }}<br>考勤中, 请同学们微信扫码进行签到
    </span>

    <div class="icon-container">
      <icon-image
        type="safe_success"
        size="big"
      >
      </icon-image>
    </div>

    <div class="qrcode-container">
      <qr-code
        :value="currentUrl"
        :size="100"
      >
      </qr-code>
      <img :src="fingerPrintIcon" alt="fingerprint" class="fingerprint">
    </div>

    <div class="action-wrapper1"><a class="done-link" @click="done" v-link="{ path: '/result' }" target="_blank">结束考勤</a></div>
  </div> <!-- /.#attendance -->
</template>

<script>
  import IconImage from 'vux-components/icon'
  import QrCode from 'components/QrCode.vue'
  import { getUserInfo, getTodoDetailItem } from '../../vuex/getters'
  import { setAttendanceCurrentView } from '../../vuex/actions'

  export default {
    vuex: {
      getters: {
        getUserInfo,
        getTodoDetailItem
      },
      actions: {
        setAttendanceCurrentView
      }
    },
    components: {
      IconImage,
      QrCode
    },
    computed: {
      item () {
        return this.getTodoDetailItem
      },
      user () {
        return this.getUserInfo
      }
    },
    ready () {
      this.pollUrl()
    },
    data () {
      return {
        fingerPrintIcon: './static/images/fingerprint.png',
        interval: 5,
        id: 50,
        currentUrlBase: 'http://202.195.67.56/adm/index.php/Index/checkattend?user_id=3020031516&course_id=%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B%E5%AF%BC%E8%AE%BA',
        currentUrl: '',
        teacher: '张功杰',
        course: '软件工程导论'
      }
    },
    methods: {
      pollUrl () {
        setInterval(() => {
          this.currentUrl = this.currentUrlBase + '&id=' + this.id++ + '&stud_id=' + '3020122495'
        }, this.interval * 1000)
      },
      done () {
        this.setAttendanceCurrentView('StartAttendance')
      }
    }
  }
</script>
