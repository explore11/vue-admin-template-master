<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--            数据类型一定要和取出的json中的一致，否则没法回填
           因此，这里value使用动态绑定的值，保证其数据类型是number15          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"></pan-thumb>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>

        <!-- v-show：是否显示上传组件:
        key:类似于id，如果一个页面多个图片上传控件，可以做区分
        url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper v-show="imagecropperShow"
                       :width="300"
                       :height="300"
                       :key="imagecropperKey"
                       :url="BASE_API+'/oss/picture/upload'"
                       field="file"
                       @close="close"
                       @crop-upload-success="cropSuccess"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import teacher from '@/api/edu/teacher'
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    name: 'add',
    components: { ImageCropper, PanThumb },
    data() {
      return {
        BASE_API: process.env.BASE_API,
        imagecropperKey: 0,  // 图片的唯一标识
        imagecropperShow: false, // 图片弹框是否显示
        saveBtnDisabled: false,   // 保存按钮是否禁用
        teacher: {
          name: '',
          sort: 0,
          level: 1,
          career: '',
          intro: '',
          avatar: ''
        }
      }
    },
    created() {
      this.init()
    },
    watch: {
      $route(to, from) {  // 监听路由变化 ，路由发生变化就会执行此方法
        this.init()
      }
    },
    methods: {
      close() {  //关闭上传组件
        this.imagecropperShow = false
        // key发生变化 解决重新上传图片问题
        this.imagecropperKey = this.imagecropperKey + 1
      },
      cropSuccess(data) { // 上传成功后的回调
        console.log(data)
        this.teacher.avatar = data.url
        //关闭上传组件
        this.imagecropperShow = false
        this.imagecropperKey = this.imagecropperKey + 1
      },
      init() {
        // 有id  说明是  更新  需要有回显
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.getTeacher(id)
        } else {
          // 没有有id  说明是  保存  不需要有回显
          this.teacher = {
            name: '',
            sort: 0,
            level: 1,
            career: '',
            intro: '',
            avatar: ''
          }
        }
      },
      getTeacher(id) {
        teacher.queryEduTeacher(id).then(
          response => {
            this.teacher = response.data.eduTeacher
          }
        )
      },
      updateTeacher() {
        teacher.updateEduTeacher(this.teacher).then(
          response => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            // 路由跳转
            this.$router.push({ path: '/teacher/list' })
          }
        )
      },
      saveOrUpdate() {
        //判断是更新还是添加
        if (!this.teacher.id) {
          this.saveTeacher()
        } else {
          this.updateTeacher()
        }
        // 防连点
        this.saveBtnDisabled = true
      },
      saveTeacher() {
        teacher.addEduTeacher(this.teacher).then(
          response => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            // 路由跳转
            this.$router.push({ path: '/teacher/list' })
          }
        )
      }
    }

  }
</script>

<style scoped>

</style>
