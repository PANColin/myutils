import xlsxUtils from './xlsx.utils'// ....
export const downloadExl = (data, keyMap, parame, subjecName) => {
  console.log('XLSX', data)
  console.log('XLSX', keyMap)
  data.push({
    option_title: parame.note,
    endorse: '',
    against: '',
    waiver: '',
    multitude: '',
    oChoose: '',
    invalid: '',
    deliveredNotSelected: '',
    agree_count: '',
    agree_count_proportion: '',
    agree_area: '',
    agree_area_proportion: '',
    results: '',
    text: ''
  })
  data.push({
    option_title: '',
    endorse: '',
    against: '',
    waiver: '',
    multitude: '',
    oChoose: '',
    invalid: '',
    deliveredNotSelected: '',
    agree_count: '',
    agree_count_proportion: '',
    agree_area: '',
    agree_area_proportion: '',
    results: ''
  })
  data.push({
    option_title: '',
    endorse: '',
    against: '',
    waiver: '',
    multitude: '',
    oChoose: '',
    invalid: '',
    deliveredNotSelected: '',
    agree_count: '',
    agree_count_proportion: '',
    agree_area: '',
    agree_area_proportion: '',
    results: ''
  })
  data.push({
    option_title: '',
    endorse: '',
    against: '',
    waiver: '',
    multitude: '',
    oChoose: '',
    invalid: '',
    deliveredNotSelected: '',
    agree_count: '',
    agree_count_proportion: '',
    agree_area: '',
    agree_area_proportion: '',
    results: ''
  })
  var head = {
    'A1': { 'v': parame.title.estate_name + '小区业主大会会议（' + subjecName + '）表决意向统计表' },
    'B1': { 'v': '' },
    'C1': { 'v': '' },
    'D1': { 'v': '' },
    'E1': { 'v': '' },
    'F1': { 'v': '' },
    'G1': { 'v': '' },
    'H1': { 'v': '' },
    'I1': { 'v': '' },
    'J1': { 'v': '' },
    'K1': { 'v': '' },
    'L1': { 'v': '' },
    'M1': { 'v': '' },
    'A2': { 'v': '表决事项' },
    'B2': { 'v': '参与表决数' + ' ：' + parame.joinCount },
    'C2': { 'v': '' },
    'D2': { 'v': '' },
    'E2': { 'v': '' },
    'F2': { 'v': '' },
    'G2': { 'v': '' },
    'H2': { 'v': '' },
    'I2': { 'v': '赞同票统计' },
    'J2': { 'v': '' },
    'K2': { 'v': '' },
    'L2': { 'v': '' },
    'M2': { 'v': '表决结果' },
    'A3': { 'v': '' },
    'B3': { 'v': '' },
    'C3': { 'v': '' },
    'D3': { 'v': '' },
    'E3': { 'v': '' },
    'F3': { 'v': '' },
    'G3': { 'v': '' },
    'H3': { 'v': '' },
    'I3': { 'v': '人数' },
    'J3': { 'v': '' },
    'K3': { 'v': '面积' },
    'L3': { 'v': '' },
    'M3': { 'v': '' },
    'A4': { 'v': '' },
    'B4': { 'v': '赞同' },
    'C4': { 'v': '反对' },
    'D4': { 'v': '弃权' },
    'E4': { 'v': '随多数' },
    'F4': { 'v': '未选' },
    'G4': { 'v': '已作废' },
    'H4': { 'v': '已发放未回收' },
    'I4': { 'v': '投票权人数' },
    'J4': { 'v': '占参与表决人数比例' },
    'K4': { 'v': '占有部分面积' },
    'L4': { 'v': '占参与表决面积比例' },
    'M4': { 'v': '' }
  }
  // border样式
  const border = { bottom: { style: 'thin', color: { rgb: '000000' }}, top: { style: 'thin', color: { rgb: '000000' }},
    left: { style: 'thin', color: { rgb: '000000' }}, right: { style: 'thin', color: { rgb: '000000' }}}
  Object.keys(head).forEach(key => {
    head[key].s = {
      font: { sz: 16, bold: true, color: { rgb: '000000' }},
      alignment: { horizontal: 'center', wrapText: true, vertical: 'center' },
      fill: {
        bgColor: { indexed: 64 }
      },
      border: border
    }
  })
  // 标题特殊样式
  head['A1'].s = {
    font: { sz: 24, bold: true, color: { rgb: '000000' }},
    alignment: { horizontal: 'center', wrapText: true, vertical: 'center' },
    fill: {
      bgColor: { indexed: 64 }
    },
    border: border
  }
  // 行宽
  head['!cols'] = [// 设置列宽度
    { wpx: 180 }, // 表决事项
    { wpx: 100 }, // 赞同
    { wpx: 100 }, // 反对
    { wpx: 100 }, // 弃权
    { wpx: 100 }, // 随多数
    { wpx: 100 }, // 无效
    { wpx: 100 }, // 未选
    { wpx: 100 }, // 已发放未回
    { wpx: 100 }, // 投票权人数
    { wpx: 100 }, // 占参与表决人数比例
    { wpx: 100 }, // 专有部分面积
    { wpx: 100 }, // 占参与表决面积比例
    { wpx: 100 } // 表决结果
  ]
  // 行高度
  head['!rows'] = [// 设置行高度
    { hpt: 200 }, // 表决事项
    { hpt: 200 }, // 赞同
    { hpt: 200 }, // 反对
    { hpt: 200 }, // 弃权
    { hpt: 200 }, // 随多数
    { hpt: 200 }, // 无效
    { hpt: 200 }, // 未选
    { hpt: 200 }, // 已发放未回
    { hpt: 200 }, // 投票权人数
    { hpt: 200 }, // 占参与表决人数比例
    { hpt: 200 }, // 专有部分面积
    { hpt: 200 }, // 占参与表决面积比例
    { hpt: 200 } // 表决结果
  ]
  // 合并单元格
  head['!merges'] = [
    // 标题
    {
      's': { 'c': 0, 'r': 0 },
      'e': { 'c': 12, 'r': 0 }
    },
    // 表决事项
    {
      's': { 'c': 0, 'r': 1 },
      'e': { 'c': 0, 'r': 3 }
    },
    // 表决事项表决参与人数
    {
      's': { 'c': 1, 'r': 1 },
      'e': { 'c': 7, 'r': 2 }
    },
    // 表决事项表决参与人数赞同票统计
    {
      's': { 'c': 8, 'r': 1 },
      'e': { 'c': 11, 'r': 1 }
    },
    // 人数
    {
      's': { 'c': 8, 'r': 2 },
      'e': { 'c': 9, 'r': 2 }
    },
    // 面积
    {
      's': { 'c': 10, 'r': 2 },
      'e': { 'c': 11, 'r': 2 }
    },
    // 表决结果
    {
      's': { 'c': 12, 'r': 1 },
      'e': { 'c': 12, 'r': 3 }
    },
    // 底下的注释
    {
      's': { 'c': 0, 'r': ((data.length)) },
      'e': { 'c': 12, 'r': ((data.length) + 3) }
    }
  ]
  var datas = xlsxUtils.format2Sheet(data, 0, 4, keyMap)// 偏移3行按keyMap顺序转换
  var dataKeys = Object.keys(datas)
  console.log(datas)
  // 添加样式
  dataKeys.forEach(key => {
    datas[key].s = {
      font: { sz: 16, bold: true, color: { rgb: '000000' }},
      alignment: { horizontal: 'center', wrapText: true, vertical: 'center' },
      fill: {
        bgColor: { indexed: 64 }
      },
      border: border
    }
  })
  for (var k in head) datas[k] = head[k]// 追加列头
  var wb = xlsxUtils.format2WB(datas, undefined, undefined, 'A1:' + dataKeys[dataKeys.length - 1])
  console.log(wb)
  saveAs(xlsxUtils.format2Blob(wb), parame.title.estate_name + '小区业主大会会议（' + parame.title.activity_name + '）表决意见统计表' + '.xlsx')
}
function saveAs(obj, fileName) { // 当然可以自定义简单的下载文件实现方式
  var tmpa = document.createElement('a')
  tmpa.download = fileName || '下载'
  tmpa.href = URL.createObjectURL(obj) // 绑定a标签
  tmpa.click() // 模拟点击实现下载
  setTimeout(function() { // 延时释放
    URL.revokeObjectURL(obj) // 用URL.revokeObjectURL()来释放这个object URL
  }, 2000)
}
