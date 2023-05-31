// pages/deal-detail/record/index.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        addGlobalClass: true, //解决
    },
    properties: {
      dealId: {
        type: String,
      },
      pagaData: {
        type: Array,
      },
    },

    /**
     * 组件的初始数据
     */
    data: {
   
    },
    lifetimes: {
        attached() {
            console.log(this.properties);
        }
  },
    /**
     * 组件的方法列表
     */
    methods: {
        addDeal(events) {
            wx.navigateTo({
                url: "/pages/task-form/index?dealId=" + this.properties.dealId + '&dealName=' + '平湖标准站采购项目（拓展类）',
                events: events,
                success: (result) => {},
                fail: (res) => {},
                complete: (res) => {},
            })
        }
    }
})