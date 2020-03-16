// 定义request头部参数
const OPTIONS = {
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
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
    send() {
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
