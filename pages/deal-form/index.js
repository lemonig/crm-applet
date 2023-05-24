import { debounce } from './../../utils/util';
import { addDeal, updateDeal, detailDeal } from '../../api/deal';
import { linkmanInfo } from '../../api/linkman';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '',
    },

    form: {
      title: '',
      code: '',
      orgId: '',
      orgName: '',
      pipelineStageId: '',
      value: '0.0',
      description: '',
      probability: 50,
      isFinalOrg: true,
      personList: '',
      productList: '',
      businessType: '1',
    },
    currentValue: 50,

    columnsCustom: [
      {
        label: '湖州公司',
        value: '1',
      },
      {
        label: '浙江公司',
        value: '2',
      },
    ],

    columnsStage: [
      {
        label: '信息获取',
        value: '1',
      },
      {
        label: '关系建立',
        value: '2',
      },
      {
        label: '公司认可',
        value: '3',
      },
      {
        label: '招投标参与',
        value: '4',
      },
      {
        label: '已中标或合同签订',
        value: '5',
      },
    ],

    columnsUser: [
      {
        label: '是',
        value: true,
      },
      {
        label: '否',
        value: false,
      },
    ],
    columnsLink: [],
    columnsSale: [
      {
        label: '普通业务',
        value: 1,
      },
      {
        label: '拓展业务',
        value: 2,
      },
    ],
    columnsIndex: [
      {
        label: '直属1',
        value: '1',
      },
      {
        label: '实数2',
        value: '2',
      },
    ],
    columnsPro: [
      {
        label: '产品1',
        value: '1',
      },
      {
        label: '产公平',
        value: '2',
      },
    ],

    btnLoad: false,
  },

  async getLinkman() {
    let { data } = await linkmanInfo({
      page: 1,
      size: 99999,
    });
    this.setData({
      columnsLink: data.map((item) => ({ label: item.name, value: item.id })),
    });
  },

  showPopup(e) {
    console.log(e.currentTarget.dataset.index);
    let idx = e.currentTarget.dataset.index;
    console.log('show' + idx);
    this.setData({
      ['show' + idx]: true,
    });
  },

  onClose() {
    // this.setData({
    //   show1: false,
    //   show2: false,
    //   show3: false,
    //   show4: false,
    //   show5: false,
    //   show6: false,
    //   show7: false,
    // });
  },

  onDrag(event) {
    this.setData({
      currentValue: event.detail.value,
      form: {
        ...this.data.form,
        probability: event.detail.value,
      },
    });
  },

  formSubmit: async function (e) {
    this.setData({
      btnLoad: true,
    });
    
    console.log(this.data.form);
    let params = e.detail.value;
    params.orgId = this.data.form.orgId
    if (this.data.id) {
      params.id = this.data.id;
      var { success } = await updateDeal(params);
    } else {
      var { success } = await addDeal(params);
    }
    wx.showToast({
      title: success ? '提交成功' : '提交失败',
    });
    setTimeout(() => {
      wx.navigateBack();
    }, 2000);
  },
  async getDetail() {
    let { data } = await companyDetail({
      id: this.data.id,
    });
    this.setData({
      data,
    });
  },

  selectCus() {
    wx.navigateTo({
      url: '/pages/search/customer-select/index',
    });
  },
  selectProduct() {
    wx.navigateTo({
      url: '/pages/deal-detail/page/deal-detail-pro/index',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getLinkman();
    let { id } = options;
    if (id) {
      this.setData({
        _id: id,
        titleProps: {
          title: `编辑商机`,
        },
      });
      this.getDetail();
    } else {
      this.setData({
        titleProps: {
          title: '新建商机',
        },
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
