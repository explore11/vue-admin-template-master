import request from '@/utils/request'

export default {
  getQuerySubjectList() {
    return request({
      url: '/eduService/eduSubject/getAllSubjectByOneAndTwo',
      method: 'get'
    })
  }
}
