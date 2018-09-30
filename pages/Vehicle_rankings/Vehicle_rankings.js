// import * as echarts from '../../ec-canvas/echarts';

// const app = getApp();



import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    // Ydata:[],
    widths: "",
    heights: "",
    ecBar: {
      lazyLoad: true // 延迟加载
    },

    ecScatter: {
      lazyLoad: true
    }
  },
  onLoad() {
    var that = this
    wx.getSystemInfo({
      success(res) {

        that.setData({
          widths: res.screenWidth,
          heights: res.screenHeight
        })
        console.log(that.data.widths)
      }
    });

    this.barComponent = this.selectComponent('#mychart-dom-multi-bar');
    // this.scaComponnet = this.selectComponent('#mychart-dom-multi-scatter');
    
    //return 请求数据
    var that = this
    wx.getStorage({
      key: 'data',
      success: function (res) {
        
        // that.setData({
        //   Ydata: res.data.area
        // })
        var Ydata=[]
        var Xdata=[]
        var length = res.data.area.length
        for (var i = 0; i < length;i++){
          Ydata.push(res.data.area[i].pro)
          Xdata.push(res.data.area[i].num)
        }
        that.init_bar(Ydata, Xdata);
        console.log(Ydata)
      }
    })

    // this.init_sca();
  },
  init_bar: function (Ydata, Xdata) {
    this.barComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      
      barChart.setOption(this.getBarOption(Ydata, Xdata));
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  getBarOption: function (Ydata, Xdata) {
    
    
    return {

      grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        name: "台",
        type: 'value',
        // boundaryGap: [0, 1],
        position: 'top'
      },
      yAxis: {

        type: 'category',
        data: Ydata
      },
      series: [

        {
          name: '2011年',
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#4ad2ff'
            }
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#000'
              }
            }
          },
          data: Xdata
        }
      ]
    };
  },
  getScaOption: function() {
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
          color: '#00C5DC'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#fff'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#00C5DC'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#00C5DC',
          type: 'solid'
        }
      }
    };

    return {
      color: ["#00C5DC", "#00C5DC"],
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
      animationDelay: function(idx) {
        return idx * 50;
      },
      animationEasing: 'elasticOut'
    };
  },

});