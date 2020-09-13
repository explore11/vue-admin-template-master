import request from '@/utils/request'

export default {
  addCourseInfo(courseInfo) {
    return request({
      url: '/eduService/eduCourse/addCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  getCourseInfoById(courseId) {
    return request({
      url: '/eduService/eduCourse/queryCourseInfo/' + courseId,
      method: 'get'
    })
  },
  updateCourseInfo(courseInfo) {
    return request({
      url: '/eduService/eduCourse/updateCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  getCoursePublicInfo(courseId) {
    return request({
      url: '/eduService/eduCourse/getCoursePublicInfo/' + courseId,
      method: 'get'
    })
  },
  coursePublic(courseId) {
    return request({
      url: '/eduService/eduCourse/coursePublic/' + courseId,
      method: 'post'
    })
  }
}
