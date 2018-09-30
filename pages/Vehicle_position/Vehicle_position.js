Page({

  /**
   * 页面的初始数据
   */
  data: {
    vehicleId: "",
    atten: "",
    token: "",
    allInfo: [],
    name: "",
    // 地图
    to: "0",
    le: "0",
    // 多个点标记

    markers: [],

    // 历史轨迹线
    polyline: [{
      points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        },
        {
          longitude: 113.324520,
          latitude: 23.10229
        },
        {
          latitude: 23.099994,
          longitude: 113.324520
        },
        {
          latitude: 23.199994,
          longitude: 113.324520
        }
      ],
      // 历史轨迹线
      color: "#FF0000DD",
      width: 3,
      dottedLine: false
    }],
    // scale:16,

    // 地图
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  huadong: function(e) {
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
    this.setData({

    })
    var that = this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          token: res.data
        })
        that.vehicle(options.vehicleId)
        that.attenStatu(options.vehicleId)

      }
    })
    console.log(options.vehicleId)
  },
  // 关注
  attention: function() {
    let that = this
    wx.request({
      url: 'https://www.123gps.com.cn/app/appAttention/addOrDel?token=' + this.data.token + '&vehicleid=' + this.data.vehicleId,
      header: {
        'content-type': 'application/xml'
      },

      success(res) {

        console.log(res.data.msg == '关注成功！')
        if (res.data.msg == '关注成功！') {
          //  console.log()
          that.setData({
            atten: '1'
          })

          console.log(that.data.atten)
        } else {
          that.setData({
            atten: '0'
          })

        }
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
  },
  // 分享
  onShareAppMessage: function() {
    // 实现分享功能
    return {

      title: '捷依',

      desc: '分享小程序捷依',

      path: '/pages/Vehicle_position/Vehicle_position?url='

    }

  },
  // 获取关注状态
  attenStatu: function (vehicleIds) {
    let that=this
    wx.request({
      url: 'https://www.123gps.com.cn/app/appAttention/query?token=' + this.data.token + '&vehicleid=' + vehicleIds,
      header: {
        'content-type': 'application/xml'
      },

      success(res) {
        console.log(res.data.msg)
        let length = res.data.msg.length
        for(var i=0;i<length;i++){
          console.log(res.data.msg[i].vehicleid == parseFloat(vehicleIds))
          if (res.data.msg[i].vehicleid == parseFloat(vehicleIds)){
            that.setData({
              atten:'1'
            })
            return
          }else{
            that.setData({
              atten: '0'
            })
          }
        }
      }
    })

  },
  // 获取车辆位置信息 
  vehicle: function(vehicleIds) {
    
    let that = this
    wx.request({
      url: 'https://www.123gps.com.cn/app/vehicleNowstatusinfo/monitorList?token=' + this.data.token + '&vehicleIds=' + vehicleIds,
      header: {
        'content-type': 'application/xml'
      },

      success(res) {

        that.setData({
          vehicleId: res.data.msg.list[0].vehicleId,
          allInfo: res.data.msg,
          longitude: res.data.msg.list[0].longitude,
          latitude: res.data.msg.list[0].latitude,
          markers: [{
              iconPath: "image/pig_Positioning@3x.png",
              // zIndex: 20,
              id: 0,
              longitude: res.data.msg.list[0].longitude,
              latitude: res.data.msg.list[0].latitude,
              width: 40,
              height: 80,

              // label: {
              //   content: '我是这个气泡1',
              //   fontSize: 14,
              //   color: '#ffffff',
              //   bgColor: '#000000',
              //   padding: 8,
              //   borderRadius: 4,
              //   boxShadow: '4px 8px 16px 0 rgba(0)'
              // }
            }
            // 多个点标记
          ]
        })
        // if (res.data.msg.list[0].status){
        //   that.setData({
        //     markers: [{
        //       iconPath: "image/pig_Positioning@3x.png",
        //       id: 0,
        //       longitude: res.data.msg.list[0].longitude,
        //       latitude: res.data.msg.list[0].latitude,
        //       width: 40,
        //       height: 80
        //     }
        //     ]
        //   })
        // }
        
        console.log(res.data.msg)
      }
    })
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
  // 跳往查询温度界面
  temperature:function(){
    console.log(this.data.allInfo.list[0].vehicleId)
    let vehicleId = this.data.allInfo.list[0].vehicleId
    let vehicleNo = this.data.allInfo.list[0].vehicleNo
    wx.navigateTo({
      url: '../timing/timing?vehicleId=' + vehicleId +'&vehicleNo='+vehicleNo,
    })
  },
  // 跳往查询里程界面
  mileage: function () {
    console.log(this.data.allInfo.list[0].vehicleId)
    let vehicleId = this.data.allInfo.list[0].vehicleId
    let vehicleNo = this.data.allInfo.list[0].vehicleNo
    wx.navigateTo({
      url: '../mileageTime/mileageTime?vehicleId=' + vehicleId + '&vehicleNo=' + vehicleNo,
    })
  },
  // 跳往查询超温界面
  Overtemperature: function () {
    console.log(this.data.allInfo.list[0].vehicleId)
    let vehicleId = this.data.allInfo.list[0].vehicleId
    let vehicleNo = this.data.allInfo.list[0].vehicleNo
    wx.navigateTo({
      url: '../OvertemperatureTime/OvertemperatureTime?vehicleId=' + vehicleId + '&vehicleNo=' + vehicleNo,
    })
  },
  // 跳往查询轨迹界面
  trajectory: function() {
    console.log(this.data.allInfo.list[0].vehicleId)
    let vehicleId = this.data.allInfo.list[0].vehicleId
    let vehicleNo = this.data.allInfo.list[0].vehicleNo
    wx.navigateTo({
      url: '../Historical/Historical?vehicleId=' + vehicleId + '&vehicleNo=' + vehicleNo,
    })
  }
})