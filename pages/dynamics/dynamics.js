
import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    token:"",
    page:"1",
    vehicleId: "",
    beginTime: "",
    endTime: "",
    heigh: "",
    alldata: [],
    widths: "",
    heights: "",
    ecBar: {
      lazyLoad: true // 延迟加载
    },

    ecScatter: {
      lazyLoad: true
    }
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      token: options.token,
      vehicleId: options.vehicleId,
      beginTime: options.startTime,
      endTime: options.endTime,
    })
    console.log(options)
    let that = this
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: 'https://123gps.com.cn/app/vehicleoilchangeinfo/getOilChangeDetailInfo',
      data: {
        token: options.token,
        beginTime: options.startTime,
        endTime: options.endTime,
        vehicleId: options.vehicleId,
        timeInterval: '180',
        showPosition:true,
        page: that.data.page,
        rows:3000
        // hasLocation: '1'
      },
      method: "GET",
      header: {
        'content-type': 'application/xml'
      },

      success(res) {
        console.log(res.data.msg)
        that.setData({
          alldata: res.data.msg
        })
        var length = res.data.msg.rows.length * 100
        that.setData({
          heigh: length
        })
        // wx.hideLoading()
        //  画图
        // 
        console.log(that.data.alldata)
        wx.getSystemInfo({
          success(res) {

            that.setData({
              widths: res.screenWidth,
              heights: res.screenHeight
            })
            console.log(that.data.widths)
          }
        });
        wx.request({
          url: 'https://123gps.com.cn/app/vehicleoilchangeinfo/getOilChangeDetailTrendAnalyze',
          data: {
            token: options.token,
            beginTime: options.startTime,
            endTime: options.endTime,
            vehicleId: options.vehicleId,
            timeInterval: '180'
            // hasLocation: '1'
          },
          method: "GET",
          header: {
            'content-type': 'application/xml'
          },

          success(res) {
            // console.log(res.data.msg)
            // that.setData({
            //   alldata: res.data.msg
            // })
            // var length = res.data.msg.rows.length * 100
            // that.setData({
            //   heigh: length
            // })
            wx.hideLoading()
            //  画图
            // 
            // console.log(that.data.alldata)
            // wx.getSystemInfo({
            //   success(res) {

            //     that.setData({
            //       widths: res.screenWidth,
            //       heights: res.screenHeight
            //     })
            //     console.log(that.data.widths)
            //   }
            // });


            // this.scaComponnet = this.selectComponent('#mychart-dom-multi-scatter');
            let length = res.data.msg.rows.length
            let min = res.data.msg.rows[0].oil
            let max = res.data.msg.rows[0].oil
            for (var i = 0; i < length; i++) {
              if (min > res.data.msg.rows[i].oil) {
                min = res.data.msg.rows[i].oil
              } if (max < res.data.msg.rows[i].oil) {
                max = res.data.msg.rows[i].oil
              }
            }
            that.init_bar(res.data.msg, min, max);

            // this.init_sca();
            // 画图
          }
        })
      }
    })
    
    that.barComponent = this.selectComponent('#mychart-dom-multi-bar');
  },
  init_bar: function (data, min, max) {
    this.barComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(this.getBarOption(data, min, max));
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  getBarOption: function (data, min, max) {
    //return 请求数据
    console.log(min, max)
    return {
      
      // title: {
      //   text: '某地区降水量',
      //   subtext: '数量'
      // },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          animation: false,
          // label: {
          //   backgroundColor: '#ccc',
          //   borderColor: '#aaa',
          //   borderWidth: 1,
          //   shadowBlur: 0,
          //   shadowOffsetX: 0,
          //   shadowOffsetY: 0,
          //   textStyle: {
          //     color: '#222'
          //   }
          }
      },
      grid: {
        top: "3%",
        left: '8%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [{

        type: 'category',
        data: (function () {
          var list = [];
          console.log(data.rows.length)
          var length = data.rows.length
          for (var i = 0; i < length; i++) {
            list.push(data.rows[i].gpsTime);
          }
          return list;
        })(),
        // name: '状态',
        //   textStyle: {

        //     color: 'red'
        // },
        splitLine: {
          show: false
        },
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{

        type: 'value',
        min: min,
        max: max,
        splitLine: {
          show: false
        },
        splitArea: {
          show: true,
        },
      }],
      series: [{
        name: '数量',
        type: 'line',
        // label: {
        //   normal: {
        //     show: false,
        //     position: 'top'
        //   }
        // },
        smooth: true,
        itemStyle: {
          normal: {
            color: '#75DB86',
            // 随机显示
            //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

            // 定制显示（按顺序）
            // color: function (params) {
            //   var colorList = ['#01C6DD', '#CDCDCD', '#FF2C4E', '#5867C2', '#FF9042'];
            //   return colorList[params.dataIndex]
            // }
          },
        },
        data: (function () {
          var list = [];
          console.log(data.rows.length)
          var length = data.rows.length
          for (var i = 0; i < length; i++) {
            list.push(data.rows[i].oil);
          }
          return list;
        })()
        // return[-20, -12, -8, -11, 9],
      }]
    };
  },
  getScaOption: function () {
    //请求数据
    var data = [];
    var data2 = [];

    for (var i = 0; i < 10; i++) {
      data.push(
        [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 40)
        ]
      );
      data2.push(
        [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100)
        ]
      );
    }

    var axisCommon = {
      axisLabel: {
        textStyle: {
          color: '#C8C8C8'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#fff'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#C8C8C8'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#C8C8C8',
          type: 'solid'
        }
      }
    };

    return {
      color: ["#FF7070", "#60B6E3"],
      backgroundColor: '#eee',
      xAxis: axisCommon,
      yAxis: axisCommon,
      legend: {
        data: ['aaaa', 'bbbb']
      },
      visualMap: {
        show: false,
        max: 100,
        inRange: {
          symbolSize: [20, 70]
        }
      },
      series: [{
        type: 'scatter',
        name: 'aaaa',
        data: data
      },
      {
        name: 'bbbb',
        type: 'scatter',
        data: data2
      }
      ],
      animationDelay: function (idx) {
        return idx * 50;
      },
      animationEasing: 'elasticOut'
    };
  },
  // 导出
  dowload: function (e) {
    var info = {
      name: "油量动态",
      vehicleId: this.data.vehicleId,
      beginTime: this.data.beginTime,
      endTime: this.data.endTime
    }
    info = JSON.stringify(info);
    wx.navigateTo({
      url: '../download/download?info=' + info,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(9)
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    let num = this.data.page + 1
    console.log(this.data.page, num)
    this.setData({
      page: num
    })

    // console.log(options)
    wx.request({
      url: 'https://123gps.com.cn/app/vehicleoilchangeinfo/getOilChangeDetailInfo',
      data: {
        token: that.data.token,
        beginTime: that.data.startTime,
        endTime: that.data.endTime,
        vehicleId: that.data.vehicleId,
        timeInterval: '180',
        showPosition: true,
        page: that.data.page,
        rows: 25
        // hasLocation: '1'
      },
      method: "GET",
      header: {
        'content-type': 'application/xml'
      },

      success(res) {
        console.log(res.data.msg)
        if (res.data.msg.rows.length == 0) {
          wx.showToast({
            title: '暂无数据',  //标题
            icon: 'loading',  //图标，支持"success"、"loading"
            image: '',  //自定义图标的本地路径，image 的优先级高于 icon
            duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
            mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
            success: function () { }, //接口调用成功的回调函数
            fail: function () { },  //接口调用失败的回调函数
            complete: function () { } //接口调用结束的回调函数
          })
          return
        }
        that.setData({
          alldata: res.data.msg
        })
        // let mileinfo = that.data.mileinfo
        // let length = res.data.msg.rows.length
        // for (var i = 0; i < length; i++) {
        //   mileinfo.push(res.data.msg.rows[i])
        // }
        // that.setData({
        //   mileinfo: mileinfo
        // })
        // console.log(that.data.mileinfo)
      }
    })

    wx.hideLoading();
    // 页数+1
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});