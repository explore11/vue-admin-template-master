import request from '@/utils/request'

export default {
  addCourseInfo(courseInfo) {
    return request({
      url: '/eduService/eduCourse/addCourseInfo',
      method: 'post',
      data: courseInfo
    })
  }
}
