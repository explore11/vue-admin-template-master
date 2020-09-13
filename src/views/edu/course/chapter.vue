<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-button type="text" @click="isShowVisible">添加章节</el-button>

    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text">添加课时</el-button>
            <el-button style="" type="text" @click="getChapter(chapter.id)">编辑</el-button>
            <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>


    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
  import chapter from '@/api/edu/chapter'
  import teacher from '@/api/edu/teacher'

  export default {
    name: 'chapter',
    data() {
      return {
        saveBtnDisabled: false, // 保存按钮是否禁用
        chapterVideoList: [],
        courseId: '',
        dialogChapterFormVisible: false, //是否显示章节表单
        chapter: {  // 章节对象
          title: '',
          sort: 0
        }
      }
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        this.getChapterVideo()
      }
    },
    methods: {

      removeChapter(chapterId) {
        this.$confirm('此操作将永久删除该章节信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用删除方法
          chapter.deleteChapterInfo(chapterId).then(
            response => {
              // 提示信息
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 刷新页面
              this.getChapterVideo()
            }
          )

        })

      },
      isShowVisible() {
        //开启弹框
        this.dialogChapterFormVisible = true
        // 清空弹框
        this.chapter = {}
      },
      getChapter(chapterId) {
        this.dialogChapterFormVisible = true
        chapter.getChapterInfo(chapterId).then(
          response => {
            this.chapter = response.data.chapter
          }
        )
      },
      addChapter() {
        this.chapter.courseId = this.courseId
        chapter.addChapterInfo(this.chapter).then(
          response => {
            // 关闭弹窗
            this.dialogChapterFormVisible = false
            // 提示信息
            this.$message({
              type: 'success',
              message: '添加章节成功'
            })
            // 刷新页面
            this.getChapterVideo()
          }
        )
      },
      updateChapter() {
        chapter.updateChapterInfo(this.chapter).then(
          response => {
            // 关闭弹窗
            this.dialogChapterFormVisible = false
            // 提示信息
            this.$message({
              type: 'success',
              message: '更新章节成功'
            })
            // 刷新页面
            this.getChapterVideo()
          }
        )
      },
      saveOrUpdate() {
        if (!this.chapter.id) {
          this.addChapter()
        } else {
          this.updateChapter()
        }
      },

      getChapterVideo() {
        chapter.getAllChapterVideo(this.courseId).then(
          response => {
            console.log(response)
            this.chapterVideoList = response.data.list
          }
        )
      },
      previous() {
        this.$router.push({ path: '/course/info/' + this.courseId })
      },
      next() {
        this.$router.push({ path: '/course/publish/1' + this.courseId })
      }
    }
  }
</script>

<style scoped>
  .chanpterList {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;

  }

  .chanpterList li {
    position: relative;

  }

  .chanpterList p {
    float: left;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
  }

  .chanpterList .acts {
    float: right;
    font-size: 14px;
  }

  .videoList {
    padding-left: 50px;
  }

  .videoList p {
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
  }
</style>
