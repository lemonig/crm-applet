import { debounce } from './../../utils/util';
import { addDeal, updateDeal, detailDeal, listPipelineStage } from '../../api/deal';
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
      personList: [],
      personName: '',
      productList: '',
      businessType: '1',
    },
    currentValue: 50,

    columnsCustom: [],

    columnsStage: [],

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
    // columnsIndex: [],
    // columnsPro: [],

    btnLoad: false,
    productMsg: [],
    linkmanMsg: [],
    personName: '',
  },

  async getListPipelineStage() {
    let { data } = await listPipelineStage();

    return data;
  },

  showPopup(e) {
    let idx = e.currentTarget.dataset.index;
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

  sliderChange(event) {
    this.setData({
      currentValue: event.detail.value,
    });
  },
  formSubmit: async function (e) {
    this.setData({
      btnLoad: true,
    });

    let params = e.detail.value;
    params.orgId = this.data.form.orgId;
    params.dealProductList = this.data.productMsg;
    params.personList = this.data.linkmanMsg;
    params.probability = this.data.currentValue;

    if (this.data._id) {
      params.id = this.data._id;
      var { success,message } = await updateDeal(params);
    } else {
      var { success ,message} = await addDeal(params);
    }
    this.setData({
      btnLoad: false,
    });
    if (success) {
      wx.showToast({
         title: message,
      });
      wx.navigateBack();
    }
  },

  selectCus() {
    wx.navigateTo({
      url: '/pages/search/customer-select/index',
    });
  },
  selectLinkman() {
    wx.navigateTo({
      url:
        '/pages/search/linkman-select/index?orgId=' +
        this.data.form.orgId +
        '&selected=' +
        this.data.linkmanMsg.join(''),
    });
  },
  selectProduct() {
    let url = '/pages/deal-detail/page/deal-detail-pro/index';
    if (this.data.productMsg.length) {
      url = url + '?selected=' + JSON.stringify(this.data.productMsg);
    }
    wx.navigateTo({
      url,
    });
  },
  fetchData: async function () {
    let { data } = await detailDeal({
      id: this.data._id,
    });
    this.setData({
      data,
      form: data.baseInfo,
      productMsg: data.relatedInfo.products,
      linkmanMsg: data.baseInfo.personList,
      currentValue: data.baseInfo.probability,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getLinkman();
    let { id } = options;
    this.pageInit(id);
  },
  pageInit: async function (id) {
    let res = await this.getListPipelineStage();
    this.setData({
      _id: id,
      titleProps: {
        title: `${id ? '编辑' : '新建'}商机`,
      },
      columnsStage: res.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      'form.pipelineStageId': id ? '' : res[0].id,
    });

    if (id) this.fetchData();
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
