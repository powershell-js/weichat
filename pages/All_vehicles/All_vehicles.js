// pages/All_vehicles/All_vehicles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reg: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    widths:"10",
    heights:"10",
    sendInfo:[],
    searchShow:false,
    total:"",
    runnum: "",
    stopnum: "",
    warnnum: "",
    exatnum: "",
    search: "",
    titleShow: "0",
    dataname: '所有',
    token: "",
    listInfo: [],
    // 所有信息
    allInfo: [],
    allInfo_data: [],
    // 运行信息
    runInfo: [],
    // 停止信息
    stopInfo: [],
    // 报警信息
    warnInfo: [],
    // 异常信息
    extInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    let aa ='京F92633'
    console.log(reg.test(aa))
    console.log(1)
    // 动态修改导航栏的标题
    wx.setNavigationBarTitle({
      title: '所有车辆'
    })
    // 获取token
    var that = this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          token: res.data,
          reg:reg
        })
        that.allId()


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
  // 获取用户所有车辆的id信息
  allId: function() {
    var that = this
    wx.request({
      url: 'https://www.123gps.com.cn/app/vehicleSingleList?token=' + this.data.token,
      header: {
        'content-type': 'application/xml'
      },

      success(res) {
        console.log(res.data.msg)
        let vehicleIds = []
        let lengths = res.data.msg.length
        for (var i = 0; i < lengths; i++) {
          vehicleIds.push(res.data.msg[i].id)
        }
        console.log(vehicleIds.join())
        that.alldetail(vehicleIds.join())
      }
    })
  },
  // 根据车辆id获取用户所有车辆的详细信息
  alldetail: function(vehicleIds) {
    let that = this 
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: 'https://www.123gps.com.cn/app/vehicleNowstatusinfo/monitorList?token=' + this.data.token + '&vehicleIds=' + vehicleIds,
      header: {
        'content-type': 'application/xml'
      },

      success(res) {
        wx.hideLoading()
        // console.log(res.data.msg)
        //   let runnum=0
        //   let stopnum=0
        //   let warnnum=0
        //   let exatnum=0
        //   let length = res.data.msg.total
        // for (var i = 0; i < length; i++) {
        //   if (res.data.msg.list[i].status==1){
        //     runnum++
        //   }
        //   if (res.data.msg.list[i].status == 2) {
        //     stopnum++
        //   }
        //   if (res.data.msg.list[i].status == 3) {
        //     warnnum++
        //   }
        //   if (res.data.msg.list[i].status == 4) {
        //     exatnum++
        //   }
        // }
        that.setData({
          total: res.data.msg.total,
          allInfo: res.data.msg,
          sendInfo: res.data.msg,
          // allInfo_data: res.data.msg.list,
          // runnum: runnum,
          // stopnum: stopnum,
          // warnnum: warnnum,
          // exatnum: exatnum
        })
        console.log(that.data.total)
      }
    })
  },
  // 模糊查询
  // search_value: function(e) {
  //   console.log(e.detail.value)
  //   this.setData({
  //     search: e.detail.value
  //   })
  // },
  // search: function() {
  //   let that = this
  //   let date = []
  //   let runnum = 0
  //   let stopnum = 0
  //   let warnnum = 0
  //   let exatnum = 0
  //   let length = this.data.allInfo.total
  //   for (var i = 0; i < length; i++) {

  //     let arr = this.data.allInfo.list[i].vehicleNo
  //     let array = this.data.search
  //     if (arr.indexOf(array) > 0) {
  //       date.push(this.data.allInfo.list[i])
  //       if (this.data.allInfo.list[i].status == 1) {
  //         runnum++
  //       }
  //       if (this.data.allInfo.list[i].status == 2) {
  //         stopnum++
  //       }
  //       if (this.data.allInfo.list[i].status == 3) {
  //         warnnum++
  //       }
  //       if (this.data.allInfo.list[i].status == 4) {
  //         exatnum++
  //       }
  //     }
  //   }
  //   console.log(!this.data.search)
  //   if (!this.data.search){
  //     this.onLoad()
  //     return
  //   }
    
    
  //   that.setData({
  //     allInfo_data: date,
  //     runnum: runnum,
  //     stopnum: stopnum,
  //     warnnum: warnnum,
  //     exatnum: exatnum
  //   })
  //   if (date.length==0){
  //     wx.showToast({
  //       title: '暂无数据',  //标题
  //       icon: 'loading',  //图标，支持"success"、"loading"
  //       image: '',  //自定义图标的本地路径，image 的优先级高于 icon
  //       duration: 1500, //提示的延迟时间，单位毫秒，默认：1500
  //       mask: false
  //     })
  //   }
  //   console.log(date)
  // },
  search2:function(){
    this.setData({
      searchShow: !this.data.searchShow
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

  },
  border_show: function(res) {
    console.log(res)
    let that = this
    let length = that.data.allInfo.length
    let runcomu = []
    let stopcomu = []
    let warncomu = []
    let extcomu = []
    this.setData({
      dataname: res.currentTarget.dataset.name
    })
    // for (var i = 0; i < length; i++){
    //   if (that.data.allInfo.list[i].status==1){
    //     runcomu.push(that.data.allInfo.list[i])
    //   }
    //   if (that.data.allInfo.list[i].status == 2) {
    //     stopcomu.push(that.data.allInfo.list[i])
    //   }
    //   if (that.data.allInfo.list[i].status == 3) {
    //     warncomu.push(that.data.allInfo.list[i])
    //   }
    //   if (that.data.allInfo.list[i].status == 4) {
    //     extcomu.push(that.data.allInfo.list[i])
    //   }
    // }
    // console.log(stopcomu)
    if (this.data.dataname == '所有') {

      that.setData({
        titleShow: 0
      })
      console.log(that.data.listInfo)
    }
    if (this.data.dataname == '运行') {

      that.setData({
        titleShow: 1
      })

    }
    if (this.data.dataname == '停止') {

      that.setData({
        titleShow: 2
      })

    }
    if (this.data.dataname == '报警') {

      that.setData({
        titleShow: 3
      })

    }
    if (this.data.dataname == '异常') {

      that.setData({
        titleShow: 4
      })

    }
  },
  // 跳往车辆位置
  jumpdetail: function(res) {
    console.log(res.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../Vehicle_position/Vehicle_position?vehicleId=' + res.currentTarget.dataset.id,
    })
  },
  // 右下角的所有车辆地图
  swit:function(){
    var sendInfo = JSON.stringify(this.data.sendInfo)
    wx.navigateTo({
      url: '../all_map/all_map?sendInfo=' + sendInfo,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // move:function(res){
  //   let that=this
    
  //   that.setData({
  //     widths: res.touches[0].pageX,
  //     heights: res.touches[0].pageY
  //   })
  //   console.log(res.touches[0])
  // }
})