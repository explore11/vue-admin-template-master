<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>
      <!-- 所属分类 -->
      <el-form-item label="课程分类">
        <!--一级分类-->
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类" @change="getTwoSubjectList">
          <el-option v-for="oneSubject in oneSubjectList"
                     :key="oneSubject.id"
                     :label="oneSubject.title"
                     :value="oneSubject.id"/>
        </el-select>
        <!--二级分类-->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option v-for="twoSubject in twoSubjectList"
                     :key="twoSubject.id"
                     :label="twoSubject.title"
                     :value="twoSubject.id"/>
        </el-select>
      </el-form-item>
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option v-for="teacher in teacherList"
                     :key="teacher.id"
                     :label="teacher.name"
                     :value="teacher.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>
      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload"
                   :action="BASE_API+'oss/picture/upload'"
                   class="avatar-uploader">
          <img :src="courseInfo.cover"></el-upload>
      </el-form-item>


      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/>
        元
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="addAndUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import course from '@/api/edu/course'
  import teacher from '@/api/edu/teacher'
  import subject from '@/api/edu/subject'
  import Tinymce from '@/components/Tinymce'

  export default {
    name: 'info',
    components: { Tinymce },
    data() {
      return {
        saveBtnDisabled: false, // 保存按钮是否禁用
        courseInfo: {
          title: '',
          subjectParentId: '',
          subjectId: '',
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1697850329,1416483110&fm=26&gp=0.jpg',
          price: 0
        },
        teacherList: [],
        oneSubjectList: [],
        twoSubjectList: [],
        BASE_API: process.env.BASE_API, // 接口API地址
        courseId: ''
      }
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        alert(1)
        this.courseId = this.$route.params.id
        //查询
        this.getCourseInfo()
      } else {
        this.courseInfo = {
          title: '',
          subjectParentId: '',
          subjectId: '',
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1697850329,1416483110&fm=26&gp=0.jpg',
          price: 0
        }
        // 讲师列表
        this.queryTeacherList()
        // 一级分类
        this.getOneSubjectList()
      }

    },
    methods: {
      getCourseInfo() {
        course.getCourseInfoById(this.courseId).then(
          response => {
            this.courseInfo = response.data.courseInfo
            // 获取所有的一级分类和二级分类
            subject.getQuerySubjectList().then(
              response => {
                //获取所有的一级分类
                this.oneSubjectList = response.data.list

                // 循环一级分类
                for (let i = 0; i < this.oneSubjectList.length; i++) {
                  // 获取课程信息
                  let subject = this.oneSubjectList[i]
                  if (this.courseInfo.subjectParentId === subject.id) {
                    // 获取二级分类 赋值
                    this.twoSubjectList = subject.children
                  }
                }
                // 讲师列表
                this.queryTeacherList()
              }
            )

          }
        )
      },
      handleAvatarSuccess(response, file) {
        this.courseInfo.cover = response.data.url
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 21011
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        // return isJPG && isLt2M
        return isLt2M
      },
      getTwoSubjectList(value) {
        // 遍历一级分类
        for (let i = 0; i < this.oneSubjectList.length; i++) {
          let subject = this.oneSubjectList[i]
          if (value === subject.id) {
            //赋值给二级分类
            this.twoSubjectList = subject.children
            console.log(this.twoSubjectList)
            this.courseInfo.subjectId = ''
          }
        }
      },
      getOneSubjectList() {
        subject.getQuerySubjectList().then(
          response => {
            this.oneSubjectList = response.data.list
          }
        )
      },
      queryTeacherList() {
        teacher.queryTeacherList().then(
          response => {
            this.teacherList = response.data.list
          }
        )
      },
      addAndUpdate() {
        course.addCourseInfo(this.courseInfo).then(
          response => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '课程编辑完成,请下一步'
            })
            this.$router.push({ path: '/course/chapter/' + response.data.courseId })
          }
        )

      }
    }
  }
</script>

<style scoped>

</style>
