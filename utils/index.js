/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @file {String} oss的文件夹
 * @image {String} 图片名
 */
export function imageUrl(image) {
  return 'http://img.rbdfb.com/static/mp/ticket/web' + '/' + image
}

export const noPassByName = (name) => {
  var newStr
  if (name.length === 2) {
    newStr = name.substr(0, 1) + '*'
  } else if (name.length > 2) {
    var char = ''
    for (var i = 0, len = name.length - 2; i < len; i++) {
      char += '*'
    }
    newStr = name.substr(0, 1) + char + name.substr(-1, 1)
  } else {
    newStr = name
  }
  return newStr
}

export const getNowTime = () => {
  let dateTime = ''
  const yy = new Date().getFullYear()
  const mm = new Date().getMonth() + 1
  const dd = new Date().getDate()
  dateTime = yy + '-' + mm + '-' + dd
  return dateTime
}

function objSort(obj) {
  const newObj = {}
  // 遍历对象，并将key进行排序
  Object.keys(obj).sort().map(key => {
    newObj[key] = obj[key]
  })
  // 将排序好的数组转成字符串
  return JSON.stringify(newObj)
}

export const unique = (arr) => {
  const set = new Set()
  for (let i = 0; i < arr.length; i++) {
    const str = objSort(arr[i])
    set.add(str)
  }
  // 将数组中的字符串转回对象
  arr = [...set].map(item => {
    return JSON.parse(item)
  })
  return arr
}

/**
 * 数组去重
 * @uniId {String} 键名
 */
export function uniqueFunc(arr, uniId) {
  const res = new Map()
  if (uniId) {
    return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1))
  } else {
    return arr.filter((item) => !res.has(item) && res.set(item, 1))
  }
}
