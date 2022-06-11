import JSZip from 'jszip'
import FileSaver from 'file-saver'

export async function fileDownLoad(fileList, fileName, type) {
  console.log('判断文件类型1', fileList)
  const file = await fileList.map(async item => {
    const arr = []
    const fileIndex = item.fileName.lastIndexOf(',') + 1
    arr.push({
      fileName: item.fileName.slice(fileIndex),
      files: await Promise.all(item.files.map(async ite => {
        return await getFilesBlobUrl(ite).then(res => {
          const index = ite.lastIndexOf('/') + 1
          return {
            fileName: item.fileName + ',' + ite.slice(index),
            file: type === 'image' ? res.replace(/^data:image\/(png|jpg|jpeg);base64,/, '') : res.replace(/^data:audio\/(mpeg|mp3);base64,/, '')
          }
        })
      }))
    })
    return arr
  })
  const zipFile = (await Promise.all(file)).flat(Infinity)
  console.log('zipImage', zipFile)
  const zip = new JSZip()
  zipFile.map(item => {
    item.files.map(i => {
      // console.log(i.file)
      if (validDataUrl(i.file)) {
        zip.folder(item.fileName).file(`${i.fileName}`, i.file, { base64: true, inary: true, blob: true })
      }

    })
  })
  zip.generateAsync({ type: 'blob' })
    .then(function (content) {
      FileSaver.saveAs(content, `${fileName}.zip`)
    })
}

function getFilesBlobUrl(file) {
  return new Promise((reslove, reject) => {
    loadImageToBlob(file, function (blobFile) { // 这里的img.src改地址
      if (!blobFile) return false
      // 生成二进制流
      try {
        var fileReader = new FileReader()
        fileReader.readAsDataURL(blobFile)
        fileReader.onload = function () {
          // console.log(this.result)// 这里输出的数据放到url里能生成图片，或者post回后台生成mp3，二进制流
          reslove(this.result)
        }
      } catch (e) {
        return false
      }
    })
  })
}

var loadImageToBlob = function (url, callback) {
  if (!url || !callback) return false
  try {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      // 注意这里的this.response 是一个blob对象 就是文件对象
      callback(this.status === 200 ? this.response : false)
    }
    xhr.send()
    return true
  } catch (e) {
    return false
  }
}

var validDataUrl = function (str) {
  if (str === '' || str.trim() === '') {
    return false
  }
  try {
    return btoa(atob(str)) == str
  } catch (err) {
    return false
  }

}
