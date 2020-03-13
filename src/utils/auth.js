export default class Auth {
    static setOpenId(openId) {
        return wx.setStorageSync('openId', openId)
    }
    static getOpenId() {
        return wx.getStorageSync('openId')
    }
    static removeOpenId() {
        return wx.removeStorageSync('openId')
    }
    static setArea(area) {
        return wx.setStorageSync('area', area)
    }
    static getArea() {
        return wx.getStorageSync('area')
    }
    static removeArea() {
        return wx.removeStorageSync('area')
    }
    static setToken(token) {
        return wx.setStorageSync('token', token)
    }
    static getToken() {
        return wx.getStorageSync('token')
    }
    static removeStorageSync() {
        return wx.removeStorageSync('token')
    }
}