import request from '@/utils/request'

export default {
  getStaData(day) {
    return request({
      url: '/staService/statisticsDaily/createStatisticsByDate/' + day,
      method: 'post'
    })
  }
}
