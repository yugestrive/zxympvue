import moment from 'moment'
import store from '../store'

/**
 * 注册全局插件
 * @param {Vue} Vue
 */

export const registerPlugins = Vue => {
    Vue.prototype.moment = moment
    Vue.prototype.$store = store
}