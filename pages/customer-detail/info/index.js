// pages/deal-detail/info/index.js
Component({
  options: {
    addGlobalClass: true,
  },
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
    productList: [
    ],
    dealList: [
     
    ],
    conList: [
     
    ]

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
    },
    callMe(eve) {
      wx.makePhoneCall({
        phoneNumber: eve.currentTarget.dataset.phone
      })
    }
  }
})
