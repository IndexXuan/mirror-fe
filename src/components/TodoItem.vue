<style lang="scss">
  @import '../vars';

  .todo {
    display: inline-block;
    width: 100%;
  }
  .time {
    padding-left: 20px;
  }
  .weui_cell.weui_check_label {

    &.item-disabled {
      opacity: .5;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 20px;
      height: 14px;
    }
    & .course-name {
      font-size: 16px;
    }
    & .class-for,
    & .todo-time {
      font-size: 12px;
      color: $dark-grey;
    }
    & .todo-time.week {
      color: $orange; 
    }
    & .todo-time.month {
      color: $blue; 
    }

    & .todo-detail-link {
      float: right;
      margin-right: 10px;
      opacity: .7;
    }
  }
  // patch the icon-size
  .weui_icon_info_circle:before {
    font-size: 18px;
  }
</style>

<template>
  <div class="weui_cell weui_check_label" :class="{ 'item-disabled': todo.done, 'week': todo.time == 'week', 'month': todo.time == 'month' }">
    <div class="weui_cell_hd" @click="toggleTodo(todo)">
      <input type="checkbox" class="weui_check" :disabled="todo.done" :checked="todo.done" @change="toggleTodo(todo)">
      <i class="weui_icon_checked"></i>
    </div>
    <div class="weui_cell_bd weui_cell_primary">
      <div class="course-name">{{ todo.course }}</div>
      <span class="class-for">{{ todo.classFor }}</span>
      <!-- <span class="todo-time" :class="{ 'week': todo.time == 'week', 'month': todo.time == 'month' }">{{ todo.time | timeLabel }}</span> -->
      <span class="todo-time" :class="{ 'week': todo.time == 'week', 'month': todo.time == 'month' }">{{ todo.start_time | removeYear }}</span>
    </div>
    <a class="todo-detail-link" @click.prevent="goTodoDetail(todo)">
      <i class="weui_icon weui_icon_info_circle"></i>
    </a>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { setDetailTodoItem, setTodoCurrentView } from '../vuex/actions'
  import { getTodoActiveTabIndex } from '../vuex/getters'
  import { removeYear } from '../filters/'

  Vue.filter('removeYear', removeYear)

  export default {
    vuex: {
      getters: {
        getTodoActiveTabIndex
      },
      actions: {
        setDetailTodoItem: setDetailTodoItem,
        setTodoCurrentView
      }
    },
    props: ['todo'],
    data () {
      return {
      }
    },
    created () {
    },
    ready () {
    },
    methods: {
      toggleTodo (todo) {
        if (this.getTodoActiveTabIndex === 0) { // hasDone tab cannot cancel
          todo.done = !todo.done
        }
      },
      goTodoDetail (todo) {
        if (this.getTodoActiveTabIndex === 0) {
          this.setDetailTodoItem(todo)
          this.setTodoCurrentView('TodoDetail')
        }
      }
    }
  }
</script>
