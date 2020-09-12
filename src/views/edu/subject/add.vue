<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'/static/subject.xlsx'">点击下载模版</a>
        </el-tag>
      </el-form-item>
      <el-form-item label="选择Excel">
        <el-upload ref="upload"
                   :auto-upload="false"
                   :on-success="fileUploadSuccess"
                   :on-error="fileUploadError"
                   :disabled="importBtnDisabled"
                   :limit="1"
                   :action="BASE_API+'/eduService/eduSubject/addSubject'"
                   name="file"
                   accept=".xlsx,.xls">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button :loading="loading"
                     style="margin-left: 10px;"
                     size="small"
                     type="success"
                     @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'add',
    data() {
      return {
        BASE_API: process.env.BASE_API, // 接口API地址
        importBtnDisabled: false, // 按钮是否禁用,
        loading: false
      }
    },
    methods: {
      //提交文件
      submitUpload() {
        this.importBtnDisabled = true
        this.loading = true
        this.$refs.upload.submit()

      },
      // 成功回调
      fileUploadSuccess() {
        this.loading = false
        this.$message({
          type: 'success',
          message: '导入成功'
        })

        this.$refs.upload.clearFiles()
        // 路由跳转
        this.$router.push({ path: '/subject/list' })
      },
      // 失败回调
      fileUploadError() {
        this.loading = false
        this.$message({
          type: 'error',
          message: '导入失败'
        })
      }

    }
  }
</script>

<style scoped>

</style>
