// pages/deal-form/index.js
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: "商机"
    },

    form: {
      title: "",
      code: "",
      orgId: "",
      pipelineId: "",
      pipelineStageId: "",
      value: "",
      description: "",
      probability: "",
      isFinalOrg: "",
      personList: "",
      productList: "",
    },


    columnsCustom: [{
        label: '湖州公司',
        value: "1"
      },
      {
        label: '浙江公司',
        value: "1"
      }
    ],


    columnsStage: [{
        label: '阶段1',
        value: "1"
      },
      {
        label: '阶段2',
        value: "1"
      }
    ],

    columnsUser: [{
        label: '是',
        value: "1"
      },
      {
        label: '否',
        value: "1"
      }
    ],
    columnsLink: [{
        label: '联系客户1',
        value: "1"
      },
      {
        label: '联系客户2',
        value: "1"
      }
    ],
    columnsSale: [{
        label: '业务1',
        value: "1"
      },
      {
        label: '业务2',
        value: "1"
      }
    ],
    columnsIndex: [{
        label: '直属1',
        value: "1"
      },
      {
        label: '实数2',
        value: "1"
      }
    ],
    columnsPro: [{
        label: '产品1',
        value: "1"
      },
      {
        label: '产公平',
        value: "1"
      }
    ],

    btnLoad: false
  },

  showPopup(e) {
    console.log(e.currentTarget.dataset.index);
    let idx = e.currentTarget.dataset.index
    console.log('show' + idx);
    this.setData({
      ['show' + idx]: true
    });
  },

  onClose() {
    this.setData({
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
    });
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
    let params = {
      "productList": [

      ],
      "code": "",
      "pipelineStageId": 26,
      "title": "",
      "personList": [

      ],
      "value": 90,
      "isFinalOrg": 8,
      "pipelineId": 15,
      "orgId": 74,
      "description": "",
      "probability": 92
    }
    // Notify('提交成功');
    wx.showToast({
      title:"提交成功",
      icon:'none'
    })
    setTimeout(() => {

      wx.navigateBack()
    }, 2000)
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