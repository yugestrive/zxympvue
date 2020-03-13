import Vue from 'vue'
import App from './App'
import '../static/weui/weui-wxss/dist/style/weui.wxss' // 引入weui样式
import { registerPlugins } from './plugins' // 注册插件
import { registerFunctions } from './functions' // 全局方法


registerFunctions(Vue) // 全局方法
registerPlugins(Vue) // 注册插件
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
