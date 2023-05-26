Component({
  properties: {
    text: {
      type: Number ,
    },
    bold:{
      type: Boolean
    }
  },
  attached: function() {
        // const query = wx.createSelectorQuery()
    // const nodes =query.select('.sd_money').boundingClientRect(rect  =>{
    //   console.log(rect);
    // }).exec(res => console.log(res))
    // console.log(nodes);
    console.log(this.properties.text);
    this.setData({
      value: this.properties.text.toLocaleString('en-US')
    })
  },

});
