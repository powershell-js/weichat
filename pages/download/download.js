// pages/download/download.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    network:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var Info = JSON.parse(options.info)
    // 获取token
    let token=""
    let that=this
    
    wx.getStorage({
      key: 'token',
      success: function (res) {
          token=res.data
        console.log(Info.name == "历史查询")
        console.log('历史查询')
        if (Info.name == "历史查询") {
          
          that.setData({
            network: "https://www.123gps.com.cn/app/tc01/exportExcel?token=" + token + "&vehicleId=" + Info.vehicleId + "&beginTime=" + Info.beginTime + "&endTime=" + Info.endTime + "&spaceInterval=3000"
          })
        }
        if (Info.name == "温度明细") {
          console.log("https://www.123gps.com.cn/app/vehicletmpdetailinfo/exportTmpDetailExcel?token=" + token + "&vehicleId=" + Info.vehicleId + "&startTime=" + Info.beginTime + "&endTime=" + Info.endTime + "&hasLocation=0" + "&timeInterval=0")
          that.setData({
            network: "https://www.123gps.com.cn/app/vehicletmpdetailinfo/exportTmpDetailExcel?token=" + token + "&vehicleId=" + Info.vehicleId + "&startTime=" + Info.beginTime + "&endTime=" + Info.endTime + "&hasLocation=0" + "&timeInterval=0"
          })
        }
        if (Info.name == "里程明细") {
          
          // var timestamp = Date.parse(new Date());
          var timestamp = new Date().getTime();
          // timestamp = timestamp;
          
          that.setData({
            network: "https://www.123gps.com.cn/app/vehiclestatisticmileinfo/exportDetailMileExcel?token=" + token + "&time=" + timestamp + "&vehicleId=" + Info.vehicleId + "&beginDate=" + Info.beginTime + "&endDate=" + Info.endTime+ "&isNeedHoliday=0"
          })
        }
        if (Info.name == "停车明细") {
        
          that.setData({
            network: "https://www.123gps.com.cn/app/vehiclestopdetailinfo/exportStopAccOffDetailExcel?token=" + token + "&timeInterval=180" + "&vehicleId=" + Info.vehicleId + "&beginDate=" + Info.beginTime + "&endDate=" + Info.endTime + "&isNeedHoliday=0" + "&point=no" + "&shielDate=undefined"
          })
        }
        if (Info.name == "超温明细") {

          that.setData({
            network: "https://www.123gps.com.cn/app/vehicletmpwarninginfo/exportExcel?token=" + token + "&vehicleId=" + Info.vehicleId + "&startTime=" + Info.beginTime + "&endTime=" + Info.endTime
          })
        }
        if (Info.name == "油量异常") {

          that.setData({
            network: "https://www.123gps.com.cn/app/vehicleoilexceptioninfo/exportLeakOilExcel?token=" + token + "&vechicleIds=" + Info.vehicleId + "&startTime=" + Info.beginTime + "&endTime=" + Info.endTime
          })
        }
        if (Info.name == "油量动态") {

          that.setData({
            network: "https://www.123gps.com.cn/app/vehicleoilchangeinfo/exportOilChangeDetailExcel?token=" + token + "&vehicleId=" + Info.vehicleId + "&beginTime=" + Info.beginTime + "&endTime=" + Info.endTime + "&showPosition=true" + "&timeInterval=180"
          })
        }
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})