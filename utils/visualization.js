export const formatter = (val, num) => {
  var strs = val.split('') // 字符串数组
  var str = ''
  for (var i = 0, s; s = strs[i++];) { // 遍历字符串数组
    str += s
    if (!(i % num)) str += '\n' // 按需要求余
  }
  return str
}
