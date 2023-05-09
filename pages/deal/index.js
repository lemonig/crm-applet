// pages/deal/index.js
import { dealPage} from '../../api/deal_list';
const app = getApp()
Page({


  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: "商机", // 导航栏标题
    },
    option1: [{
        text: '关系建立',
        value: 0
      },
      {
        text: '公司认可',
        value: 1
      },
      {
        text: '按系统设定的流程阶段',
        value: 2
      },
    ],
    option2: [{
        text: '录入时间（正反）',
        value: 'a'
      },
      {
        text: '跟进时间（正反',
        value: 'b'
      },
      {
        text: '商机金额（正反）',
        value: 'c'
      },
      {
        text: '业务类型（正反）',
        value: 'd'
      },
    ],
    option3: [{
        text: '全部商机',
        value: 'a'
      },
      {
        text: '我负责的商机',
        value: 'b'
      },
      {
        text: '下属负责的商机',
        value: 'c'
      },
      {
        text: '赢单商机',
        value: 'd'
      },
      {
        text: '输单商机',
        value: 'e'
      },
      {
        text: '终止商机',
        value: 'g'
      },
      {
        text: '进行中商机',
        value: 'h'
      },
      {
        text: '特殊业务商机',
        value: 'i'
      },
      {
        text: '默认我负责的商机',
        value: 'j'
      },

    ],
    value1: 0,
    value2: 'a',
    value3: 'a',
    list: [
      {
        id:'1',
        a: '项目1',
        b: '付钱了',
        c: '123',
        d: "杭州市环保局",
        e: "蔡徐坤",
        f: "2032-9-9",
        g:'2039-9-9'
      }
    ],
    id:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

   fetchData: async function() {
    let { data } = await dealPage()
    console.log(data);
    this.setData({
      list:data
    })
    
  },


  addDeal() {
    wx.navigateTo({
      url: '/pages/deal-form/index',
    })
  },
  gotoDetail(eve) {
    console.log(eve);
    let id = eve.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/deal-detail/index?id='+ id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.fetchData()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(this.getTabBar);
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})