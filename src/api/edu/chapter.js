import request from '@/utils/request'

export default {
  getAllChapterVideo(courseId) {
    return request({
      url: '/eduService/eduChapter/getAllChapterVideo/' + courseId,
      method: 'get'
    })
  },
  addChapterInfo(chapterInfo) {
    return request({
      url: '/eduService/eduChapter/addChapterInfo',
      method: 'post',
      data: chapterInfo
    })
  },
  getChapterInfo(chapterId) {
    return request({
      url: '/eduService/eduChapter/getChapterInfo/' + chapterId,
      method: 'get'
    })
  },
  updateChapterInfo(chapterInfo) {
    return request({
      url: '/eduService/eduChapter/updateChapterInfo',
      method: 'put',
      data: chapterInfo
    })
  },
  deleteChapterInfo(chapterId) {
    return request({
      url: '/eduService/eduChapter/deletedChapterInfo/' + chapterId,
      method: 'delete'
    })
  }
}
