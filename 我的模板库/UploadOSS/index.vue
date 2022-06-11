<template>
  <div>
    <el-upload
      ref="upload"
      :show-file-list="isShowFileList"
      action=""
      :file-list="fileList.length > 0 ? fileList : imgSrcList"
      :http-request="picUpload"
      :list-type="listType"
      :before-upload="beforeUpload"
      :multiple="isMultiple"
      :limit="limitNumber"
      :on-exceed="handleExceed"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <el-button
        v-if="listType == 'text'"
        size="small"
        type="primary"
      >点击上传</el-button>
      <div v-if="listType == 'picture-card' || listType == 'picture'">
        <!-- <img
          v-if="isImg && imgSrcStr"
          width="100%"
          height="100%"
          :src="imgSrcStr"
          alt="无效图片"
        > -->
        <!-- v-else -->
        <el-button
          icon="el-icon-plus"
          size="small"
          style="border:none"
          plain
        />
      </div>
      <div v-if="isImg" slot="tip" class="el-upload__tip">
        只能上传图片格式文件
        <span v-if="isMultiple">,文件不能超过{{ limitNumber }}个</span>
      </div>
      <div v-if="isRecord" slot="tip" class="el-upload__tip">
        只能上传录音格式文件
        <span v-if="isMultiple">文件不能超过{{ limitNumber }}个</span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from '@/utils/auth'
import { Uploads } from '@/utils/oss'
export default {
  name: 'UploadImg',
  props: {
    // 是否展示自带的图片列表
    isShowFileList: {
      type: Boolean,
      default: false
    },
    // 上传的url地址
    uploadUrl: {
      type: String,
      default: '/admin/upload/image'
    },
    // 上传样式类型
    listType: {
      type: String,
      default: 'text'
    },
    // 上传的名称
    isWho: {
      type: String,
      default: ''
    },
    // 是否是多选
    isMultiple: {
      type: Boolean,
      default: false
    },
    // 多选的个数
    limitNumber: {
      type: Number,
      default: 5
    },
    // 回调的图片路径
    imgSrcStr: {
      type: String,
      default: ''
    },
    // 多选图片回调的路径
    imgSrcList: {
      type: Array,
      default: () => []
    },
    // 是否是上传图片文件
    isImg: {
      type: Boolean,
      default: false
    },
    // 是否是上传录音文件
    isRecord: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // baseUrl: 'http://www.vote.com',
      fileList: [],
      imgSrc: '' // https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20210805143648153img.jpg
    }
  },
  computed: {
    // token() {
    //   return getToken()
    // }
  },
  mounted() {
    // console.log(this.imgSrcStr)
    if (this.imgSrcStr) {
      this.fileList.push({ url: this.imgSrcStr, uid: Date.now() })
    }
    if (this.imgSrcList.length > 0) {
      this.fileList = this.imgSrcList.map(el => {
        return { url: el, uid: Date.now() }
      })
    }
    // 如果是上传录音文件就把展示图片列表组件设置为false
    // if (this.isRecord) this.isShowFileList = false
  },
  methods: {
    async picUpload(file) {
      // 清空已上传的文件列表（该方法不支持在 before-upload 中调用）
      this.$refs.upload.clearFiles()
      let type = ''
      if (this.isMultiple) {
        type = 'multiple'
      }
      const imgUrl = await Uploads(file, type)
      if (this.isMultiple) {
        this.fileList.push(imgUrl)
        this.$emit('onUploadList', this.fileList)
      } else {
        console.log(imgUrl)
        // 清空已上传的文件列表（该方法不支持在 before-upload 中调用）
        this.$refs.upload.clearFiles()
        this.fileList.push(imgUrl)
        this.$emit('onUpload', imgUrl)
      }
      // 清除上传列表
      // console.log('图片上传', imgUrl, this.fileList)
    },
    // 上传类型判断
    beforeUpload(file) {
      // console.log(file);
      // 正则表达式
      if (this.isImg) {
        var reg = /image\/(jpeg|png|jpg)/g
        const isImg = reg.test(file.type)
        const isOver = file.size / 1024 / 1024 < 1.5
        if (!isImg) {
          this.$message.error('只能上传图片格式')
        }
        if (!isOver) {
          this.$message.error('上传头像图片大小不能超过1.5MB!')
        }
        return isImg && isOver
      } else if (this.isRecord) {
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const extension = testmsg === 'mp3' || testmsg === 'mpeg'
        if (!extension) {
          this.$message({
            message: '上传文件只能是mp3或者mpeg格式！',
            type: 'error'
          })
        }
        return extension
      }
    },
    // 超出限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limitNumber} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件,请重新选择`
      )
    },
    // 删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
    // // 删除图片
    // removeCoverImg(index) {
    //   // 只用执行本地删除
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '系统提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       })
    //       // 单选上传删除
    //       this.imgSrc = ''
    //       // 多选上传删除
    //       // console.log(index);
    //       if (this.isMultiple) {
    //         // console.log(index);
    //         this.picList.splice(index, 1)
    //         // console.log(this.picList);
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // }
  }
}
</script>

<style lang="scss" scoped></style>
