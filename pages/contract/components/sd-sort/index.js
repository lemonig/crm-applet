Component({

  data: {
    sortType: 0 //0 1 -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sortItem(event) {
      this.setData({
        sortType: this.data.sortType + 1 > 1 ? -1 :  this.data.sortType + 1
      })
      var detail = {
        value: this.data.sortType,
      } 
      this.triggerEvent('sort', detail)
    }
  }
})
