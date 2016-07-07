<template>
  <div class="me-assess-container">
    <div class="rate">
      <span>请您给出课堂评价:</span>
      <star-rater
        :max="5"
        :value.sync="assessRate"
        active-color="#04BE02"
        :font-size="34"
      >
      </star-rater>
      <span class="rate-text">{{ assessRate }}分</span>
    </div>
    <div class="form">
      <assess-textarea
        :max="200"
        :rows="8"
        :value.sync="assessContent"
        placeholder="请您输入对这节课的评价与小结"
      >
      </assess-textarea>
    </div>

    <button class="weui_btn weui_btn_plain_primary" @click.prevent="doneAssess">提交评价</button>

    <assess-toast
      :show.sync="showAssessToast"
      :time="2000"
      :type="toastType"
    >
      <span>{{ toastText }}</span>
    </assess-toast>
  </div>
</template>

<style lang="scss">
  @import "../../vars";

  .me-assess-container {
    padding: 10px;

    .rate {
      color: $dark-grey;
    }
    .rate-text {
      font-size: 18px;
      display: inline-block;
      vertical-align: top;
      float: right;
    }
    .form {
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .form:active {
      border-color: $blue;
    }
  }
</style>

<script>
  import 'weui'
  import moment from 'momentjs'
  import { setMeCurrentView, addOneFeed } from '../../vuex/actions'
  import { getTodoDetailItem } from '../../vuex/getters'
  import StarRater from 'vux-components/rater'
  import AssessTextarea from 'vux-components/x-textarea'
  import AssessToast from 'vux-components/toast'

  export default {
    vuex: {
      getters: {
        getTodoDetailItem
      },
      actions: {
        setMeCurrentView,
        addOneFeed
      }
    },
    components: {
      StarRater,
      AssessTextarea,
      AssessToast
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
        assessRate: 5,
        assessContent: '',
        toastType: '',
        toastText: '',
        assessToastDuration: 2000,
        showAssessToast: false
      }
    },
    methods: {
      doneAssess () {
        if (this.assessContent.length < 10) {
          this.showAssessToast = true
          this.toastType = 'warn'
          this.toastText = '不可少于10字!'
        } else {
          this.showAssessToast = true
          this.toastType = ''
          this.toastText = '评价成功!'
          this.addOneFeed({
            'course': this.item.course,
            'rate': this.assessRate,
            'comment': this.assessContent,
            'classFor': this.item.classFor,
            'time': moment().format('YYYY-MM-DD h:mm:ss')
          })
          this.assessRate = 5
          this.assessContent = ''
          setTimeout(() => {
            this.setMeCurrentView('MeFeed')
          }, this.assessToastDuration)
        }
      },
      addAssess () {

      }
    },
    route: {
      data ({ to }) {
        return {
        }
      }
    }
  }
</script>
