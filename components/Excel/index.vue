<template>
  <span style="margin-left: 10px">
    <input
      class="input-file"
      type="file"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      @change="exportData"
    />
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-upload"
      @click="btnClick"
      >导入数据</el-button
    >
  </span>
</template>

<script>
import XLSX from "xlsx";
import {
  nameValidation,
  phoneValidation,
  isNumber,
  ckGroupAndRoom,
  nameValidationSlash,
} from "@/utils/verification.js";
export default {
  data() {
    return {};
  },
  methods: {
    btnClick() {
      console.log("点击了");
      document.querySelector(".input-file").click();
    },
    exportData(event) {
      console.log(event);
      if (!event.currentTarget.files.length) {
        return;
      }
      const that = this;
      // 拿取文件对象
      var f = event.currentTarget.files[0];
      // 用FileReader来读取
      var reader = new FileReader();
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var wb; // 读取完成的数据
        var outdata; // 你需要的数据
        var dataList = []; // 你需要的数据
        var reader = new FileReader();
        reader.onload = function (e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          // 接下来就是xlsx了，具体可看api
          wb = XLSX.read(binary, {
            type: "binary",
          });
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          const outdataList = [...outdata];
          const filterObj = {};
          const filter = ckGroupAndRoom(outdataList, filterObj);
          console.log(outdataList.length);
          console.log(filter, "filter");
          outdataList.map((item, index) => {
            dataList.push({
              group_name: item["组团"] || "",
              room_number: item["房间"] || "",
              name: that.toTrim(item) || "",
              mobile: item["手机号"] || "",
              id_card: item["身份证"] || "",
              area: item["面积（㎡）"] || "",
              nameLength:
                that.nameLengthChange(item) !== "false" ? "true" : "false",
              validation:
                that.validationChange(filter, item) !== "false"
                  ? "true"
                  : "false",
            });
          });
          // 自定义方法向父组件传递数据

          event.srcElement.value = "";
          that.$emit("getResult", dataList);
        };
        reader.readAsArrayBuffer(f);
      };
      reader.readAsBinaryString(f);
    },
    validationChange(data, row) {
      if (!row["组团"]) {
        return "false";
      }
      if (!row["房间"]) {
        return "false";
      }
      if (!this.roomDetection(row["房间"])) {
        return "false";
      }
      if (!this.ckeckGroupName(data, row)) {
        return "false";
      }
      if (!row["姓名"]) {
        return "false";
      }
      if (!nameValidation(row["姓名"])) {
        return "false";
      }
      if (!phoneValidation(row["手机号"])) {
        return "false";
      }
      if (!row["面积（㎡）"]) {
        return "false";
      }
      if (!isNumber(row["面积（㎡）"])) {
        return "false";
      }
    },
    nameLengthChange(row) {
      if (!nameValidationSlash(row["姓名"])) {
        return "false";
      }
    },
    // 检测房间格式
    roomDetection(row) {
      const detection = row.split("-");
      if (detection.length === 3) {
        return true;
      } else {
        return false;
      }
    },
    // 去除空格
    toTrim(row) {
      return row["姓名"].replace(/\s*/g, "");
    },
    // ckGroupAndRoom(data) {
    //   var cffwxmsAry = []
    //   for (var i = 0; i < data.length - 1; i++) {
    //     for (var j = i + 1; j < data.length; j++) {
    //       if (data[i]['组团'] === data[j]['组团']) {
    //         if (data[i]['房间'] === data[j]['房间']) {
    //           cffwxmsAry.push(data[j])
    //         }
    //       }
    //     }
    //   }
    //   return cffwxmsAry
    // },
    // 检测 在组团相同时，房号绝对不允许重复，重复要变红，组团不同时，允许重复
    ckeckGroupName(data, row) {
      // 判断有没有重复
      if (data.length > 0) {
        const newarr = data.find((i) => {
          if (i["组团"] === row["组团"] && i["房间"] === row["房间"]) {
            return i;
          }
        });
        if (newarr) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
  },
};
</script>

<style>
.input-file {
  display: none;
}
</style>
