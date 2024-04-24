// pages/deal-detail/record/index.js
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
      type: Array,
      value: [

      ]
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
    addDeal(events) {
      wx.navigateTo({
        url: "/pages/task-form/index?id="+ this.properties.id,
        events: events,
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    },
    callMe(eve) {
      wx.makePhoneCall({
        phoneNumber: eve.currentTarget.dataset.phone
      })
    },
    gotoRelation(eve) {
      if (eve.currentTarget.dataset.id) {
        wx.navigateTo({
          url: '/pages/task-detail/index?id=' + eve.currentTarget.dataset.id,
        });
      }
    },
  }

  
})
