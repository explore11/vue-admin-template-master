<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="日期">
        <el-date-picker v-model="day" type="date" placeholder="选择要统计的日期" value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-button :disabled="btnDisabled" type="primary" @click="createData">生成</el-button>
    </el-form>
  </div>
</template>

<script>
  import sta from '@/api/sta'

  export default {
    name: 'create',
    data() {
      return {
        day: null,
        btnDisabled: false
      }
    },
    created() {
    },
    methods: {
      createData() {
        sta.getStaData(this.day).then(
          response => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '生成完毕'
            })
            // 路由跳转
            this.$router.push({ path: '/sta/show' })
          })
      }
    }
  }
</script>

<style scoped>

</style>
