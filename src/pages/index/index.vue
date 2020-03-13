<template>
  <div>
    <mp-navigation-bar :back="false" title="首页"></mp-navigation-bar>
    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
      
    </div>
    <mp-dialog title="test" :show="showDialog" @buttontap="tapDialogButton" :mask-closable="false" :buttons="[{text: '取消'}, {text: '确认'}]">
        <div>test content</div>
    </mp-dialog>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      showDialog: true,
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },
  components: {
    card
  },
  created () {
    // let app = getApp()
  },
  onLoad () {
    this.getLocation()
  },
  methods: {
    bindViewTap () {
      const url = '/pages/logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.redirectTo({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    /**
       * 获取位置
       */
    getLocation () {
      let _this = this
      wx.getLocation({
        type: 'wgs84',
        success (result) {
          _this.localMsg = result
          _this.getOpenId()
        },
        fail (res) {
          _this.localMsg = {
            latitude: 0,
            longitude: 0
          }
          _this.getOpenId()
        },
        complete (res) {}
      })
    },
    tapDialogButton(e) {
      this.showDialog = false
      console.log(e)
    },
    tabChange(e) {
      console.log(e.target.item)
      let url = e.target.item.link
    },
    /**
     * 获取openID
     * @param code
     * @returns {Promise.<void>}
     */
    getOpenId () {
      let _this = this
      wx.login({
        success: res => {
          console.log(res, '得到微信code')
          let config = {
            data: {
              jscode: res.code,
              longitude: _this.localMsg.longitude,
              latitude: _this.localMsg.latitude
            }
          }
          // console.log(config.data)
          _this.$api.homeApi.requestOpenId(config.data).then(result => {
            console.log(result, '处理微信code')
            if (result.state === '10001') {
              let openid = result.data.openid
              wx.setStorageSync('openId', openid)
              _this.setOpenId(openid)
              _this.postOpenId(openid)
              if (!wx.getStorageSync('wxUserInfo')) _this.popupState = true
            }
          })
        }
      })
    }
    
  },

  
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
