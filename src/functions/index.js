import API from '../apis'

// 深拷贝，并过滤空数组
function deepClone (obj) {
    const newObj = obj.constructor === Array ? [] : {}
    for (let keys in obj) {
      if (obj.hasOwnProperty(keys) && obj[keys].length !== 0) {
        if (obj[keys] && typeof obj[keys] === 'object') {
          newObj[keys] = obj[keys].constructor === Array ? [] : {};
          newObj[keys] = deepClone(obj[keys]);
        } else {
          newObj[keys] = obj[keys]
        } 
      }
    }
    return newObj
}
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
/**
 * 注册全局插件
 * @param {Vue} Vue
 */

export const registerFunctions = Vue => {
    Vue.prototype.$api = API
    Vue.prototype.$deepClone = deepClone
    Vue.prototype.$formatTime = formatTime
}