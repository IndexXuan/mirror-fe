<style>
  ul {
    list-style: none;
    overflow: hidden;
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
  <div>
    <todo-tab
      :index.sync="activeTabIndex"
      :line-width="2"
      :default-color="'#666'"
      :active-color="'#04be02'"
      :animation="true"
    >
      <todo-tab-item
        :selected="activeTabIndex === 0"
      >
        未完成
      </todo-tab-item>
      <todo-tab-item
        :selected="activeTabIndex === 1"
      >
        已完成
      </todo-tab-item>
    </todo-tab>

    <div class="scroll-container" style="-webkit-overflow-scrolling: touch;overflow: scroll;">
      <div class="weui_cells weui_cells_checkbox" style="margin-top: 0;">
        <todo-item 
          v-for="item in todos"
          :todo.sync="item"
        >
        </todo-item>
      </div>
      <div class="show-more" v-if="false">加载更多...</div>
    </div>
  </div>
</template>

<script>
  import 'weui'
  import 'animate.css'
  import { getTodos, getTodoActiveTabIndex } from '../../vuex/getters'
  import { setTodoActiveTabIndex, setTodos } from '../../vuex/actions'
  import TodoTab from 'vux-components/tab'
  import TodoTabItem from 'vux-components/tab-item'
  import TodoItem from 'components/TodoItem.vue'

  export default {
    vuex: {
      getters: {
        allTodos: getTodos,
        todoActiveTabIndex: getTodoActiveTabIndex
      },
      actions: {
        setTodoActiveTabIndex,
        setTodos
      }
    },
    components: {
      TodoTab,
      TodoTabItem,
      TodoItem
    },
    data () {
      return {
        activeTabIndex: -1,
        store: [],
        todos: []
      }
    },
    methods: {
      filter (done = true) {
        this.todos = this.store.filter(item => item.done === done)
      }
    },
    computed: {
    },
    created () {
    },
    ready () {
      this.activeTabIndex = this.todoActiveTabIndex

      let full = document.body.clientHeight || document.documentElement.clientHeight
      let actionBarHeight = 40
      let tabHeight = 44
      let tabBarHeight = 55
      document.querySelector('.scroll-container').style.height = full - actionBarHeight - tabHeight - tabBarHeight + 'px'
    },
    watch: {
      allTodos (val) { // data done, a bit bad code here
        this.store = val
        this.filter(this.activeTabIndex === 1)
      },
      activeTabIndex (val) {
        this.setTodoActiveTabIndex(val)
        if (val === 0) {
          this.filter(false)
        }
        if (val === 1) {
          this.filter(true)
        }
      }
    }
  }
</script>
