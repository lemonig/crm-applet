import { debounce } from './../../utils/util';
import { province } from './../../utils/data';
import { companyAdd, companyUpdate, companyDetail } from '../../api/customer';
Page({
  /**
   * 页面的初始数据
   */
  options: {
    pureDataPattern: /^_/, 
  },
  data: {
    titleProps: {
      title: '',
    },
    _id: undefined,
    btnLoad: false,
    optionsOrg: [
      {
        label: '政府机构',
        value: 1,
      },
      {
        label: '企业单位',
        value: 2,
      },
      {
        label: '个人',
        value: 3,
      },
      {
        label: '其他',
        value: 4,
      },
    ],
    optionsPri: province.map((item) => ({ label: item, value: item })),
    form: {
      address: '',
      base: '',
      creditCode: '',
      description: '',
      name: '',
      orgType: '',
    },
  },

  formSubmit: async function (e) {
    this.setData({
      btnLoad: true,
    });
    let params = e.detail.value;
    if (this.data._id) {
      params.id = this.data._id;
      var { success ,message} = await companyUpdate(params);
    } else {
      var { success,message } = await companyAdd(params);
    }
    this.setData({
      btnLoad: false,
    });
    if (success) {
      wx.navigateBack({
        delta: 1, // 返回上一页
      });
      wx.showToast({
         title: message,
         icon:'none'
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    let { id } = options;
    console.log(id);
    if (id) {
      this.setData({
        _id: id,
        titleProps: {
          title: `编辑客户`,
        },
      });
      this.getDetail();
    } else {
      this.setData({
        titleProps: {
          title: '新建客户',
        },
      });
    }

    // TODO 请求用户详情
  },
  async getDetail() {
    let { data } = await companyDetail({
      id: this.data._id,
    });
    this.setData({
      form: data.baseInfo,
    });
  },

  debouncedHandleInput(event) {
    // debounce()
    this.setData({
      form: {
        ...this.data.form,
        name: event.detail,
      },
    });
    console.log(event.detail);
  },

  // debouncedHandleInput : debounce(this.onCustomerChange, 300),

  selectCustomer() {
    wx.navigateTo({
      url: '/pages/search/customer-search/index?text=' + this.data.form.name,
    });
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
