
Page({
  onShareAppMessage: function () {

    return {

      title: aa,

      desc: '自定义分享描述',

      path: '/pages/main/main?url='

    }

  },

  data:{
      aaa:'56',
      username:"",
    SDKVersion:"",
    missshow:false,
    yijian:false
  },
  onLoad: function (options) {
    var that=this
    console.log(options)
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        
        that.setData({
          username:res.data
        })
      }
    })
    that.setData({
      SDKVersion: wx.getSystemInfoSync().SDKVersion
    })
    
  },
  backindex:function(){
    wx.navigateTo({
      url: '../index/index'
    })
  },
  zixun:function(){
    this.setData({
      missshow:true
    })
  },
  quxiao: function () {
    this.setData({
      missshow: false
    })
  },
  dadianhua: function () {
    wx.makePhoneCall({
      phoneNumber: '4008204680',
      success: function () {
        wx.showToast({
          title: '拨打成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      },
      fail: function () {
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
  yijian:function(){
    wx.navigateTo({
      url: '../yijian/yijian'
    })
  }
})

