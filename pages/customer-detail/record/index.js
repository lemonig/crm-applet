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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageData: [
      {
        id:"1",
        a1: "周巧夏难",
        a2: "2023-3-3",
        a3: " 和李主任整顿饭",

        a4: '张思',
        a5: '平湖标准站采购计划',
        type:'宴请',
      },
      {
        id:"2",
        a1: "周巧夏难1",
        a2: "2023-3-3",
        a3: "和洪主任沟通水站建设",
        a4: '王五',
        a5:'平湖标准站采购计划',
        a6: '平湖老百姓酒楼',
        type:'电话',
      }
    ]
    
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
    }
  }
})
