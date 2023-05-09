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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    productList: [
      {
        id:"1",
        a1: "张三",
        a2: "15个",
        a3: '18268833074',
        a4:'水科 科员'
     
      },
      {
        id:"2",
        a1: "张四",
        a2: "15个",
        a3: '10086',
        a4:'水科 科员'

      }
    ],
    dealList: [
      {
        id:"1",
        a1: "水站建设",
        a2: "6000",
        a3: '周深',
        a4:'关系建立'
     
      },
      {
        id:"2",
        a1: "水站建设1",
        a2: "60010",
        a3: '周深',
        a4:'关系建立'

      }
    ],
    conList: [
      {
        id:"1",
        a1: "水质检测设备采购",
        a2: "周深",
        a3: '6000',
        a4: '2022-10-30',
        a5: '9000',
        a6:"6333"
     
      },
     
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
