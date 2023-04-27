// pages/deal-detail/record/index.js
Component({
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
    tableHeader: [{
      prop: 'id',
      width: 110,
      label: '序号'
    },
    {
      prop: 'status',
      width: 300,
      label: '姓名'
    }, {
      prop: 'datetime',
      width: 200,
      label: '日期',
      color: '#55C355'
    },


  ],
  stripe: true,
  border: true,
  outBorder: true,
  row: [{
    "id": 1,
    "status": '张三',
    "datetime": "12213",

  }, {
    "id": 2,
    "status": '李四',
    "datetime": "30402",

  }, {
    "id": 3,
    "status": '王五',
    "datetime": "10403",
  }],
  msg: '暂无数据',
    
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
