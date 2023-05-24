// pages/deal-detail/base/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dealId: {
      type:String
    },
    pagaData:{
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
    gotoedit() {
      wx.navigateTo({
        url: '/pages/deal-form/index?id='+ this.properties.dealId,
      })
    }
  }
})
