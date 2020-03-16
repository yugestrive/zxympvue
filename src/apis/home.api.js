/***
 * author: zxy
 * date: 2020.03.10
 */
import { WXRequest } from '../service/request.js'
import md5 from 'js-md5'
import Auth from '../utils/auth'
const Base64 = require('js-base64').Base64

export function requestOpenId(data) {
    return new WXRequest({
        url: 'weChat/getWeChatOpenId',
        method: 'POST',
        data,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).send()
}
