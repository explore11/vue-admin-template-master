import request from '@/utils/request'

export default {
  getTeacherListByCondition(current, limit, queryEduTeacher) {
    return request({
      url: `/eduService/eduTeacher/multiQueryEduTeacherPage/${current}/${limit}`,
      method: 'post',
      data: queryEduTeacher
    })
  },

  deleteTeacherById(id) {
    return request({
      url: '/eduService/eduTeacher/' + id,
      method: 'delete'
    })
  },
  addEduTeacher(eduTeacher) {
    return request({
      url: '/eduService/eduTeacher/addEduTeacher',
      method: 'post',
      data: eduTeacher
    })
  },
  queryEduTeacher(id) {
    return request({
      url: '/eduService/eduTeacher/queryEduTeacher/' + id,
      method: 'get'
    })
  },
  updateEduTeacher(updateEduTeacher) {
    return request({
      url: '/eduService/eduTeacher/updateEduTeacher',
      method: 'post',
      data: updateEduTeacher
    })
  }
}
