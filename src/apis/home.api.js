/***
 * author: zxy
 * date: 2020.03.10
 */
// import { WXRequest } from '../service/request.js'

// export function requestOpenId(data) {
//     return new WXRequest({
//         url: '',
//         method: 'POST',
//         data,
//         header: { 
//             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//         }
//     }).q()
// }
import md5 from 'js-md5'
import Auth from '../utils/auth'
import { WXRequest } from '../service/interceptor'
const Base64 = require('js-base64').Base64

export function requestOpenId(data) {
    return wx.request(
        new WXRequest({
            url: 'weChat/getWeChatOpenId',
            method: 'POST',
            data
        })
    )
}