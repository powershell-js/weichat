Page({
  data: {
    to:"0",
    le:"0",
    // 多个点标记
    
    markers: [{
      iconPath: "car-run3.png",
      
      id: 0,
      longitude: 113.3245211,
      latitude: 23.10229,
      width: 20,
      height: 20,
      label: {
        content: '我是这个气泡1',
        fontSize: 14,
        color: '#ffffff',
        bgColor: '#000000',
        padding: 8,
        borderRadius: 4,
        boxShadow: '4px 8px 16px 0 rgba(0)'
      }
    },
      {
        iconPath: "car-run3.png",
        id: 1,
        
        longitude: 113.324520,
        latitude: 23.099994,
        width: 20,
        height: 20,
        label:{
          content: '我是这个气泡2',
          fontSize: 14,
          color: '#ffffff',
          bgColor: '#000000',
          padding: 8,
          borderRadius: 4,
          boxShadow: '4px 8px 16px 0 rgba(0)'
        }
      }
      // 多个点标记
    ],
    
    // 历史轨迹线
    polyline: [{
      points: [
        {
        longitude: 113.3245211,
        latitude: 23.10229
      }, 
      {
          longitude: 113.324520,
        latitude: 23.10229
        },
        {
          latitude: 23.099994,
          longitude: 113.324520
        },
        {
          latitude: 23.199994,
          longitude: 113.324520
        }
      ],
      // 历史轨迹线
      color: "#FF0000DD",
      width: 3,
      dottedLine: true
    }],
    // scale:16,
    controls: [{
      id: 1,
      iconPath: 'car-run3.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
      
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  huadong:function(e){
    console.log(e)
    this.setData({
      to: e.touches[0].clientY,
      le: e.touches[0].clientX
    })
  }
})

