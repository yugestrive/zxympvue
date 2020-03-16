/***
 * author: zxy
 * date: 2020.03.10
 */
// 引入拦截器
import wxApiInterceptors from 'wxapp-api-interceptors'
// 引入Auth
import Auth from '../utils/auth'
// 引入全局URL
import { GLOBAL_URL } from '../config'

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
            }
            if(token && !request.headers.token) {
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
