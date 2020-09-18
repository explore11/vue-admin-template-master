import request from '@/utils/request'

export default {
  getStaData(day) {
    return request({
      url: '/staService/statisticsDaily/createStatisticsByDate/' + day,
      method: 'post'
    })
  },
  getShowData(searchObj) {
    return request({
      url: `/staService/statisticsDaily/showChart/${searchObj.begin}/${searchObj.end}/${searchObj.type}`,
      method: 'get'
    })
  }
}
