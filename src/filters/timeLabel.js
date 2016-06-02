/**
 *  vue filters
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Date   : Tue 24 May 2016 11:16:52 AM CST
 */

export default function timeLabel (timeStr) {
  if (timeStr === 'day') {
    return '今天'
  }
  if (timeStr === 'week') {
    return '本周'
  }
  if (timeStr === 'month') {
    return '本月'
  }
}
