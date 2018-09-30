// pages/Rankings/Rankings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"周超温排行",
    License:{},
    Lengthtime:[],
    mileData:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.name
    })
    
    var that = this
    wx.getStorage({
      key: 'data',
      success: function (res) {
        console.log(res.data)
        // setTimeout(function(){

        // })
        if (options.name == '周超温排行') {
          that.setData({
            License: res.data.tempData
          })
          console.log(that.data.License)
        }
        if (options.name == '周里程排行') {
          
          let length = res.data.mileData.length
          let License=[]
          let info=''
          for(var i=0;i<length;i++){
            info = Number(res.data.mileData[i].rankMile).toFixed(1)
            License.push(info)
          }
          console.log(License)
          that.setData({
            License: res.data.mileData,
            mileData: License
          })
          console.log(that.data.License)
        }
        if (options.name == '周停车排行') {
          that.setData({
            License: res.data.stopData
          })
          console.log(that.data.License)
        }
        
      }
    })
    wx.setNavigationBarTitle({
      title: options.name
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