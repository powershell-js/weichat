// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_back:false,
    edit:false,
    width:3000,
    image_num:0,
    url_data: [
      
    ],
    url_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
   wx.getStorage({
     key:"image",
     success: function(res) {
      //  res.data[9]=null
     console.log(res)
     that.setData({
       url_data: res.data
     })
       wx.setStorage({
         key: 'image',
         data: that.data.url_data,
       })
     },
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
  // 添加或删除
  show_image:function(option){
    let that = this
    var up = "url_data[" + option.currentTarget.dataset.name + "].hide"
    
    let data = that.data.url_data
    let length = data.length
    let num = 0
    for (var i = 0; i < length-1; i++) {
      if (data[i].hide) {
        num++


      }
      
      
    }
    if (num > 4) {
      var up = "url_data[" + option.currentTarget.dataset.name + "].hide"
      
      if (that.data.url_data[option.currentTarget.dataset.name].hide){
        
        console.log([up])
        that.setData({
          [up]: !that.data.url_data[option.currentTarget.dataset.name].hide
        },
          wx.setStorage({
            key: 'image',
            data: that.data.url_data,
          })
        )
        return
      }else{
        wx.showToast({
          title: '最多添加5个',
          icon: '',
          image: '',
          duration: 1000,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        return
      }
    } if (num < 2) {
      
      if (!that.data.url_data[option.currentTarget.dataset.name].hide) {
        // var up = "url_data[" + option.currentTarget.dataset.name + "].hide"
        that.setData({
          [up]: !that.data.url_data[option.currentTarget.dataset.name].hide
        },
          wx.setStorage({
            key: 'image',
            data: that.data.url_data,
          })
        )
        return
      } else {
        wx.showToast({
          title: '最少1个',
          icon: '',
          image: '',
          duration: 1000,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        return
      }
    }
     
    that.setData({
      [up]: !that.data.url_data[option.currentTarget.dataset.name].hide
    })
    wx.setStorage({
      key: 'image',
      data: that.data.url_data,
    })
    console.log(that.data.url_data)
    // 设置返回页面传值
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2];//上一级页面
    prevPage.setData({
      judge: true
    })
    console.log(prevPage) 
  },
  // 编辑
  edit:function(){
    this.setData({
      edit:!this.data.edit,
      show_back: !this.data.show_back
    })
  }
})