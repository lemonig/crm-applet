// pages/deal-detail/base/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    dealId: {
      type:String
    },
    pageData:{
      type: Object,
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
        url: '/pages/customer-form/index?id='+ this.properties.dealId,
      })
    },
  
  }
})
