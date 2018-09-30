// pages/experience/experience.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    computer: "",
    telepho: "",
    email: "",
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
  computer: function(res) {
    console.log(res.detail.value)
    this.setData({
      computer: res.detail.value
    })
  },
  telepho: function(res) {
    console.log(res.detail.value)
    this.setData({
      telepho: res.detail.value
    })
  },
  email: function(res) {
    console.log(res.detail.value)
    this.setData({
      email: res.detail.value
    })
  },
  // 提交
  submit: function() {
    var ret = /^[1][3,4,5,7,8][0-9]{9}$/
    var rett = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    console.log(ret.test(this.data.telepho)) 
    if (!ret.test(this.data.telepho)){
      wx.showToast({
      title: '手机号码错误', //标题      
        icon: 'loading', //图标，支持"success"、"loading"      
      // image: '../img/img.png', //自定义图标的本地路径，image 的优先级高于 icon      
      duration: 1500, //提示的延迟时间，单位毫秒，默认：1500      

    })
    return
    }
    if (!rett.test(this.data.email)) {
      wx.showToast({
        title: '邮箱错误', //标题      
        icon: 'loading', //图标，支持"success"、"loading"      
        // image: '../img/img.png', //自定义图标的本地路径，image 的优先级高于 icon      
        duration: 1500, //提示的延迟时间，单位毫秒，默认：1500      

      })
      return
    }
    // wx.request({
    //   url: 'https://www.123gps.com.cn/app/freeTest/freeTestSave?company=' + this.data.computer + '&phone=' + this.data.telepho + '&email=' + this.data.email,
    //   header: {
    //     'content-type': 'application/xml'
    //   },

    //   success(res) {
    // wx.showToast({
    //   title: '提交成功', //标题      
    //   icon: 'success', //图标，支持"success"、"loading"      
    //   // image: '../img/img.png', //自定义图标的本地路径，image 的优先级高于 icon      
    //   duration: 1500, //提示的延迟时间，单位毫秒，默认：1500      

    // })
    // console.log(this.data.computer, this.data.telepho, this.data.email)
    // wx.navigateBack({
    //   delta: 1,
    // })
    //   }
    // })
    

  }
})