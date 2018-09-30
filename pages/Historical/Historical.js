var pickerFile = require('../../utils/picker_datetime.js')
var util = require('../../utils/util.js');
Page({
  data: {
    longitude: "116.491081",
    latitude: "40.007153 ",
    num: 0,
    duration: 1000,
    points: [],
    start: false,
    map_show: false,
    points: [],
    position1: [
      116.491081
    ],
    position2: [
      40.007153
    ],
    info_list: [],
    beginTime: "",
    endTime: "",
    vehicleId: "",
    equipment: "选择设备",
    equipmentShow: false,
    equipment_select: [
      '最近24小时',
      '最近3天',
      '最近7天',
      '自定义范围'
    ],
    date_select: [
      '最近24小时',
      '最近3天',
      '最近7天',
      '自定义范围'
    ],
    token: "",
    dateShow: false,
    date: "最近24小时",
    to: "0",
    le: "0",
    // 多个点标记

    markers: [{
        iconPath: "image/normaloperation@3x.png",

        id: 0,
        longitude: 113.3245211,
        latitude: 23.10229,
        width: 20,
        height: 20,
        rotate: 180,
        // label: {
        //   content: '我是这个气泡1',
        //   fontSize: 14,
        //   color: '#ffffff',
        //   bgColor: '#000000',
        //   padding: 8,
        //   borderRadius: 4,
        //   boxShadow: '4px 8px 16px 0 rgba(0)'
        // }
      },
      {
        iconPath: "image/normaloperation@3x.png",
        id: 1,

        longitude: 113.324520,
        latitude: 23.099994,
        width: 20,
        height: 20,
        label: {
          content: '我是这个气泡2',
          fontSize: 14,
          color: '#ffffff',
          bgColor: '#000000',
          padding: 8,
          borderRadius: 4,
          boxShadow: '4px 8px 16px 0 rgba(0)'
        }
      }
      // 多个点标记
    ],

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
    controls: [{
      id: 1,
      iconPath: 'image/park_icon拷贝@3x.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true

    }]
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
  date: function() {
    this.setData({
      // date:321,
      dateShow: true
    })
  },
  seletdate: function(res) {
    let that = this
    let date = res.currentTarget.dataset.seletdate
    
    if (date == '自定义范围') {
      wx.navigateTo({
        url: '../Time/Time',
      })
      that.setData({
        dateShow: false


      })
    } else {
      // let date = res.currentTarget.dataset.seletdate
      console.log(res.currentTarget.dataset.seletdate)
      console.log(date)
      that.setData({
        date: res.currentTarget.dataset.seletdate,
        dateShow: false
      })
      let date = res.currentTarget.dataset.seletdate
      let timestamp = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
      var time = util.formatTime(timestamp).replace(new RegExp("/", ("gm")), "-");
      // 结束时间

      // let endTime = endTimes
      let endTime = new Date()
      var endTimes = util.formatTime(endTime).replace(new RegExp("/", ("gm")), "-");
      if (res.currentTarget.dataset.seletdate == '最近24小时') {
        let starTime = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
        var starTimes = util.formatTime(starTime).replace(new RegExp("/", ("gm")), "-");
        that.setData({
          beginTime: starTimes.slice(0, 16),
          endTime: endTimes.slice(0, 16),
        })
        // console.log(that.data.endTime)
      }
      if (res.currentTarget.dataset.seletdate == '最近3天') {
        let starTime = new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
        var starTimes = util.formatTime(starTime).replace(new RegExp("/", ("gm")), "-");
        
        that.setData({
          beginTime: starTimes.slice(0, 16),
          endTime: endTimes.slice(0, 16),
        })
        // console.log(that.data.endTime)
      }
      if (res.currentTarget.dataset.seletdate == '最近7天') {
        let starTime = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
        var starTimes = util.formatTime(starTime).replace(new RegExp("/", ("gm")), "-");

        that.setData({
          beginTime: starTimes.slice(0, 16),
          endTime: endTimes.slice(0, 16),
        })
        // console.log(that.data.endTime)
      }

    }
  },
  onLoad: function(options) {
    // 初始化时间
    
    // let timestamp = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    // var time = util.formatTime(timestamp).replace(new RegExp("/", ("gm")), "-");
    // 结束时间

    // let endTime = endTimes
    let endTime = new Date()
    var endTimes = util.formatTime(endTime).replace(new RegExp("/", ("gm")), "-");
    // if (res.currentTarget.dataset.seletdate == '最近24小时') {
      let starTime = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
      var starTimes = util.formatTime(starTime).replace(new RegExp("/", ("gm")), "-");
      this.setData({
        beginTime: starTimes.slice(0, 16),
        endTime: endTimes.slice(0, 16),
      })
    // 初始化时间
    if (options.vehicleId) {
      this.setData({
        vehicleId: options.vehicleId,
        equipment: options.vehicleNo
      })
      console.log(1)
    }
    //获取时间
    // //获取时间
    // this.datetimePicker = new pickerFile.pickerDatetime({
    //   page: this,
    //   animation: 'slide',
    //   duration: 500
    // });


    // 获取token
    var that = this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          token: res.data
        })
        that.allId()


      }
    })
  },
  // 获取用户所有车辆的id信息
  allId: function() {
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
        console.log(vehicleIds)
        // that.alldetail(vehicleIds.join())
      }
    })
  },
  // 历史轨迹查询
  track: function() {
    console.log(this.data.markers[0].latitude, this.data.markers[0].latitude.longitude)
    let that = this
    let points = []
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: 'https://123gps.com.cn/app/historyTrack/list',
      data: {
        token: that.data.token,
        beginTime: that.data.beginTime,
        endTime: that.data.endTime,
        vehicleId: that.data.vehicleId,
        spaceInterval: '100',
        timeInterval: '600',
        hasLocation: '1'
      },
      method: "GET",
      header: {
        'content-type': 'application/xml'
      },

      success(res) {
        // 控制信息显隐

        wx.hideLoading()
        let position1 = []
        let position2 = []
        let date=[]
        let length = res.data.msg.track_info.length
        for (var i = 0; i < length; i++) {
          position1[i] = (res.data.msg.track_info[i].split('|')[2]).split(',')[0]
          position2[i] = (res.data.msg.track_info[i].split('|')[2]).split(',')[1]
          points[i] = {
            longitude: position1[i],
            latitude: position2[i]
          }



        }
        // 使所有的经纬度点坐标都能显示在视野内
        that.mapCtx.includePoints({
          padding: [10],
          points: points
        })
        console.log(points)
        that.setData({
          polyline: [{
            points: points,
            // 历史轨迹线
            color: "#FF0000DD",
            width: 3,
            dottedLine: false
          }],
        })
        that.setData({
          points: points,
          map_show: true,
          info_list: res.data.msg,
          position1: position1,
          position2: position2

        })
        // 起始点标记
        console.log(position1[0])

        let markers = [{
            // iconPath: "image/normaloperation@3x.png",
            id: 4,

            longitude: position1[0],
            latitude: position2[0],
            width: 20,
            height: 20,
            label: {
              content: '起点',
              fontSize: 14,
              color: '#ffffff',
              bgColor: '#000000',
              padding: 8,
              borderRadius: 4,
              boxShadow: '4px 8px 16px 0 rgba(0)'
            }
          },
          {
            // iconPath: "image/normaloperation@3x.png",
            id: 5,

            longitude: position1[length - 1],
            latitude: position2[length - 1],
            width: 20,
            height: 20,
            label: {
              content: '终点',
              fontSize: 14,
              color: '#ffffff',
              bgColor: '#000000',
              padding: 8,
              borderRadius: 4,
              boxShadow: '4px 8px 16px 0 rgba(0)'
            }
          },
          {
            iconPath: "image/normaloperation@3x.png",

            id: 0,
            longitude: position1[0],
            latitude: position2[0],
            width: 20,
            height: 20,
            rotate: 180,
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
          // {
          //   iconPath: "image/normaloperation@3x.png",
          //   id: 1,

          //   longitude: 113.324520,
          //   latitude: 23.099994,
          //   width: 20,
          //   height: 20,
          //   label: {
          //     content: '我是这个气泡2',
          //     fontSize: 14,
          //     color: '#ffffff',
          //     bgColor: '#000000',
          //     padding: 8,
          //     borderRadius: 4,
          //     boxShadow: '4px 8px 16px 0 rgba(0)'
          //   }
          // }
        ]
        that.setData({
          markers: markers
        })
      }
    })

  },
  // markers在线上移动
  includePoints: function() {
    console.log(this.data.duration)
    let that = this
    let length = this.data.points.length


    // console.log(that.data.points)
    let pointers = that.data.points[this.data.num]
    // 使标记markers可以移动  要在onready内定义mapCtx
    if (this.data.start) {
      that.setData({
        longitude: pointers.longitude,
        latitude: pointers.latitude
      })
      that.mapCtx.translateMarker({

        markerId: 0,
        autoRotate: true,
        duration: that.data.duration,
        destination: {
          longitude: pointers.longitude,
          latitude: pointers.latitude,
        },
        complete() {
          // console.log(i)
        },
        animationEnd: function() {
          that.includePoints()
          that.setData({
            num: that.data.num + 1
          })

        }

      })

    } else {
      // console.log(i)
    }


  },
  onReady: function(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
    // this.mapCtx.translateMarker({
    //   markerId: 0,
    //   autoRotate: true,
    //   duration: 1000,
    //   destination: {
    //     latitude: 23.10229,
    //     longitude: 113.3345211,
    //   },
    //   animationEnd() {
    //     console.log('animation end')
    //   }
    // })
  },

  // 根据车辆id获取用户所有车辆的详细信息
  // alldetail: function(vehicleIds) {
  //   let that = this
  //   wx.request({
  //     url: 'https://www.123gps.com.cn/app/vehicleNowstatusinfo/monitorList?token=' + this.data.token + '&vehicleIds=' + vehicleIds,
  //     header: {
  //       'content-type': 'application/xml'
  //     },
  //     data:{

  //     },
  //     method:"GET",
  //     success(res) {
  //       console.log(res.data.msg)
  //       that.setData({
  //         allInfo: res.data.msg
  //       })

  //     }
  //   })
  // },
  equipment: function() {
    this.setData({
      // date:321,
      equipmentShow: true
    })
  },
  seletequipment: function(op) {
    console.log(op.currentTarget.dataset.seletdate)
    let date = op.currentTarget.dataset.seletdate
    let that = this
    if (date == '自定义范围') {
      wx.navigateTo({
        url: '../Time/Time',
      })
      that.setData({
        equipmentShow: false
      })
    } else {

      that.setData({
        equipment: date,
        equipmentShow: false,
        vehicleId: op.currentTarget.dataset.id
      })


    }
  },
  // 查询
  submit: function() {
    this.track()
    console.log(this.data.date, this.data.vehicleId)
  },
  // 控制开始
  start: function() {
    this.setData({
      start: !this.data.start
    })
    this.includePoints()
  },
  Left_forward: function() {
    if (this.data.duration > 2000) {
      wx.showToast({
        title: '达到最小速度',
      })
      this.setData({
        duration: 2000
      })
    } else {
      this.setData({
        duration: this.data.duration + 100
      })
    }

  },
  Right_forward: function() {
    if (this.data.duration < 10) {
      wx.showToast({
        title: '达到最大速度',
      })
      this.setData({
        duration: 10
      })
    } else {
      this.setData({
        duration: this.data.duration - 100
      })
    }

  },
  // 下载
  download: function() {
    var info = {
      name: "历史查询",
      vehicleId: this.data.vehicleId,
      beginTime: this.data.beginTime,
      endTime: this.data.endTime
    }
    info = JSON.stringify(info);
    wx.navigateTo({
      url: '../download/download?info=' + info,
    })
  },
  // 明细表
  jump_detail: function() {

    let info = JSON.stringify(this.data.info_list)
    wx.navigateTo({
      url: '../Historical_details/Historical_details?info=' + info,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })


    // let that=this
    // wx.request({
    //   url: 'https://123gps.com.cn/app/tc01/getList',
    //   data: {
    //     token: that.data.token,
    //     beginTime: that.data.beginTime,
    //     endTime: that.data.endTime,
    //     vehicleId: that.data.vehicleId,
    //     spaceInterval: '100',
    //     currentPage: '1',
    //     method: 'listVehicleTrack',
    //     page: '1',
    //     rows: '30'
    //   },
    //   method: "GET",
    //   header: {
    //     'content-type': 'application/xml'
    //   },

    //   success(res) {
    //     // 
    //     wx.request({
    //       url: 'https://www.123gps.com.cn/app/vehiclestopdetailinfo/getStopAccOffDetailInfo',
    //       data: {
    //         'token': that.data.token,
    //         'beginDate': that.data.beginTime,
    //         'endDate': that.data.endTime,
    //         'vehicleId': that.data.vehicleId,
    //         'page': '1',
    //         'rows': '30',
    //         'point': 'no',
    //         'isNeedHoliday': '0'
    //       },
    //       method: 'GET',
    //       header: {
    //         'content-type': 'application/xml'
    //       },

    //       success(ress) {
    //         console.log(res)
            
    //       }
    //     })
    //     // 
    //     console.log(res)
    //     let info = JSON.stringify(res.data.msg)
    //       wx.navigateTo({
    //         url: '../Historical_details/Historical_details?info='+info,
    //         success: function(res) {},
    //         fail: function(res) {},
    //         complete: function(res) {},
    //       })
    //   }
    // })
  }
})