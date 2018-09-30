import * as echarts from '../../ec-canvas/echarts';

Page({
  onShareAppMessage: function() {
    // 实现分享功能
    return {

      title: '捷依',

      desc: '分享小程序捷依',

      path: '/pages/main/main?url='

    }

  },
  // 实现分享功能
  data: {
    judge:false,
    widths:"",
    username:"",
    version:"5.0",
    data: [],
    // token: "",
    total: 0,
    run: "",
    stop: "",
    warn: "",
    excp: "",
    sum: "",
    avgmile: "",
    avgRunTime: "",
    tempData: "",
    mileData: "",
    stopData: "",
    area: "",
    ecBar: {
      lazyLoad: true // 延迟加载
    },

    ecScatter: {
      lazyLoad: true
    },
    ef: '5',
    user_width: '0',
    userinfo_show: false,
    winheight: '',
    urldata: [{
        url: '../img/dynamic-bacfground@3x.png'
      },
      {
        url: '../img/history_background@3x.png'
      },
      {
        url: '../img/mileage_background@3x.png'
      },
      {
        url: '../img/oilleaking-bacfground@3x.png'
      },
      {
        url: '../img/chaowenmingxi.png'
      },
      {
        url: '../img/overtemperature_background@3x.png'
      },
      {
        url: '../img/oystersauce-bacfground@3x.png'
      },
      {
        url: '../img/parking_background@3x.png'
      },
      {
        url: '../img/tem_background@3x.png'
      },
      {
        url: '../img/more_background@3x.png'
      }
    ],
    url_data: [{
      url: '../img/dynamic-icon@3x.png',
      name: '油量动态',
      hide: true
    },
      {
        url: '../img/history_icon@3x.png',
        name: '历史记录',
        hide: true
      },
      {
        url: '../img/mileage_icon@3x.png',
        name: '里程明细',
        hide: true
      },
      {
        url: '../img/oilleaking-icon@3x.png',
        name: '油量异常',
        hide: true
      },
      {
        url: '../img/overtem_icon@3x.png',
        name: '超温明细',
        hide: false
      },
      {
        url: '../img/oystersauce_icon@3x.png',
        name: '百公里油耗',
        hide: false
      },
      {
        url: '../img/park_icon@3x.png',
        name: '停车明细',
        hide: false
      },
      {
        url: '../img/refuelingrecord-icon@3x.png',
        name: '加油记录',
        hide: false
      },
      {
        url: '../img/tem_icon@3x.png',
        name: '温度明细',
        hide: false
      },
      {
        url: 'image/more_icon@3x.png',
        name: '更多',
        hide: true
      }
    ],
    movies: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    abc: [
      1, 2, 3, 4, 5, 6, 7, 8, 9
    ],
    checked: false,
    checkeds: false,
    num: 0,
    num1: 0,
    checkedshow: false,
    liste: ""
  },
  onLoad: function(op) {
    wx.setStorage({
      key: 'image',
      data: this.data.url_data,
    })
    console.log(op)
    this.setData({
      username: op.username,
      widths: 5*260
    })
    // 获取token
    var that = this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.homeQuery(res)
      }
    })
    wx.getSystemInfo({
      success(res) {
        console.log(res.version)
        that.setData({
          version: res.version
        })
      }
    })

  },
  //  生命周期函数--监听页面显示
  onShow: function () {
    let that=this
    if (this.data.judge){
      wx.getStorage({
        key: 'image',
        success: function (res) {
          let length = res.data.length
          let num=0
          for(var i=0;i<length;i++){
            if (res.data[i].hide){
              num++
            }
          }
          that.setData({
            url_data: res.data,
            widths: num * 260
          })
          console.log(that.data.url_data)
        }
      })
      
    }
     
  },
  // 画echarts图
  newecharts: function() {
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
        // subtext: '数量'
      },
      // 工具类x轴1条辅助线
      // tooltip: {
      //   trigger: 'axis'
      // },
      grid: {
        top:'18%',
        left: '3%',
        right: '15%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{

        type: 'category',
        data: ['运行', '停止', '报警', '异常'],
        name: '状态',
        axisLine: {
          lineStyle: {
            color: '#BABABA'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#000'
          }
        }
        //   textStyle: {

        //     color: 'red'
        // },
        // splitLine: {
        //   show: false
        // },
        // axisTick: {
        //   alignWithLabel: true
        // }
      }],
      yAxis: [{
        name: '数量',
        type: 'value',
        // axisLine: { show: false },
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: function () {
            return "";
          }
        },
        axisLine: {
          lineStyle: {
            color: '#BABABA'
          }
        }
        // splitArea: {
        //   show: true,
        // },
      }],
      series: [{
        name: '数量',
        type: 'bar',
        barWidth: 30,//柱图宽度
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
        data: [this.data.run, this.data.stop, this.data.warn, this.data.excp],
      }]
    };
  },
  // 画echarts图
  // 首页请求数据
  homeQuery: function(res) {
    var token = res.data

    var that = this
    wx.showLoading({
      title: '请耐心等待',
    })
    wx.request({
      url: 'https://www.123gps.com.cn/app/vehicleNowstatusinfo/homeQuery?token=' + token,
      header: {
        'content-type': 'application/xml'
      },

      success(res) {
        console.log(res.data.msg.total)

        wx.hideLoading()
        var data = res.data.msg
        console.log(res.data.msg.tempData)
        wx.setStorage({
          key: 'data',
          data: data,
          success: function() {

          }
        })
        let sum = res.data.msg.sum.toFixed(2)
        let avgmile = Number(res.data.msg.avgmile).toFixed(2)
        let avgRunTime = Number(res.data.msg.avgRunTime).toFixed(2)
        that.setData({
          avgmile: avgmile,
          avgRunTime: avgRunTime,
          data: data,
          total: res.data.msg.total,
          run: res.data.msg.run,
          stop: res.data.msg.stop,
          warn: res.data.msg.warn,
          excp: res.data.msg.excp,
          sum: sum,
          tempData: res.data.msg.tempData,
          mileData: res.data.msg.mileData,
          stopData: res.data.msg.stopData,
          area: res.data.msg.area
        })

        that.newecharts()
      }
    })
  },
  checks: function() {
    if (this.data.num % 2 == 0) {
      this.setData({
        checkedshow: true
      })
    } else {
      this.setData({
        checkedshow: false
      })
    }
    this.setData({
      num: this.data.num + 1
    })
  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      liste: e.detail.value.join()
    })

  },
  liSte: function(e) {
    console.log(e)
    this.setData({
      liste: e.detail.value
    })
  },
  allsel: function() {
    console.log(this.data.num1)
    if (this.data.num1 % 2 == 0) {
      this.setData({
        checked: true,
        checkeds: true
      })
      this.setData({
        liste: this.data.abc.join()
      })
    } else {
      this.setData({
        checked: false,
        checkeds: false
      })
      this.setData({
        liste: ''
      })
    }

    this.setData({
      num1: this.data.num1 + 1
    })
  },
  // 报表查询跳转
  swipe: function(e) {

    this.setData({
      ef: e.currentTarget.dataset.hi
    })
    //  转为字符串类型
    console.log((this.data.ef).toString())

    // wx.showToast({
    //   title: (this.data.ef).toString(),
    //   icon: 'succes',
    //   duration: 1000,
    //   mask: true
    // })
    if (this.data.ef == "更多") {
      wx.navigateTo({
        url: '../more/more',

      })
    }
    if (this.data.ef == "历史记录") {
      wx.navigateTo({
        url: '../Historical/Historical',

      })
    }
    if (this.data.ef == "温度明细") {
      wx.navigateTo({
        url: '../timing/timing?name='+this.data.ef,

      })
    }
    if (this.data.ef == "里程明细") {
      wx.navigateTo({
        url: '../mileageTime/mileageTime?name=' + this.data.ef,

      })
    }
    if (this.data.ef == "停车明细") {
      wx.navigateTo({
        url: '../ParkingTime/ParkingTime?name=' + this.data.ef,

      })
    }
    if (this.data.ef == "百公里油耗") {
      wx.navigateTo({
        url: '../kilometersTime/kilometersTime?name=' + this.data.ef,

      })
    }
    if (this.data.ef == "加油记录") {
      wx.navigateTo({
        url: '../RefuelingTime/RefuelingTime?name=' + this.data.ef,

      })
    }
    if (this.data.ef == "超温明细") {
      wx.navigateTo({
        url: '../OvertemperatureTime/OvertemperatureTime?name=' + this.data.ef,

      })
    }
    if (this.data.ef == "油量动态") {
      wx.navigateTo({
        url: '../dynamicsTime/dynamicsTime?name=' + this.data.ef,

      })
    }
    if (this.data.ef == "油量异常") {
      wx.navigateTo({
        url: '../abnormalityTime/abnormalityTime?name=' + this.data.ef,

      })
    }

  },
  userinfo: function() {
    this.setData({
      winheight: '100vh',
      userinfo_show: true,
      user_width: '100%'
    })
  },
  userinfo_hide: function() {
    this.setData({
      winheight: '',
      userinfo_show: false,

    })
  },
  // 跳到消息列表
  Message_list: function() {
    wx.navigateTo({
      url: '../Message_list/Message_list',
    })
  },
  // 联系我们
  Contact_us: function() {
      wx.makePhoneCall({
        phoneNumber: '400-820-4680',
        success: function() {
          wx.showToast({
            title: '拨打成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        },
        fail: function() {
          wx.showToast({
            title: '拨打失败',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }
      })
    }
    // echarts图
    // , onLoad: function (e) {

    //   var windowWidth = '', windowHeight = '';    //定义宽高
    //   try {
    //     var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
    //     windowWidth = res.windowWidth / 750 * 690;   //以设计图750为主进行比例算换
    //     windowHeight = res.windowWidth / 750 * 550    //以设计图750为主进行比例算换
    //     console.log(res)
    //   } catch (e) {
    //     console.error('getSystemInfoSync failed!');   //如果获取失败
    //   }

    //   lineChart = new wxCharts({     //定义一个wxCharts图表实例
    //     canvasId: 'lineCanvas',     //输入wxml中canvas的id
    //     type: 'column',       //图标展示的类型有:'line','pie','column','area','ring','radar'
    //     categories: ['运行', '停止', '报警', '异常', '离线'],    //模拟的x轴横坐标参数
    //     animation: false,  //是否开启动画

    //     series: [{   //具体坐标数据
    //       name: '状态',  //名字
    //       data: [ 122,90,103],  //数据点
    //       format: function (val, name) {  //点击显示的数据注释
    //         return val + 'mmHg';
    //       },


    //     }
    //     ],
    //     xAxis: {   //是否隐藏x轴分割线
    //       disableGrid: true,
    //     },
    //     yAxis: {      //y轴数据
    //       title: '数值',  //标题
    //       format: function (val) {  //返回数值
    //         return val.toFixed(2);
    //       },
    //       min: 30,   //最小值
    //       max: 180,   //最大值
    //       gridColor: '#D8D8D8',
    //     },
    //     width: windowWidth,  //图表展示内容宽度
    //     height: 200,  //图表展示内容高度
    //     dataLabel: true,  //是否在图表上直接显示数据
    //     dataPointShape: true, //是否在图标上显示数据点标志
    //     extra: {
    //       lineStyle: 'curve'  //曲线
    //     },
    //   });
    // },
    // touchHandler: function (e) {
    //   lineChart.showToolTip(e, {
    //     // background: '#7cb5ec',
    //     format: function (item, category) {
    //       return category + ' ' + item.name + ':' + item.data
    //     }
    //   });
    // },
    ,
  // echarts图
  // 修改密码
  modify: function() {
    wx.navigateTo({
      url: '../modify/modify',
    })
  },
  feedback: function() {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  Myattention: function() {
    wx.navigateTo({
      url: '../My_attention/My_attention',
    })
  },
  Edition: function() {

  },
  Allvehicles: function() {
    wx.navigateTo({
      url: '../All_vehicles/All_vehicles',
    })
  },
  Exit_logon: function() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  // 跳到排行
  tempData: function() {
    wx.navigateTo({
      url: '../Rankings/Rankings?name=周超温排行',
    })
  },
  mileData: function() {
    wx.navigateTo({
      url: '../Rankings/Rankings?name=周里程排行',
    })
  },
  stopData: function() {
    wx.navigateTo({
      url: '../Rankings/Rankings?name=周停车排行',
    })
  },
  area: function() {
    wx.navigateTo({
      url: '../Vehicle_rankings/Vehicle_rankings',
    })
  }
})