// 验证码身份证号
export function IsCardChange(str) {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(str)
}
// 手机号验证
export function phoneFun(phones) {
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
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
// 手机号验证/隔开
export function phoneValidation(phone) {
  const str = phone + ''
  var reg = str.indexOf('/') !== -1
  if (reg) {
    const strSplit = str.split('/')
    // console.log(strSplit)
    const checkStr = strSplit.every((item) => {
      return checkTel(item)
    })
    return checkStr
  } else {
    if (checkTel(phone)) {
      return true
    } else {
      return false
    }
  }
}
// 手姓名验证/隔开
export function nameValidation(name) {
  const str = name + ''
  var reg = str.indexOf('/') !== -1
  if (reg) {
    const strSplit = str.split('/')
    const checkStr = strSplit.every((item) => {
      return checkName(item)
    })
    return checkStr
  } else {
    if (checkName(name)) {
      return true
    } else {
      return false
    }
  }
}
// 检测填写是否错误
export function validationChange(data, row) {
  if (!row['group_name']) {
    return 'false'
  }
  if (!roomDetection(row['room_number'])) {
    return 'false'
  }
  if (!row['room_number']) {
    return 'false'
  }
  if (!ckeckGroupAndRoom(data, row)) {
    return 'false'
  }
  if (!nameValidation(row['name'])) {
    return 'false'
  }
  if (!row['mobile']) {
    return 'false'
  }
  if (!phoneValidation(row['mobile'])) {
    return 'false'
  }
  if (!row['area']) {
    console.log(row['area'])
    return 'false'
  }
  if (!isNumber(row['area'])) {
    return 'false'
  } else {
    if (Number(row['area']) === 0) {
      return 'false'
    } else {
      return 'true'
    }
  }
}

export function nameLengthChange(row) {
  if (!nameValidationSlash(row['name'])) {
    return 'false'
  }
}

// export function checkTel(tel) {
//   if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {
//     return false
//   } else {
//     return true
//   }
// }
export function checkTel(tel) {
  var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
  var isMob = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  // var isPhoneWide = /\d{7,8}/
  if (isMob.test(tel) || isPhone.test(tel)) {
    return true
  } else {
    return false
  }
}

export function checkName(name) {
  if (name) {
    return true
  } else {
    return false
  }
}

// 检测 在组团相同时，房号绝对不允许重复，重复要变红，组团不同时，允许重复
export function ckeckGroupAndRoom(data, row) {
  // console.log(data, '变红')
  if (data.length > 0) {
    const newarr = data.find((i) => {
      if (
        i.group_name === row.group_name &&
        i.room_number === row.room_number
      ) {
        return i
      }
    })
    if (newarr) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}

export function ckGroupAndRoom(data, filterObj, type) {
  var cffwxmsAry = []
  for (var i = 0; i < data.length; i++) {
    const item = data[i][type === 0 ? 'group_name' : '组团'] + data[i][type === 0 ? 'room_number' : '房间']
    if (filterObj[item]) {
      filterObj[item].push(i)
    } else {
      filterObj[item] = [i]
    }
  }
  Object.keys(filterObj).map(key => {
    if (filterObj[key].length > 1) {
      filterObj[key].map(m => {
        cffwxmsAry.push(data[m])
      })
    }
  })
  return cffwxmsAry
}

// 判断是否是数字
export function isNumber(val) {
  const str = Number(val)
  return typeof str === 'number' && !isNaN(str)
}

export function nameValidationSlash(name) {
  const str = name + ''
  var reg = (str).indexOf('/') !== -1
  if (reg) {
    const strSplit = str.split('/')
    const checkStr = strSplit.every((item) => {
      return !((item.length > 3))
    })
    return !!checkStr
  } else {
    if (name.length > 3) {
      return false
    } else {
      return true
    }
  }
}
