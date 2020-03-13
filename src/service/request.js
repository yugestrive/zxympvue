// 引入全局URL
import { GLOBAL_URL } from './config'

// 定义request头部参数
const OPTIONS = {
    header: { 'Content-Type': 'application/json;charset=utf-8' }
}

const getParams = (data) => {
    try {
        let temArr = []
        for(let i in data) {
            let key = encodeURIComponent(i)
            let value = encodeURIComponent(data[i])
            temArr.push(key + '=' + value)
        }
        let paramsStr = temArr.join('&')
        return '?' + paramsStr
    } catch(err) {
        return ''
    }
}

// 定义wx请求类
export class WXRequest {
    constructor({url = '', method = 'POST', header = {}, data = {}} = {}) {
        // URL匹配http若传有带http/https/协议的
        let reg = /^(http|https)?:\/\//
        this.method = method
        this.header = header | OPTIONS.header
        this.url = (reg.test(url) ? url : (GLOBAL_URL + url)) + (this.method === 'GET' ? getParams(data) : '')
        this.data = this.method === 'GET' ? {} : data
    }
    q() {
        return new Promise((resolve, reject) => {
            wx.request({
                url: this.url,
                method: this.method,
                header: this.header,
                data: this.data,
                success: res => {
                    // 定义拦截
                    if (res.statusCode === 200) {
                        resolve(res.data)
                    }
                },
                fail: res => {
                    reject(res.errMsg)
                }
            })
        })
    }
}
