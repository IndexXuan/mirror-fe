<style>
  ul.result-ul {
    list-style: none;
    overflow: hidden;
    padding: 10px;
    height: 450px;
    overflow: scroll;
  }
  li.result-item {
    margin-bottom: 10px;
  }
  h2 {
    text-align: center;
  }
  /* filterBy渐隐效果 */
  .staggered-transition {
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    overflow: hidden;
    margin: 0;
    height: 20px;
  }
  .staggered-enter, .staggered-leave {
    opacity: 0;
    height: 0;
  }
  /* 暂未实现 applied during enter/leave transition */
  .staggered-enter-active, .staggered-leave-active { 
    transition: opacity .5s ease;  
  } 
  /* v-for orderBy 自动动画 applied during moving transition */
  .staggered-move {
    transition: transform .8s cubic-bezier(.55, 0, .1, 1); 
  }
</style>

<template>
  <h2>考勤结果</h2>
  <ul class="result-ul">
    <li class="result-item" v-for="item in lists">学生号: {{ item.stu_id}}签到成功,　<br>时间: {{ item.time }}</li>
  </ul>
</template>

<script>
  import $ from 'jquery'

  export default {
    components: {
    },
    data () {
      return {
        lists: []
      }
    },
    methods: {
      fetchData () {
        $.ajax({
          method: 'GET',
          url: 'http://202.195.67.56/adm/index.php/Index/getattend?user_id=3020031516'
        }).done((data) => {
          this.lists = JSON.parse(data)
        })
      }
    },
    computed: {
    },
    created () {
    },
    ready () {
      this.fetchData()
    },
    watch: {
    }
  }
</script>
