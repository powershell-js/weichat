var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();
// alert(year+'年'+month+'月'+day+'日 '+hour':'+minute+':'+second)



Page({
  data: {
    tokenS: null,
    index: 0,
    datestart: year + '-' + month + '-' + day,//开始年月日
    times: hour + ':' + minute,//开始时分
    dates: year + '-' + month + '-' + day,//结束年月日
    time: hour + ':' + minute//结束时分
  },
  onLoad: function (options) {

    var that = this;
    this.setData({
      tokenS: options.token
    });
    console.log('456', options);
    wx.setStorage({
      key: "shijian",
      data: that.data
    });
  },
  bindPickerChange: function (e) {
    var that = this;
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      index: e.detail.value
    })
  },
  bindDateChanges: function (e) {
    var that = this;
    //  console.log("年月日",e);
    //  console.log(year+'-'+month+'-'+day+'-');

    that.setData({
      datestart: e.detail.value
    })
  },
  bindDateChange: function (e) {
    var that = this;
    console.log("年月日", e);
    console.log(year + '-' + month + '-' + day + '-');
    that.setData({
      dates: e.detail.value
    })
  },

  bindTimeChanges: function (e) {
    var that = this;
    console.log("分秒", e);
    that.setData({
      times: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    console.log("分秒", e);
    this.setData({
      time: e.detail.value
    })
  },
  startOk: function (e) {
    // var that = this;
    // console.log('111', e);
    // wx.navigateTo({
    //   url: '../mapTrajectory/mapTrajectory?datestart=' + that.data.datestart + "%20" + '&times=' + that.data.times + '&date=' + that.data.dates + "%20" + '&time=' + that.data.time + "&token=" + that.data.tokenS
    //   //  url: '../mapTrajectory/mapTrajectory?token=' + that.data.tokenS + '%20&times=' + that.data.times + '&date=' + that.data.dates + '%20&time=' + that.data.time + "&datestart=" + that.data.datestart 

    // })
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    console.log(this.data.datestart + ' ' + this.data.times, this.data.dates + ' ' + this.data.time)
    prevPage.setData({//直接给上移页面赋值
      beginTime: this.data.datestart + ' ' + this.data.times,
      endTime: this.data.dates + ' ' + this.data.time,
      date: this.data.datestart + ' ' + this.data.times + this.data.dates + ' ' + this.data.time,
      value_date: this.data.datestart + ' ' + this.data.times+this.data.dates + ' ' + this.data.time,
      
    });
    wx.navigateBack({
      
    })

  },
  stopCancel: function (e) {
    wx.navigateBack({

    })
  }
})