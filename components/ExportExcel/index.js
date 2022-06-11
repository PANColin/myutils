/**
 * 注意（tHeader和filterVal必须统一）
 * @param {list} 两种情况第一种通过filterType判断是否是源数据还是过滤之后的数据 Array
 * @param {filename} Excel 文件名  String
 * @param {tHeader} Excel 表头 Array
 * @param {filterVal} Excel 数据对应字段 Array
 * @param {filterType} Excel 判断是否是源数据还是过滤之后的数据（true源数据，false过滤之后数据），Boolean
 * @param {type} 类型（带图片传image，不带则不传） String
 * @return 导出成功loding为true {loding}
 */

export function exportExcel(list, filename, tHeader, filterVal, filterType, type) {
  if (type === 'image') {
    console.log('带图片')
  } else {
    console.log('不带图片')
    import('@/components/vendor/Export2Excel').then(excel => {
      excel.export_json_to_excel({
        header: tHeader,
        data: filterType ? list : formatJson(filterVal, list),
        filename,
        autoWidth: true
      })
    })
  }
}

function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => {
    return v[j]
  }))
}

// 如果需要过滤字段给字段做配置使用下面的方法在页面中传入最后合并成的数组

/**
 * @param {filterVal} key值 Array
 * @param {jsonData} 数据源 Array
 * @param {v} 当前对象 Array
 * @param {j} 对应的参数 Array
 * @param {v['j']} 通过匹配获得的参数值
 * 下面是例子具体写法：
 */

// formatJson(filterVal, jsonData) {
//     return jsonData.map(v => filterVal.map(j => {
//         if (j === 'address') {
//             return v['province_name'] + v['city_name'] + v['area_name'] + v['street_name']
//         } else {
//             return v[j]
//         }
//     }))
// }
