/**
 *  test for Component QrCode
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Wed 06 Jul 2016 03:58:07 PM CST
 */

import Vue from 'vue'
import QrCode from 'components/QrCode'

describe('QrCode Component', () => {

  beforeEach(() => {

  })

  it('should render correct content', () => {
    const vm = new Vue({
      data: {
        value: 'https://www.baidu.com/',
        size: 100
      },
      template: `
                 <div>
                   <qr-code :value="value" :size="size"></qr-code>
                 </div>
                `,
      components: { QrCode }
    }).$mount()
    expect(vm.$el.querySelector('canvas'))
  })

})
