<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="queryCourse.title" clearable placeholder="课程名称" style="width: 150px"/>
      </el-form-item>
<!--      <el-form-item>-->
<!--        <el-select v-model="queryCourse.status" clearable placeholder="课程状态" style="width: 150px">-->
<!--          <el-option :value="Normal" label="已发布"/>-->
<!--          <el-option :value="Draft" label="未发布"/>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-button type="primary" icon="el-icon-search" @click="getCourseList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table :data="dataList"
              border fit
              highlight-current-row row-class-name="myClassList">
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope"> {{ (currentPage - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="课程信息" width="470" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="pic">
              <img :src="scope.row.cover" alt="scope.row.title" width="150px">
            </div>
            <div class="title">
              <a href="">{{ scope.row.title }}</a>
              <p>{{ scope.row.lessonNum }}课时</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate.substr(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column prop="gmtModified" label="发布时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtModified.substr(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="100" align="center">
        <template slot-scope="scope">
          {{ Number(scope.row.price) === 0 ? '免费' : '¥' + scope.row.price.toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column prop="buyCount" label="付费学员" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.buyCount }}人
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="text" size="mini" icon="el-icon-edit">编辑课程信息</el-button>
          </router-link>
          <router-link :to="'/course/chapter/'+scope.row.id">
            <el-button type="text" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 分页 -->
    <el-pagination :current-page="currentPage"
                   :page-size="limit"
                   :total="totals"
                   style="padding: 30px 0; text-align: center;"
                   layout="total, prev, pager, next, jumper"
                   @current-change="getCourseList"/>

  </div>
</template>

<script>
  import course from '@/api/edu/course'

  export default {
    name: 'list',

    data() {
      return {
        dataList: null,  // 返回数据
        currentPage: 1, // 当前页
        totals: 0,    // 总记录数
        limit: 3,   // 每页显示个数
        queryCourse: {// 查询对象
          status: '',
          title: ''
        }
      }
    },
    created() {
      this.getCourseList()
    },
    methods: {
      //获取讲师列表
      getCourseList(currentPage = 1) {
        this.currentPage = currentPage
        course.multiQueryEduCoursePage(this.currentPage, this.limit, this.queryCourse).then(
          response => {
            this.dataList = response.data.list
            this.totals = response.data.totals
          }
        )
      },
      // 清空
      resetData() {
        this.queryCourse = {}
        this.getCourseList()
      },
      //删除
      removeDataById(id) {
        this.$confirm('此操作将永久删除该课程信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用删除方法
          course.deleteCourseById(id).then(
            response => {
              // 提示信息
              this.$message({
                type: 'success',
                message: '课程删除成功!'
              })
              // 刷新页面
              this.getCourseList()
            }
          )

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }

  }
</script>

<style scoped>
  .myClassList .info {
    width: 450px;
    overflow: hidden;

  }

  .myClassList .info .pic {
    width: 150px;
    height: 90px;
    overflow: hidden;
    float: left;

  }

  .myClassList .info .pic a {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

  }

  .myClassList .info .pic img {
    display: block;
    width: 100%;

  }

  .myClassList td .info .title {
    width: 280px;
    float: right;
    height: 90px;

  }

  .myClassList td .info .title a {
    display: block;
    height: 48px;
    line-height: 24px;
    overflow: hidden;
    color: #00baf2;
    margin-bottom: 12px;

  }

  .myClassList td .info .title p {
    line-height: 20px;
    margin-top: 5px;
    color: #818181;

  }

</style>
