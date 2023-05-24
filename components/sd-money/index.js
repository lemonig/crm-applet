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
    this.setData({
      value: this.properties.text.toLocaleString('en-US')
    })
  },

});
