// import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }
const TOKEN_NAME = 'admin-token'
const USER_INFO_NAME = 'admin-userInfo'
// 注意!!! localStorage 只能存储字符串
// 存token
export function setToken(token) {
  console.log('token', token)
  window.localStorage.setItem(TOKEN_NAME, token)
}
// 存userInfo
export function setUserInfo(userInfo) {
  window.localStorage.setItem(USER_INFO_NAME, JSON.stringify(userInfo))
}
// 获取token
export function getToken() {
  return window.localStorage.getItem(TOKEN_NAME)
}
// 获取user_info
export function getUserInfo() {
  return JSON.parse(window.localStorage.getItem(USER_INFO_NAME))
}

// 删除token
export function removeToken() {
  return window.localStorage.removeItem(TOKEN_NAME)
}
// 删除用户
export function removeUserInfo() {
  return window.localStorage.removeItem(USER_INFO_NAME)
}
// 全部删除
export function clearAll() {
  removeToken()
  removeUserInfo()
  window.localStorage.removeItem('activity_id')
  window.localStorage.removeItem('estate_id')
}
