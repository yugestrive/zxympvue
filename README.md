# zxy_kj_mpvue

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report

# 开发阶段：
`第一步`： 调用wx.login获取code 例如 code: "033E98Pn1J4vYo0KTDRn1D9lPn1E98PQ"

`第二步`：使用 code 换取 openid 和 session_key 等信息 "前端发送code给后台" 后台调用"微信接口auth.code2Session"：“GET请求” "https://api.weixin.qq.com/sns/jscode2session?appid=文档提取&secret=文档提取&js_code=前端发送&固定格式：grant_type=authorization_code"
官网开发者文档拿到的：
appid: "文档提取"
secret: "文档提取"
code: "033E98Pn1J4vYo0KTDRn1D9lPn1E98PQ" // "wx.login获取的"
grant_type: "authorization_code" // "固定的数据"

得到openid: "oQWGX5LpJ_1ODGxoIIAaPyDqkjuI" // "用户的唯一标识"
session_key: "krT+BZG8c0ZyBGtJJ1Vb3Q==" // "会话密钥"

# 小程序热更新方法写在App.vue的created() 钩子函数中，具体根据业务场景来

# wx.request()请求
'说明'：
1、本系统在'services'的'reques.js文件'中 对常用的'GET方法'和'POST方法'进行了装，具体根据业务场景进行设定，请求的'ip地址'放在'config.js'文件中，业务接口设定在'apis文件'中，并将其挂载到在vue的原型对象上'$api'，在全局可用'this.$api.接口方法名（参数config.data）'进行使用
2、本系统在'services'的'interceptor.js文件'中，对wx.request请求进行拦截器设置，拦截器也可对wx的其他API方法进行响应拦截设置，具体根据业务场景进行设定，请求的'ip地址'放在'config.js'文件中，业务接口设定在'apis文件'中，并将其挂载到在vue的原型对象上'$api'，在全局可用'this.$api.接口方法名（参数config.data）'进行使用

# vantweapp
'说明'：可在网上自行下载vant-weapp进行版本升级，替换vant版本，附有赞git地址:'https://github.com/youzan/vant-weapp', 下载下来只需将dist目录中的文件放到static/vant文件下即可
'使用'： 在每个文件的main.json文件中的"usingComponents"进行引入，即可在index.vue文件中使用

# weui
'说明'：具体请看微信官方文档：附地址：'https://developers.weixin.qq.com/miniprogram/dev/extended/weui/'
'使用'： 在每个文件的main.json文件中的"usingComponents"进行引入，即可在index.vue文件中使用
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
