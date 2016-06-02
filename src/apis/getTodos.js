/**
 *  get todos
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 */

// 使用 Mock
import Mock from 'mockjs'

Mock.setup({
  timeout: '800-1500'
})

const datas = Mock.mock('http://a.com/todos', {
  'errno': -1,
  'errmsg|2': 'msg',
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      'course': '软件工程导论',
      'start_time': '2016-05-30 14:00:00',
      'end_time': '2016-05-30 15:25:00',
      'place': '九号楼608',
      'classFor': '12计71'
    }
  ]
})

export default datas
// 输出结果
// console.log(JSON.stringify(data, null, 2))
