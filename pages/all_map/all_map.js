// pages/all_map/all_map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[
      {
      id:'1',
      latitude: "23.099994",
      longitude:"113.324520",
      title:"这是一个标注点",
      clickable:true
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sendInfo = JSON.parse(options.sendInfo)
    console.log(sendInfo)
    let title = "所有车辆(" + sendInfo.total+")"
    wx.setNavigationBarTitle({
      title: title//页面标题为路由参数
    })
    this.marker(sendInfo)
  },
  // 添加点标记
  marker: function (sendInfo){
    let that=this
    let data = sendInfo.list
    
    let length = data.length
    let markers=[]
    // markers[0].id=1
    
    for(var i=0;i<length;i++){
      if (data[i].status == 1) {
        markers.push(
          {
            id: data[i].vehicleId,
            iconPath: "image/normaloperation@3x.png",
            width: 30,
            height: 30,
            longitude: data[i].longitude,
            latitude: data[i].latitude,
            // title: data[i].vehicleNo,
            clickable: true,
            label: {
              content: data[i].vehicleNo,
              bgColor: '#fff',
              display: 'ALWAYS',
              anchorX: -10,
              anchorY: -50,
              borderRadius: 5
            }
          }
        )
       }
      if (data[i].status == 2) { 
        markers.push(
          {
            id: data[i].vehicleId,
            iconPath: "image/stopvehicle@3x.png",
            width: 30,
            height: 30,
            longitude: data[i].longitude,
            latitude: data[i].latitude,
            // title: data[i].vehicleNo,
            clickable: true,
            label: {
              content: data[i].vehicleNo,
              bgColor: '#fff',
              display: 'ALWAYS',
              anchorX: -10,
              anchorY: -50,
              borderRadius: 5
            }
          }
        )
      }
      if (data[i].status == 3) {
        markers.push(
          {
            id: data[i].vehicleId,
            iconPath: "image/alarmvehicle@3x.png",
            width: 30,
            height: 30,
            longitude: data[i].longitude,
            latitude: data[i].latitude,
            // title: data[i].vehicleNo,
            clickable: true,
            label: {
              content: data[i].vehicleNo,
              bgColor: '#fff',
              display: 'ALWAYS',
              anchorX: -10,
              anchorY: -50,
              borderRadius: 5
            }
          }
        )
       }
      if (data[i].status==4){
        markers.push(
          {
            id: data[i].vehicleId,
            iconPath: "image/abnormalvehicle@3x.png",
            width: 30,
            height: 30,
            longitude: data[i].longitude,
            latitude: data[i].latitude,
            // title: data[i].vehicleNo,
            clickable: true,
            label: {
              content: data[i].vehicleNo,
              bgColor: '#fff',
              display: 'ALWAYS',
              anchorX: -10,
              anchorY: -50,
              borderRadius: 5
            }
          }
        )
      }
      
      
    }
    
    that.setData({
      markers: markers
    })
    console.log(that.data.markers)
  },
  controltap:function(e){
    console.log(e.markerId)
  },
  markertap:function(res){
    console.log(res.markerId)
    wx.navigateTo({
      url: '../Vehicle_position/Vehicle_position?vehicleId=' + res.markerId,
      // url: '../test/test',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
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