// pages/timing/timing.js
var pickerFile = require('../../utils/picker_datetime.js')
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    vehicleId: [],
    beginTime: "",
    endTime: "",
    title: "温度明细",
    interval: "5",
    equip_value: "",
    equipment_select: [],
    token: "0f047a577bbc61097b851f264d7ea3e2",
    value_date: "最近24小时",
    selet_date: false,
    selet_equip: false,

    dateinfo: [
      '最近24小时',
      '最近3天',
      '最近7天',
      '自定义范围',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name)
    this.setData({
      title: options.name
    })
    wx.setNavigationBarTitle({
      title: options.name //页面标题为路由参数
    })
    // 获取token
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        })
        that.allId()


      }
    })
  },
  allId: function () {
    var that = this
    wx.request({
      url: 'https://www.123gps.com.cn/app/vehicleSingleList?token=' + this.data.token,
      header: {
        'content-type': 'application/xml'
      },

      success(res) {

        let vehicleIds = []
        let vehicleId = []
        let lengths = res.data.msg.length
        for (var i = 0; i < lengths; i++) {
          vehicleIds.push(res.data.msg[i].id)
          vehicleId.push(res.data.msg[i])
        }
        that.setData({
          equipment_select: vehicleId
        })
        that.setData({
          equipment_selects: that.data.equipment_select
        })
        console.log(that.data.equipment_select)
        // that.alldetail(vehicleIds.join())
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

  },
  selet_date: function () {
    let that = this
    that.setData({
      selet_date: !that.data.selet_date
    })
  },
  selet_equip: function () {
    let that = this
    that.setData({
      selet_equip: !that.data.selet_equip
    })
  },
  date_list: function (res) {
    console.log(res.currentTarget.dataset.name)
    let that = this
    if (res.currentTarget.dataset.name == "自定义范围") {
      wx.navigateTo({
        url: '../Time/Time',
      })
      this.setData({
        selet_date: false
      })
    } else {
      this.setData({
        value_date: res.currentTarget.dataset.name,
        selet_date: false
      })
      // 
      let date = res.currentTarget.dataset.name
      let timestamp = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
      var time = util.formatTime(timestamp).replace(new RegExp("/", ("gm")), "-");
      // 结束时间

      // let endTime = endTimes
      let endTime = new Date()
      var endTimes = util.formatTime(endTime).replace(new RegExp("/", ("gm")), "-");
      if (date == '最近24小时') {
        let starTime = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
        var starTimes = util.formatTime(starTime).replace(new RegExp("/", ("gm")), "-");
        that.setData({
          beginTime: starTimes.slice(0, 16),
          endTime: endTimes.slice(0, 16),
        })
        console.log(that.data.endTime)
      }
      if (date == '最近3天') {
        let starTime = new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
        var starTimes = util.formatTime(starTime).replace(new RegExp("/", ("gm")), "-");

        that.setData({
          beginTime: starTimes.slice(0, 16),
          endTime: endTimes.slice(0, 16),
        })
        console.log(that.data.endTime)
      }
      if (date == '最近7天') {
        let starTime = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
        var starTimes = util.formatTime(starTime).replace(new RegExp("/", ("gm")), "-");

        that.setData({
          beginTime: starTimes.slice(0, 16),
          endTime: endTimes.slice(0, 16),
        })
        console.log(that.data.endTime)
      }
      // 
    }

  },
  equip_list: function (res) {
    let equip_value = this.data.equip_value
    let vehicleId = this.data.vehicleId
    vehicleId.push(res.currentTarget.dataset.id)
    this.setData({
      equip_value: res.currentTarget.dataset.name + ',' + equip_value,
      vehicleId: vehicleId
      // selet_equip: false
    })
    console.log(this.data.vehicleId)
  },
  interval: function (res) {
    console.log(res.detail.value)
    this.setData({
      interval: res.detail.value
    })
  },
  equip_value: function (res) {
    console.log(res.detail.value)
    this.setData({
      equip_value: res.detail.value,
      selet_equip: true
    })
    let length = this.data.equipment_select.length
    let equipment_selects = []
    for (var i = 0; i < length; i++) {
      if ((this.data.equipment_select[i].text).indexOf(res.detail.value) > 1) {
        console.log((this.data.equipment_select[i].text).indexOf(res.detail.value))
        equipment_selects[i] = (this.data.equipment_select[i])
      }
      if (res.detail.value == '') {
        equipment_selects[i] = (this.data.equipment_select[i])
      }

    }

    this.setData({
      equipment_selects: equipment_selects
    })
  },
  conter: function () {
    this.setData({
      selet_date: false,
      selet_equip: false
    })
  },
  submit: function () {
    let that = this
    if (this.data.beginTime == '') {
      let timestamp = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
      var time = util.formatTime(timestamp).replace(new RegExp("/", ("gm")), "-");
      // 结束时间

      // let endTime = endTimes
      let endTime = new Date()
      var endTimes = util.formatTime(endTime).replace(new RegExp("/", ("gm")), "-");
      let starTime = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
      var starTimes = util.formatTime(starTime).replace(new RegExp("/", ("gm")), "-");
      that.setData({
        beginTime: starTimes.slice(0, 16),
        endTime: endTimes.slice(0, 16),
      })
    }
    let title = "里程明细"
    if (title == "里程明细") {
      wx.navigateTo({
        url: '../abnormality/abnormality?token=' + this.data.token + "&startTime=" + this.data.beginTime + "&endTime=" + this.data.endTime + "&vehicleId=" + this.data.vehicleId,
      })
    }



  },
  // 全选
  selectall: function () {
    let that = this
    this.setData({
      checked: !this.data.checked
    })
    if (this.data.checked) {
      let length = that.data.equipment_select.length
      let vehicleId = []
      let equip_value = []
      for (var i = 0; i < length; i++) {
        vehicleId[i] = that.data.equipment_select[i].id
        equip_value[i] = that.data.equipment_select[i].text
      }
      this.setData({
        vehicleId: vehicleId,
        equip_value: equip_value.join(',')
      })
    } else {
      this.setData({
        vehicleId: [],
        equip_value: ""
      })
    }
  }
})
// https://123gps.com.cn/app/vehiclestatisticmileinfo/getDetailMileInfo?token=0f047a577bbc61097b851f264d7ea3e2&beginDate=2018/9/19%2000:00:00&endDate=2018/9/19%2023:59:59&vehicleId=333069,333018,332880,332450,16087,328887,333202,333204,333203,333206,333816,332458,333260,333553,18203&page=1&rows=10