// pages/customer/components/link-man/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据 排序：跟进时间（正反）、姓名首字母 搜索：按姓名、职务、单位、手机号码
   */
  data: {
    option1: [{
        text: '跟进时间（正反）',
        value: 0
      },
      {
        text: '姓名首字母',
        value: 1
      },

    ],
    option2: [{
        text: '姓名',
        value: 'a'
      },
      {
        text: '职务',
        value: 'b'
      },
      {
        text: '单位',
        value: 'c'
      },
      {
        text: '手机号码',
        value: 'd'
      },
    ],
    value1: 0,
    value2: "a",
    list: [
      {
        id:'1',
        a: '杭州市环保局 站长',
        b: '张三',
      },
      {
        id:'2',
        a: '平湖市环保局 站长',
        b: '李四',
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoCustomer() {
      wx.navigateBack()
    },
    add() {
      wx.navigateTo({
        url: '/pages/linkman-form/index',
      })
    },
    edit() {
      wx.navigateTo({
        url: '/pages/linkman-form/index?id=1',
      })
    },
    
    gotoDetail() {
      wx.navigateTo({
        url: '/pages/linkman-detail/index?id=1',
      })
    },
  }
})
