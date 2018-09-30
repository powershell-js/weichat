// pages/My_attention/My_attention.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backinfo:'',
    to: 0,
    le: 0,
    list:[]
  },
  jump: function(e) {
    console.log(e)
  },
  follow: function(event) {
    console.log(event.currentTarget.dataset.num)
    wx.navigateTo({
      url: '../Vehicle_position/Vehicle_position?vehicleId=' + event.currentTarget.dataset.num,
    })
  },
  // 监听页面滑动
  onPageScroll: function(e) {
    console.log(e)
    this.setData({
      to: e.touches[0].clientY,
      le: e.touches[0].clientX
    })
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
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {

        wx.request({
          url: 'https://www.123gps.com.cn/app/appAttention/query?token=' + res.data + '&vehicleid=' + '',
          header: {
            'content-type': 'application/xml'
          },

          success(res) {
            console.log(res.data.msg)
            if (res.data.code == 1) {
              that.setData({
                list: res.data.msg
              })
            }
          }
        })

      }
    })
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