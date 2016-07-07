/**
 *  test for Component TabBar
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Wed 06 Jul 2016 03:58:07 PM CST
 */

import Vue from 'vue'
import store from '../../../src/vuex/store'
import TabBar from 'components/TabBar'

describe('TabBar Component', () => {

  beforeEach(() => {

  })

  const vm = new Vue({
    store,
    data: {
      menus: [
        {
          'label': '待办',
          'link': '/todo',
          'icon': './static/images/todo'
        },
        {
          'label': '考勤',
          'link': '/attendance',
          'icon': './static/images/attendance'
        },
        {
          'label': '记录',
          'link': '/me',
          'icon': './static/images/me'
        }
      ]
    },
    template: `
                <div>
                  <tab-bar :menus="menus"></tab-bar>
                </div>
              `,
    components: { TabBar }
  }).$mount()

  let els = vm.$el.querySelectorAll('.weui_tabbar_label')
  let comp = vm.$children[0]

  it('should render correct tab label', () => {
    expect(els[0].textContent).to.contain(vm.menus[0].label)
    expect(els[1].textContent).to.contain(vm.menus[1].label)
    expect(els[2].textContent).to.contain(vm.menus[2].label)
  })

  xit('should active correct tab', (done) => {
    comp.activeMe(vm.menus[1]) // get component instance
    Vue.nextTick(() => {
      expect(els[1].classList.toString()).to.contain('active-label')
      done()
    })
  })

  xit('active should have default value when comp ready', (done) => {
    Vue.nextTick(() => {
      done()
    })
  })

})
