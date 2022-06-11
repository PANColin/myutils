// 验证码身份证号
export function IsCardChange(str) {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(str)
}
// 手机号验证
export function phoneFun(phones) {
  var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
  if (!myreg.test(phones)) {
    return false
  } else {
    return true
  }
}
// 检测房间格式
export function roomDetection(row) {
  const detection = row.split('-')
  if (detection.length === 3) {
    return true
  } else {
    return false
  }
}
// 检测填写是否错误
export function validationChange(row) {
  if (!row['group_name']) {
    return 'false'
  }
  if (!row['room_number']) {
    return 'false'
  }
  if (!roomDetection(row['room_number'])) {
    return 'false'
  }
  if (!row['name']) {
    return 'false'
  }
  if (!row['mobile']) {
    return 'false'
  }
  if (!row['id_card']) {
    return 'false'
  }
  if (!row['area']) {
    return 'false'
  }
  if (!IsCardChange(row['id_card'])) {
    return 'false'
  }
  if (!phoneFun(row['mobile'])) {
    return 'false'
  }
}
