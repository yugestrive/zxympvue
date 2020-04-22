/***
 * author: zxy
 * date: 2020.03.10
 */
import wxApiInterceptors from 'wxapp-api-interceptors' // 引入拦截器
import Auth from '../utils/auth' // 引入Auth
import { GLOBAL_URL } from '../config' // 引入全局URL
// import { stringify } from 'querystring'

// 定义request头部参数
const OPTIONS = {
  header: { 'Content-Type': 'application/json;charset=utf-8' }
}

// 对wx.request的拦截、还可对其他wx的API进行拦截设置
wxApiInterceptors({
  request: {
    // 请求拦截
    request: request => {
      wx.showLoading({ title: '加载中...' })
      // 拿到用户token
      let token = Auth.getToken()
      let area = Auth.getArea()
      // URL匹配http若传有带http/https/协议的
      if (token) {
        request.header.token = `${token}`
      }
      if (area) {
        request.header.area = `${area}`
      }
      return request
    },
    // 响应拦截，可做一些响应处理
    response: response => {
      wx.hideLoading()
      if (response.statusCode === 200) {
        return response
      } else if (response.statusCode === 404) {
        console.log('请求url路径不存在！')
      } else if (response.statusCode === 500) {
        console.log('服务器未知错误！')
      }
    }
  }
})

// 定义wx请求类
export class WXRequest {
  /**
     * @param {Object} options
     * @param {string} options.url 请求路径
     * @param {string} options.method 请求路径
     * @param {Object} [options.data = {}] 请求数据
     * @param {Object} [options.header = {}] 请求头
     */
  constructor({ url, method = 'POST', data = {}, header } = {}) {
    const reg = /^(http|https)?:\/\//
    if (!url) {
      throw new RangeError('缺少 url 参数')
    }
    this.url = !reg.test(url) ? GLOBAL_URL + url : url
    this.method = method
    // 如果没有传入 header 使用 OPTIONS 对应当前环境的 header 配置
    this.header = header || OPTIONS.header
    this.data = data
  }
  send() {
    console.log(this.url, this.header, this.data)
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.url,
        method: this.method,
        header: this.header,
        data: this.data,
        success: res => {
          resolve(res.data)
        },
        fail: res => {
          reject(res.errMsg)
        }
      })
    })
  }
}
