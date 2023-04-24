Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: ""
    },
    id: undefined,
    btnLoad: false,
    optionsOrg: [{
        label: '政府',
        value: '1'
      },
      {
        label: '国企',
        value: '2'
      },

    ],
    optionsPri: [{
        label: '浙江',
        value: '1'
      },
      {
        label: '江苏',
        value: '2'
      },

    ],
    form: {
      address: "",
      base: "",
      creditCode: "",
      description: "",
      name: "",
      orgType: "",
    }
  },


  formSubmit: function (e) {
    this.setData({
      btnLoad: true
    })
    console.log(e.detail.value)
    let {
      description,
      title,
      value
    } = e.detail.value

    setTimeout(() => {

    }, 2000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {
      id
    } = options
    console.log(id);
    if (id) {
      this.setData({
        id,
        titleProps: {
          title: `编辑用户`
        },
        form: {
          address: "浙江",
          base: "1",
          creditCode: "cs23",
          description: "请我吃饭",
          name: "客户",
          orgType: "1",
        }
      })
    } else {
      this.setData({
        titleProps: {
          title: "新建用户"
        },
      })

    }

    // TODO 请求用户详情
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

  },

})