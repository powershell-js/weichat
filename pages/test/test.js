var amapFile = require('/libs/amap-wx.js'); //如：..­/..­/libs/amap-wx.js

var markersData = [];
Page({
      data: {
        widths: 3000,
        weather: "",
        markers: [],
        latitude: '',
        longitude: '',
        textData: {},
        downloadPercent: 0
      },
      onLoad: function() {
        wx.navigateTo({
          url: '../Vehicle_position/Vehicle_position',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        var that = this;
        var myAmapFun = new amapFile.AMapWX({
          key: '4af0431b3c68398b661cac70d4d700aa'
        });
        myAmapFun.getWeather({
          city: "武侯区",
          success: function(data) {
            //成功回调
            console.log(data);
            that.setData({
              weather: data
            })
          },
          fail: function(info) {
            //失败回调
            console.log("failed!!!!")
          }
        });
        myAmapFun.getPoiAround({
          location: '104.05,30.65', //经纬度
          success: function(data) {
            markersData = data.markers;
            that.setData({
              markers: markersData
            });
            that.setData({
              latitude: markersData[0].latitude
            });
            that.setData({
              longitude: markersData[0].longitude
            });
            that.showMarkerInfo(markersData, 0);
          },
          fail: function(info) {
            wx.showModal({
              title: info.errMsg
            })
          }
        })
      },
      showMarkerInfo: function(data, i) {
        var that = this;
        that.setData({
          textData: {
            name: data[i].name,
            desc: data[i].address
          }
        });
      },
      changeMarkerColor: function(data, i) {
        var that = this;
        var markers = [];
        markers.push(data[j]);
        that.setData({
          markers: markers
        });
      },
      makertap: function(e) {
        var id = e.markerId;
        var that = this;
        that.showMarkerInfo(markersData, id);
        that.changeMarkerColor(markersData, id);
      },
      // 下载
      downloadFromServer: function() {
       
          const downloadTask = wx.downloadFile({
            url: 'https://www.123gps.com.cn/app/vehicledrivehisinfo/exportOverspeedHuizongExcel?token='+a+'&vechicleIds=330575&beginTime=2018-09-19+14:17&endTime=2018-09-20+14:17&timeInterval=0',  
            header: {
              'content-type': 'application/xml'
            },   
            success: function (res) {        
              console.log(res)        
              // wx.saveFile({//对临时资源进行永久保存          
              // tempFilePath: res.tempFilePath,//tempFilePath想要保存的文件的临时地址          
              // success:function(res){            
              //   console.log("保存成功啦")            
              //   console.log(res)//res是保存成功的返回值，包含存储路径等          
              //   }        
              //   })      
              //   }    
              //   })    
              //   downloadTask.onProgressUpdate((res) => {      
              //     console.log('下载进度', res.progress)      
              //     this.setData({        
              //       downloadPercent: (res.progress*100).toFixed(2)//toFixed(2)取小数点后两位，更新wxml中progress组件的进度值      
              //       })    
                    }})     
                    //downloadTask.abort() // 取消下载任务 
                     }

        
      
          })