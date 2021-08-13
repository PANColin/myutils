<template>
  <div :class="isFlex ? 'wrapper-upload' : ''">
    <el-upload
      ref="uploadCoverImg"
      :list-type="listType"
      class="upload-demo"
      :headers="{ token }"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :multiple="isMultiple"
      :limit="limitNumber"
      :show-file-list="false"
      :action="baseUrl + uploadUrl"
      :on-change="changeUpload"
    >
      <el-button v-if="listType == 'text'" size="small" type="primary"
        >点击上传</el-button
      >
      <el-button
        icon="el-icon-plus"
        v-if="listType == 'picture-card' || listType == 'picture'"
        size="small"
        style="border:none"
        plain
      ></el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传图片格式文件，且不超过1.5M
        <span v-if="isMultiple">文件不能超过{{ limitNumber }}个</span>
      </div>
    </el-upload>
    <div v-if="isShowImg && !isMultiple" class="icon-wrapper">
      <img
        v-if="imgSrcStr || imgSrc"
        class="cover-img"
        :src="imgSrc || imgSrcStr"
        alt=""
      />
      <i
        v-if="imgSrc"
        slot="reference"
        class="el-icon-circle-close"
        @click="removeCoverImg"
      />
    </div>
    <div
      v-if="isShowImg && isMultiple"
      class="icon-wrapper"
      :class="isFlex ? 'wrapper-img' : ''"
    >
      <div
        v-for="(item, index) in picList.length > 0 ? picList : imgSrcList"
        :key="index"
        class="multImg"
      >
        <img class="cover-img" :src="item" alt="" />
        <i
          class="el-icon-circle-close"
          v-if="picList.length > 0"
          @click="removeCoverImg(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: "UploadImg",
  props: {
    isShowImg: {
      type: Boolean,
      default: false
    },
    uploadUrl: {
      type: String,
      default: "/lejuAdmin/material/uploadFileOss"
    },
    listType: {
      type: String,
      default: "text"
    },
    isWho: {
      type: String,
      default: ""
    },
    isFlex: {
      type: Boolean,
      default: true
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    limitNumber: {
      type: Number,
      default: 5
    },
    imgSrcStr: {
      type: String,
      default: ""
    },
    imgSrcList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {},
  data() {
    return {
      baseUrl: "https://leju.bufan.cloud",
      picList: [],
      imgSrc: "" //https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20210805143648153img.jpg
    };
  },
  computed: {
    token() {
      return getToken();
    }
  },
  methods: {
    // 上传改变的回调
    changeUpload(file, fileList) {
      // console.log(file, fileList, this.$refs.uploadCoverImg);
    },
    // 上传成功的回调
    handleSuccess(response, file, fileList) {
      const { success, data, message: errMsg } = response;
      if (success) {
        const { fileUrl } = data;
        this.picList.push(fileUrl);
        // console.log(this.picList);
        this.$message.success("上传成功!");
        // console.log(fileUrl);
        const params = { url: fileUrl, isWho: this.isWho };
        this.$emit("reciveImgSrc", params);
        this.imgSrc = fileUrl;
        // 如果是多选吧数组传过去
        if (this.isMultiple) {
          this.$emit("reciveImgSrcList", this.picList);
        }
        // 清除上传列表
        // this.$refs.uploadCoverImg.clearFiles();
      } else {
        this.$message.error(errMsg);
      }
    },
    // 上传类型判断
    beforeUpload(file) {
      // console.log(file);
      // 正则表达式
      var reg = /image\/(jpeg|png|jpg)/g;
      const isImg = reg.test(file.type);
      const isOver = file.size / 1024 / 1024 < 1.5;
      if (!isImg) {
        this.$message.error("只能上传图片格式");
      }
      if (!isOver) {
        this.$message.error("上传头像图片大小不能超过1.5MB!");
      }
      return isImg && isOver;
    },
    // 删除图片
    removeCoverImg(index) {
      // 只用执行本地删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          // 单选上传删除
          this.imgSrc = "";
          // 多选上传删除
          // console.log(index);
          if (this.isMultiple) {
            // console.log(index);
            this.picList.splice(index, 1);
            // console.log(this.picList);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
// 单选的图片样式
.icon-wrapper {
  width: fit-content;
  height: fit-content;
  position: relative;
  .cover-img {
    width: 200px;
  }
  i {
    cursor: pointer;
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 33px;
    color: #f00;
  }
}
.changeStyle {
  display: flex;
  align-items: center;
}
.wrapper-upload {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 3;
  // 多选的图片样式
  .wrapper-img {
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    .multImg {
      position: relative;
      img {
        width: 80px;
        height: 80px;
        margin: 10px;
      }
      i {
        cursor: pointer;
        position: absolute;
        top: -8px;
        // right: -8px;
        z-index: 999;
        font-size: 23px;
        color: #f00;
      }
    }
  }
}
.el-upload__tip {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
