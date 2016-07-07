<style>
#attendance {
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

    <icon-image
      type="safe_success"
      size="big"
    >
    </icon-image>

    <div class="attendance-tips weui_btn weui_btn_plain_primary" @click="start">发起一次考勤</div>

    <dialog-confirm
      :show.sync="showConfirm"
      title="是否要发起当前课程的考勤?"
      confirm-text="确认"
      cancel-text="取消"
      mask-transition="vux-fade"
      dialog-transition="vux-dialog"
    >
    </dialog-confirm>

  </div> <!-- /.#attendance -->
</template>

<script>
  import IconImage from 'vux-components/icon'
  import DialogConfirm from 'vux-components/confirm'

  export default {
    components: {
      IconImage,
      DialogConfirm
    },
    ready () {
    },
    data () {
      return {
        showConfirm: false
      }
    },
    methods: {
      start () {
        this.showConfirm = true
      }
    },
    events: {
    }
  }
</script>
