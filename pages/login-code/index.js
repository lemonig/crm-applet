// pages/login-code/index.js
import { smsLogin, getSMS } from '../../api/user';
import { isPhone as isPhoneVali } from '../../utils/validate';
import Notify from '@vant/weapp/notify/notify';
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
    maskedPhoneNumber: '',
    hasUserInfo: false,
    errMsg: '',
    isSend: true,
    verificationCode: {
      // 保存输入的验证码
      value: '',
      isFocus: true,
    },
    isPhone: false,
    countdown: 0,
    flagLogin:false
  },
  async send() {
    if (!!this.data.countdown) {
      return;
    }

    if (!this.data.phoneNum) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none',
      });
      return;
    }
    if (!isPhoneVali(this.data.phoneNum)) {
      wx.showToast({
        title: '请输入正确手机号！',
        icon: 'none',
      });
      return;
    }
    let { data, success, message } = await getSMS({
      phone: this.data.phoneNum,
    });
    if (success) {
      this.setData({
        isSend: true,
      });
      this.maskPhoneNumber();
      this.startCountdown();
    } else {
      wx.showToast({
        title: message,
        icon: 'none',
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
    if (isPhoneVali(e.detail)) {
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
      let { success, data } = await smsLogin({
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

  startCountdown: function () {
    let seconds = 60; // 设置倒计时时长
    this.setData({
      countdown: seconds,
    });
    let timer = setInterval(() => {
      seconds--;
      this.setData({
        countdown: seconds,
      });
      if (seconds <= 0) {
        clearInterval(timer);
        this.setData({
          countdown: 0,
        });
      }
    }, 1000);
  },

  maskPhoneNumber: function () {
    const phoneNumber = this.data.phoneNum;
    const maskedPhoneNumber = phoneNumber.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
    this.setData({
      maskedPhoneNumber: maskedPhoneNumber,
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
