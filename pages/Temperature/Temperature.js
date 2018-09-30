
import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    vehicleId: "",
    beginTime: "",
    endTime:"",
    heigh:"",
    alldata:[],
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
    this.setData({
      vehicleId: options.vehicleId,
      beginTime: options.startTime,
      endTime: options.endTime,
    })
    console.log(options)
    let that=this
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: 'https://123gps.com.cn/app/vehicletmpdetailinfo/getTmpDetaildzInfo',
      data:{
          token: options.token,
          startTime:options.startTime,
          endTime:options.endTime,
          vehicleId:options.vehicleId,
          timeInterval:options.timeInterval,
          hasLocation:'1'
      },
      method:"GET",
      header: {
        'content-type': 'application/xml'
      },

      success(res) {
        console.log(res.data.msg)
        that.setData({
          alldata: res.data.msg
        })
        var length = res.data.msg.rows.length*100
        that.setData({
          heigh:length
        })
        wx.hideLoading()
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

        
        // this.scaComponnet = this.selectComponent('#mychart-dom-multi-scatter');
        that.init_bar(res.data.msg);

    // this.init_sca();
      // 画图
      }
    })
    that.barComponent = this.selectComponent('#mychart-dom-multi-bar');
  },
  init_bar: function (data) {
    this.barComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(this.getBarOption(data));
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  getBarOption: function (data) {
    //return 请求数据
    return {
      // title: {
      //   text: '某地区降水量',
      //   subtext: '数量'
      // },

      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top:"3%",
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
        min: data.minTemps,
        max: data.maxTemps,
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
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
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
            list.push(data.rows[i].tmp1);
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
      name: "温度明细",
      vehicleId: this.data.vehicleId,
      beginTime: this.data.beginTime,
      endTime: this.data.endTime
    }
    info = JSON.stringify(info);
    wx.navigateTo({
      url: '../download/download?info=' + info,
    })
 }
});