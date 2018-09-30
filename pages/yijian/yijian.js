Page({
  data:{
     info:''
  },
  fankui:function(e){
    
    this.setData({
      info: e.detail.value
    })
    
  },
  btn:function(){
    console.log(this.data.info)
  }
})