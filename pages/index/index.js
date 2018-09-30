//index.js
//获取应用实例
var utilMd5 = require('../../utils/md.js');
const app = getApp()
var fromUserName;
Page({
  data: {
    checked: false,
    Check_mark: "0",
    infos: "1213",
    missshow: false,
    fromUserName: '',
    username: '',
    password: '',
    passwordshow: true,
    newpassword: '...',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  jizhu: function() {
    if (this.data.checked) {
      this.setData({
        checked: false
      })
      wx.setStorage({
        key: 'username',
        data: {
          'username': '',
          'pass': '',
          checked: this.data.checked
        },
        success: function() {

        }
      })
    } else {
      this.setData({
        checked: true
      })
      // wx.showLoading({
      //   title: '记住密码',
      // })
      wx.setStorage({
        key: 'username',
        data: {
          'username': this.data.username,
          'pass': this.data.password,
          checked: this.data.checked
        },
        success: function() {

        }
      })
    }
  },
  //事件处理函数
  bindViewTap: function() {

    wx.redirectTo({
      url: '../main/main'
    })
  },
  onLoad: function() {
    // 获取本地储存
    let that = this
    wx.getStorage({
      key: 'username',
      success: function(res) {
        console.log(res.data)
        that.setData({
          username: res.data.username,
          password: res.data.pass,
          checked: res.data.checked
        })

      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        console.log(res)
      }

    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  denglu: function() {
    // if (!this.data.checked) {
    //   wx.setStorage({
    //     key: 'username',
    //     data: {
    //       'username': '',
    //       'pass': ''
    //     },
    //     success: function () {

    //     }
    //   })
    // } else {
    //   wx.setStorage({
    //     key: 'username',
    //     data: {
    //       'username': this.data.username,
    //       'pass': this.data.password
    //     },
    //     success: function () {

    //     }
    //   })}
    // if (this.data.username == 1 && this.data.password==1){
    console.log(this.data.checked)
    if (this.data.checked) {
      // this.jizhu()
      wx.setStorage({
        key: 'username',
        data: {
          'username': this.data.username,
          'pass': this.data.password,
          checked: this.data.checked
        },
        success: function() {

        }
      })
    } else {
      wx.setStorage({
        key: 'username',
        data: {
          'username': '',
          'pass': '',
          checked: this.data.checked
        },
        success: function() {

        }
      })
    }
    var username = this.data.username
    var userPass = utilMd5.hexMD5(this.data.password);
    // var fromUserName = 'o6Uf90CqfkImhBH4fqwnFDtUR6xk'
    var that = this
    wx.request({
      url: 'https://123gps.com.cn/app/wx/login?userName=' + this.data.username + '&userPass=' + userPass + '&fromUserName=' + fromUserName,
      header: {
        'content-type': 'application/xml'
      },

      success(res) {
        console.log(res);
        if (!res.data.success) {
          wx.showToast({
            title: res.data.message,
            icon: "loading"
          })
          return
        }
        let token = res.data.token;
        let userName = res.data.userName;

        wx.setStorage({
          key: 'token',
          data: token,
          success: function() {

          }
        })

        let infos = that.data.infos

        wx.redirectTo({

          url: '../main/main?username=' + that.data.username,

        })
      }
    })
    let use = this.data.username
    console.log(use)

  },
  // onLoad: function (options) {

  //   let use = this.data.username
  //   console.log(use)
  //   wx.getStorage({
  //     key: "openid",
  //     data: use,
  //     success: function (res) {
  //       console.log(res)
  //       fromUserName = res.data
  //     }
  //   })
  // },
  userName: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  passWord: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  showpass: function() {
    this.setData({
      passwordshow: !this.data.passwordshow
    })
  },
  miss: function() {
    this.setData({
      missshow: true
    })
  },
  quxiao: function() {
    this.setData({
      missshow: false
    })
  },
  dadianhua: function() {
    wx.makePhoneCall({
      phoneNumber: '4008204680',
      success: function() {
        wx.showToast({
          title: '拨打成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      },
      fail: function() {
        wx.showToast({
          title: '拨打失败',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
      }
    })
    this.setData({
      missshow: false
    })
  },
  // 免费体验
  experience: function() {
    wx.navigateTo({
      url: '../experience/experience',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})