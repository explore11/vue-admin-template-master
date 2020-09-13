import request from '@/utils/request'

export default {
  getAllChapterVideo(courseId) {
    return request({
      url: '/eduService/eduChapter/getAllChapterVideo/' + courseId,
      method: 'get'
    })
  }
}
