// pages/login-code/index.js
import { smsLogin, getSMS } from '../../api/user';
import { isPhone } from '../../utils/validate';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    titleProps: {
      title: '验证码登录',
    },
    //  页面是否需要安全高度
    loading: false,

    phoneNum: '',
    hasUserInfo: false,
    errMsg: '',
    isSend: false,
    verificationCode: {
      // 保存输入的验证码
      value: '',
      isFocus: true,
    },
    isPhone: false,
  },
  async send() {
    let { data, success } = await getSMS({
      phone: this.data.phoneNum,
    });
    if (success) {
      this.setData({
        isSend: true,
      });
    }
  },
  //  登录方法
  async handleLogin() {
    const params = this.formValidate();
    if (!params) return;
    this.setData({ loading: true });
    // params.password = hexMD5(params.password);
    let { data, success } = await login(params);
    if (success) {
      wx.setStorage({ key: 'token', data: data.access_token });
      wx.switchTab({
        url: '/pages/home/index',
      });
    }
  },

  handlePhoneInput(e) {
    this.setData({
      phoneNum: e.detail,
    });
    if (isPhone(e.detail)) {
      this.setData({
        isPhone: true,
      });
    }
  },
  async bindPhoneInput(e) {
    const self = this;
    const { flag } = e.currentTarget.dataset;
    self.data[flag].value = e.detail;
    self.setData({
      [flag]: self.data[flag],
    });
    if (e.detail.length === 6) {
    let{success,data }= await smsLogin({
        phone: this.data.phoneNum,
        code: this.data.verificationCode.value,
      });
      if (success) {
        wx.setStorage({ key: 'token', data: data.access_token });
        wx.switchTab({
          url: '/pages/home/index',
        });
      }
    }
  },
  bindKeyInput(e) {
    const self = this;
    const { flag } = e.currentTarget.dataset;
    self.data[flag].isFocus = true;
    self.setData({
      [flag]: self.data[flag],
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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
