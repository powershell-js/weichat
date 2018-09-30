// import * as echarts from '../../ec-canvas/echarts';

// const app = getApp();



import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    widths:"",
    heights:"",
    ecBar: {
      lazyLoad: true // 延迟加载
    },

    ecScatter: {
      lazyLoad: true
    }
  },
  onLoad() {
    var that=this
    wx.getSystemInfo({
      success(res) {
        
        that.setData({
          widths:res.screenWidth,
          heights: res.screenHeight
        })
        console.log(that.data.widths)
      }
    });

    this.barComponent = this.selectComponent('#mychart-dom-multi-bar');
    // this.scaComponnet = this.selectComponent('#mychart-dom-multi-scatter');
    this.init_bar();

    // this.init_sca();
  },
  init_bar: function() {
    this.barComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(this.getBarOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  getBarOption: function() {
    //return 请求数据
    return {
      title: {
        // text: '某地区降水量',
        subtext: '数量'
      },

      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '15%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{

        type: 'category',
        data: ['运行', '停止', '报警', '异常', '离线'],
        name: '状态',
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
        splitLine: {
          show: false
        },
        splitArea: {
          show: true,
        },
      }],
      series: [{
        name: '数量',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        itemStyle: {
          normal: {
            // 随机显示
            //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

            // 定制显示（按顺序）
            color: function(params) {
              var colorList = ['#01C6DD', '#CDCDCD', '#FF2C4E', '#5867C2', '#FF9042'];
              return colorList[params.dataIndex]
            }
          },
        },
        data: [20, 12, 8, 11, 9],
      }]
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
      animationDelay: function(idx) {
        return idx * 50;
      },
      animationEasing: 'elasticOut'
    };
  },

});