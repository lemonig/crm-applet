// pages/task/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: "任务"
    },
    option1: [{
        text: '排序',
        value: 0
      },
      {
        text: '新款商品',
        value: 1
      },

    ],
    option2: [{
        text: '类型',
        value: 'a'
      },
      {
        text: '好评排序',
        value: 'b'
      },
      {
        text: '销量排序',
        value: 'c'
      },
    ],
    option3: [{
        text: '高级排序',
        value: 'a'
      },
      {
        text: '好评排序',
        value: 'b'
      },
      {
        text: '销量排序',
        value: 'c'
      },
    ],
    value1: 0,
    value2: 'a',
    value3: 'a',

    checked: false,
    pageData: [{
        id: '1',
        type: '会议',
        project: "平湖标准站采购项目",
        desc: "和洪主任沟通水站参数选择",
        name: "寿丁奇",
        time: "2023-05-02至05-12",
        checked: false
      },

      {
        id: '2',
        type: '会议',
        project: "平湖标准站采购项目",
        desc: "和洪主任沟通水站参数选择",
        name: "寿丁奇",
        time: "2023-05-02至05-12",
        checked: false
      }
    ]
  },

  onChange(event) {
    console.log(event);
    let {
      dataset: {
        checked
      },
      id,
    } = event.currentTarget
    let res = this.data.pageData.find(ele => ele.id == id)
    console.log(res);
    console.log(checked);
    res.checked = !checked
    this.setData({
      pageData: [...this.data.pageData]
    })
  },
  add() {
    wx.navigateTo({
      url: '/pages/task-form/index',
    })
  },
  gotoDetail() {
    wx.navigateTo({
      url: '/pages/task-detail/index?id=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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