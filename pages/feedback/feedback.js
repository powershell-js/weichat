// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputs: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  inputs: function(res) {

    this.setData({
      inputs: res.detail.value
    })
    console.log(this.data.inputs)
  },
  jump: function() {
    if (this.data.inputs.length == 0) {
      wx.showToast({
        title: '请填写你的意见',
        icon: 'loading',
        duration: 4000
      })
    } else {
      var that = this
      wx.getStorage({
        key: 'token',
        success: function(res) {
          // that.setData({
          //   token: res.data
          // })
          wx.request({
            url: 'https://www.123gps.com.cn/app/sysfeedback/saveSysFeedback?token=' + res.data + '&problemContent=' + that.data.inputs,
            header: {
              'content-type': 'application/xml'
            },

            success(res) {
             console.log(res)
              wx.showToast({
                title: res.data.msg,
                icon: 'succes',
                duration: 4000,
                mask: true
              })
              wx.redirectTo({
                url: '../main/main',
              })
            }
          })


        }
      })
    }
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

  }
})