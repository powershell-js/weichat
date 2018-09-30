// pages/Historical_details/Historical_details.js

var timeStamp = require('../../utils/timeStamp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    infos: [],
    font: false,
    data: [],

  },
  translate: function() {
    this.setData({
      font: false
    })
  },
  change: function() {
    this.setData({
      font: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function(options) {
    //时间戳转换时间
    function toDate(number, format) {
      var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
      var returnArr = [];
      var date = new Date(number * 1000);
      returnArr.push(date.getFullYear());
      returnArr.push(formatNumber(date.getMonth() + 1));
      returnArr.push(formatNumber(date.getDate()));
      returnArr.push(formatNumber(date.getHours()));
      returnArr.push(formatNumber(date.getMinutes()));
      returnArr.push(formatNumber(date.getSeconds()));
      for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
      }
      return format;
    }

    var info = JSON.parse(options.info);
    console.log(info)
    this.setData({
      info: info
    })
    let length = info.track_info.length
    let data = []
    
    for (let i = 0; i < length; i++) {
      // data[i] = info.track_info[i].split('|')
      data[i] = {
        date: timeStamp.formatTime(new Date(Number((Number(info.beginTime) + Number(info.track_info[i].split('|')[0])) + '000')), 'Y-M-D h:m'),
        park: info.track_info[i].split('|')[6],
        tem: (info.track_info[i].split('|')[1]).split(','),
        place: info.track_info[i].split('|')[info.track_info[i].split('|').length-2],
        speed: info.track_info[i].split('|')[8] || info.track_info[i].split('|')[3]
      }
    }
    this.setData({
      data: data
    })
    console.log(data)
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