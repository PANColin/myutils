import axios from 'axios'
import { uploadImage } from '@/api/upload/index'
export const Uploads = (file, type) => {
  // 采取后端签名方式，获取的签名保存到cookies中，可以保证阿里云的安全性，账号不可见
  const pro = new Promise((resolve, rej) => {
    uploadImage().then(res => {
      resolve(res.data)
    })
  })
  return pro.then(success => {
    const suffix = '.' + file.file.type.split('/')[1]
    // success就是请求的签名，里面的内容经过加密了
    var data = success
    // 图片通过表单方式上传，所以要声明一个表单对象
    var ossData = new FormData()
    // 时间为了创建不同的层级目录，时间戳为了保证上传同一张图片不会被覆盖
    ossData.append('name', data.filename + suffix)
    // key就代表文件层级和阿里云上的文件名
    ossData.append('key', data.dir + data.filename + suffix)
    ossData.append('policy', data.policy)
    ossData.append('OSSAccessKeyId', data.access_id)
    ossData.append('success_action_status', 201)
    ossData.append('signature', data.signature)
    ossData.append('file', file.file, data.filename + suffix)
    return axios
      .post(data.host, ossData, {
        headers: { 'Content-Type': 'multipart/form-data; boundary={boundary}' }
      })
      .then(res => {
        if (type === 'multiple') {
          // console.log(res, 'res')
          const data = {
            name: file.file.name,
            uid: Date().now,
            status: 'success',
            url: 'https://img.rbdfb.com' + '/' + ossData.get('key')
          }
          // console.log('multiple', data)
          return data
        } else {
          const data = {
            name: file.file.name,
            url: 'https://img.rbdfb.com' + '/' + ossData.get('key')
          }
          // console.log(file, ossData, data.filename)
          // console.log(data)
          return data
        }
      })
      .catch(error => {
        console.log(error, '错误')
      })
  })
}
