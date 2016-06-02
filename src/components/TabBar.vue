<style>
  .weui_tabbar_item.weui_bar_item_on .weui_tabbar_label {
    color: #949292;
  }
  .active-label {
    color: #09BB07!important;
  }
</style>

<template>
  <div class="weui_tab">
    <div class="weui_tab_bd">

    </div>
    <div class="weui_tabbar">
      <a v-for="menu in menus" @click="activeMe(menu)" v-link="{ path: menu.link }" class="weui_tabbar_item weui_bar_item_on">
        <div class="weui_tabbar_icon">
          <span v-show="false" class="vux-reddot"></span>
          <img :src="menu.icon + ( active == menu[idKey]? '-active.png': '.png' )" :alt="menu.label">
        </div>
        <p class="weui_tabbar_label" :class="{ 'active-label': active == menu[idKey] }">{{ menu.label }}</p>
      </a>
    </div>
  </div>
</template>

<style>
  
</style>

<script>
  import { getActiveTab } from '../vuex/getters'
  import { changeTab } from '../vuex/actions'

  export default {
    props: {
      menus: {
        type: Array
      },
      active: {
      }
    },
    vuex: {
      getters: {
        activeTab: getActiveTab
      },
      actions: {
        changeTab: changeTab
      }
    },
    components: {
    },
    ready () {
      if (this.active === void 0) {
        this.active = this.activeTab || this.$route.path
      }
    },
    data () {
      return {
        idKey: 'link',
        hasMsg: ''
      }
    },
    methods: {
      activeMe (menu) {
        this.changeTab(menu[this.idKey])
      }
    },
    watch: {
      activeTab (val) {
        this.active = val
      }
    }
  }
</script>
