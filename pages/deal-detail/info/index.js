// pages/deal-detail/info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    productList: [
      {
        id:"1",
        a1: "标准水站",
        a2: "15个",
     
      },
      {
        id:"2",
        a1: "水站运维服务",
        a2: "3个",

      }
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectProduct() {
      wx.showToast({
        title: '选择',
      })
    }
  }
})