import request from '@/utils/request'

export default {
  addVideoInfo(videoInfo) {
    return request({
      url: '/eduService/eduVideo/addVideoInfo',
      method: 'post',
      data: videoInfo
    })
  },
  deleteVideoInfo(videoId) {
    return request({
      url: '/eduService/eduVideo/deleteVideoInfo/' + videoId,
      method: 'delete'
    })
  },
  updateVideoInfo(videoInfo) {
    return request({
      url: '/eduService/eduVideo/updateVideoInfo',
      method: 'put',
      data: videoInfo
    })
  },
  getVideoInfo(videoId) {
    return request({
      url: '/eduService/eduVideo/getVideoInfo/' + videoId,
      method: 'get'
    })
  },
  deleteVideoByAliYun(videoSourceId) {
    return request({
      url: '/eduVideo/video/deleteVideo/' + videoSourceId,
      method: 'delete'
    })
  }
}
