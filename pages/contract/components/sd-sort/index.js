Component({
  data: {
    sortType: 0 //0 1 -1
  },
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
