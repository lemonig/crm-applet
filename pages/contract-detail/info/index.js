// pages/deal-detail/info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type:String
    },
    pageData:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {


  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectProduct(eve) {
      let url = eve.currentTarget.dataset.url
      let urlAll = `/pages/deal-detail-${url}/index?id=`+ this.properties.id
      wx.navigateTo({
        url: urlAll,
      })
    }
  }
})
