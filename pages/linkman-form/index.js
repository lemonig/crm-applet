import { linkmanAdd, linkmanUpdate,linkmanDetail } from '../../api/linkman';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '',
    },
    id: undefined,
    btnLoad: false,
    optionsOrg: [
      {
        label: '政府',
        value: '1',
      },
      {
        label: '国企',
        value: '2',
      },
    ],
    optionsPri: [
      {
        label: '浙江',
        value: '1',
      },
      {
        label: '江苏',
        value: '2',
      },
    ],
    deciedOption: [
      {
        label: '是',
        value: true,
      },
      {
        label: '否',
        value: false,
      },
    ],
    sexOption: [
      {
        label: '男',
        value: '1',
      },
      {
        label: '否',
        value: '女',
      },
    ],

    form: {
      name: '',
      phone: '',
      orgId: '',
      isKdm: '',
      department: '',
      jobTitle: '',
      gender: '',
      officeAddress:"",
      address:"",
      description: '',
    },
  },

  formSubmit: async function (e) {
    this.setData({
      btnLoad: true,
    });
    let params = e.detail.value;
    if (this.data.id) {
      params.id = this.data.id
      var { success } = await linkmanUpdate(params);
    } else {
      var { success } = await linkmanAdd(params);
    }
    wx.showToast({
      title: success ? '提交成功' : '提交失败',
    });
    setTimeout(() => {
      wx.navigateBack();
    }, 2000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let { id } = options;
    console.log(id);
    if (id) {
      this.setData({
        id,
        titleProps: {
          title: `编辑联系人`,
        },
      });
      this.getDetail()

    } else {
      this.setData({
        titleProps: {
          title: '新建联系人',
        },
      });
    }

    // TODO 请求联系人详情
  },
  async getDetail(){
    let { data } =  await linkmanDetail({
       id: this.data.id
     })
     this.setData({
      form: data,
     })
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
   * 页面相关事件处理函数--监听联系人下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 联系人点击右上角分享
   */
  onShareAppMessage() {},
});
