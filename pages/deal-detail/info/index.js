// pages/deal-detail/info/index.js
const mock = require('../../contract/mock')
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
    ],
    oppoList: [
      {
        id:"1",
        a1: "北京尚洋",
     
      },
      {
        id:"2",
        a1: "湖南力合",

      }
    ],
    agentList: [
      {
        id:"1",
        a1: "浙江致信招标代理有限公司嘉兴分公司",
        a2: "赵环13987656729",
     
      },
      {
        id:"2",
        a1: "嘉兴市华信I程咨询有限公司",
        a2: "李朗15989291854",

      }
    ],
    conList: [
      {
        id:"1",
        a1: "中国联合网络通信有限公司宁波市分公司",
        a2: "曾国峰13987656729",
     
      },
      {
        id:"2",
        a1: "北方中奥(北京)环境科技有限公司",
        a2: "高云腾13987656729",

      }
    ],
    contList: [
      
    ],

  },
  lifetimes: {
    attached() {
      console.log(mock.default.data);
      this.setData({
        contList:mock.default.data.slice(0,2)
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectProduct(eve) {
      let url = eve.currentTarget.dataset.url
      let urlAll = `/pages/deal-detail/page/deal-detail-${url}/index?id=`+ this.properties.id
      wx.navigateTo({
        url: urlAll,
      })
    }
  }
})
