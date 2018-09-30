// pages/modify/modify.js
var utilMd5 = require('../../utils/md.js');
const app = getApp()
// var fromUserName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:"",
    oldPwd: "",
    newPwd: "",
    newPwds: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  oldPwd: function(res) {
    this.setData({
      oldPwd: res.detail.value
    })
    console.log(this.data.oldPwd)
  },
  newPwd: function(res) {
    this.setData({
      newPwd: res.detail.value
    })
    console.log(this.data.newPwd)
  },
  newPwds: function(res) {
    this.setData({
      newPwds: res.detail.value
    })
    console.log(this.data.newPwds)
  },
  // 修改密码
  Determine: function() {
    let oldPwd = utilMd5.hexMD5(this.data.oldPwd);
    let newPwd = utilMd5.hexMD5(this.data.newPwd);
    let newPwds = utilMd5.hexMD5(this.data.newPwds);
    if (this.data.newPwd !== this.data.newPwds){
      wx.showToast({
        title: '2次密码不一致',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return
    }
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        })
        wx.request({
          url: 'https://www.123gps.com.cn/app/sysuserinfo/updatepwd?token=' + that.data.token + '&oldPwd=' + oldPwd + '&newPwd=' + newPwd,
          header: {
            'content-type': 'application/xml'
          },

          success(res) {
            if (res.data.code=='-1'){
              wx.showToast({
                title: res.data.msg,
                icon: 'loading',
                duration: 1000,
                mask: true
              })
              return
            }else{
              wx.showToast({
                title: '密码修改成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              },
                wx.redirectTo({
                  url: '../main/main',
                })
              )
              
            }
          }
        })

      }
    })
    
  }
})