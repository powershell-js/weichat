// pages/mileage/mileage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mileinfo: [],
    network: "",
    token: '',
    beginDate: '',
    endDate: '',
    vehicleId: "",
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: options.token,
      beginDate: options.startTime,
      endDate: options.endTime,
      vehicleId: options.vehicleId
    })
    this.query()
  },
  query: function () {
    let that = this
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      
      url: 'https://www.123gps.com.cn/app/vehicleoilchangeinfo/getList',
      data:{
           token:that.data.token,
           tmpOrOil:'oil',
           beginTime:that.data.beginDate,
           endTime:that.data.endDate,
           vehicleIds: that.data.vehicleId ,
           page:that.data.page,
           rows:'10',
           point:'no',
           isNeedHoliday:'0'
      },
      method:"GET",
      header: {
        'content-type': 'application/xml'
      },

      success(res) {
        wx.hideLoading()
        if (res.data.msg.rows.length == 0) {
          wx.showToast({
            title: '暂无数据',  //标题
            icon: 'loading',  //图标，支持"success"、"loading"
            image: '',  //自定义图标的本地路径，image 的优先级高于 icon
            duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
            mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
            success: function () { }, //接口调用成功的回调函数
            fail: function () { },  //接口调用失败的回调函数
            complete: function () { } //接口调用结束的回调函数
          })
          return
        }
        that.setData({
          mileinfo: res.data.msg.rows
        })
        console.log(that.data.mileinfo)
      }
    })
  },
  // 导出
  download: function () {
    let network = 'https://www.123gps.com.cn/rest/vehiclestatisticmileinfo/exportDetailMileExcel?token=0f047a577bbc61097b851f264d7ea3e2&beginDate=2018-09-18%2000:00&endDate=2018-09-19%2023:59&vehicleId=333069,333018,332880,332450,16087,328887,333202,333204,333203,333206,333816,332458,333260,333553,18203'
    this.setData({
      network: network
    })
    wx.navigateTo({
      url: '../download/download?network=' + this.data.network,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(9)
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    let num = this.data.page + 1
    console.log(this.data.page, num)
    this.setData({
      page: num
    })

    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: 'https://www.123gps.com.cn/app/vehicleoilchangeinfo/getList',
      data: {
        token: that.data.token,
        tmpOrOil: oil,
        beginTime: that.data.beginDate,
        endTime: that.data.endDate,
        vehicleIds: that.data.vehicleId,
        page: that.data.page,
        rows: '10',
        point: 'no',
        isNeedHoliday: '0'
      },
      method: "GET",
      header: {
        'content-type': 'application/xml'
      },

      success(res) {
        wx.hideLoading()
        if (res.data.msg.rows.length == 0) {
          wx.showToast({
            title: '暂无数据',  //标题
            icon: 'loading',  //图标，支持"success"、"loading"
            image: '',  //自定义图标的本地路径，image 的优先级高于 icon
            duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
            mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
            success: function () { }, //接口调用成功的回调函数
            fail: function () { },  //接口调用失败的回调函数
            complete: function () { } //接口调用结束的回调函数
          })
          return
        }
        console.log(res.data.msg)
        let mileinfo = that.data.mileinfo
        let length = res.data.msg.rows.length
        for (var i = 0; i < length; i++) {
          mileinfo.push(res.data.msg.rows[i])
        }
        that.setData({
          mileinfo: mileinfo
        })
        console.log(that.data.mileinfo)
      }
    })

    wx.hideLoading();
    // 页数+1
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})