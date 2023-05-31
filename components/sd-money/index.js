Component({
  properties: {
    text: {
      type: Number ,
      observer: function (newVal, oldVal) {
        this.setData({
          value: newVal.toLocaleString('en-US')
        })
      }
    },
    bold:{
      type: Boolean
    }
  },
  data:{
    value:0
  }
});
