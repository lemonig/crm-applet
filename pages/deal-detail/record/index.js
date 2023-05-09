// pages/deal-detail/record/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true, //解决
  },
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
        a3: "最近跟进: 寿丁奇 2023-06-02",
        a4:'商机3个'
      },
      {
        id:"2",
        a1: "周巧夏难1",
        a2: "2023-3-3",
        a3: "最近跟进: 寿丁奇1 2023-06-03",
        a4: '商机4个',
        a5:'平湖老百姓酒楼'
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
    }
  }
})
