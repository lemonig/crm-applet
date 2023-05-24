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
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        pageData: [{
                id: "1",
                a1: "周巧夏难",
                a2: "2023-3-3",
                a3: "电话 和洪主任沟通水站参数选择",
                a4: '联系人洪萱'
            },
            {
                id: "2",
                a1: "周巧夏难1",
                a2: "2023-3-3",
                a3: "宴请 和洪主任沟通水站参数选择",
                a4: '联系人洪萱',
                a5: '平湖老百姓酒楼'
            }
        ]

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