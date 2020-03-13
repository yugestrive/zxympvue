/***
 * author: zxy
 * date: 2020.03.10
 */
// 引入拦截器
import wxApiInterceptors from 'wxapp-api-interceptors'
// 引入Auth
import Auth from '../utils/auth'
// 引入全局URL
import { GLOBAL_URL } from './config'

// 定义request头部参数
const OPTIONS = {
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
}

// 对wx.request的拦截、还可对其他wx的API进行拦截设置
wxApiInterceptors({
    request: {
        // 请求拦截
        request: request => {
            wx.showLoading({title: '加载中...'})
            // 拿到用户token
            const token = Auth.getToken()
            // URL匹配http若传有带http/https/协议的
            const reg = /^(http|https)?:\/\//
            if (!reg.test(request.url)) {
                request.url = GLOBAL_URL + request.url
                
            } else if(token && !request.headers.token) {
                request.headers.token = `${token}`
            }
            console.log('request.url:', request.url, 'header:', request.headers)
            return request
        },
        // 响应拦截，可做一些响应处理
        response: response => {
            wx.hideLoading()
            console.log('response:', response)
            if (response.statusCode === 200) {
                return response.data
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
     * @param {Object} [options.headers = {}] 请求头
     */
    constructor({ url, method = 'POST', data = {}, headers = {} } = {}) {
        if(!url) {
            throw new RangeError('缺少 url 参数')
        }
        
        this.method = method
        // 如果没有传入 headers 使用 OPTIONS 对应当前环境的 headers 配置
        this.headers = headers || OPTIONS.headers
        console.log(this.headers, 'this.header')
        if (this.method === 'GET') {
            this.url = url + getParams(data)
        } else {
            this.url = url
            this.data = data
        }
    }
}
