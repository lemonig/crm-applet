// index.js
// 获取应用实例
import { login } from '../../api/user';
const app = getApp();
import Notify from '@vant/weapp/notify/notify';
const validate = require('../../utils/validate');
Page({
  data: {
    titleProps: {
      title: '移动CRM',
    },
    //  页面是否需要安全高度
    loading: false,
    form: {
      username: {
        label: '账号',
        value: 'buxingjie',
        rules: 'isPassword',
        validate: false,
        errorText: '',
      },
      password: {
        label: '密码',
        value: '1',
        rules: 'isPassword',
        validate: false,
        errorText: '',
      },
    },
    hasUserInfo: false,
  },
  onLoad() {},
  //  用户名输入框输入方法
  handleUsernameInput(e) {
    this.data.form.username.value = e.detail;
  },
  //  密码输入框输入方法
  handlePasswordInput(e) {
    this.data.form.password.value = e.detail;
  },
  //  表单验证方法
  formValidate() {
    const data = {};
    let pass = true;
    for (const key in this.data.form) {
      if (!validate[this.data.form[key].rules](this.data.form[key].value)) {
        if (this.data.form[key].value) {
          this.data.form[key].errorText = '请勿输入非法字符';
        }
        this.data.form[key].validate = true;
        pass = false;
      } else {
        this.data.form[key].validate = false;
        this.data.form[key].errorText = '';
        data[key] = this.data.form[key].value;
      }
    }
    this.setData({
      form: this.data.form,
    });
    return pass ? data : false;
  },
  //  登录方法
  async handleLogin() {

    const params = this.formValidate();
    if (!params) return;
    this.setData({ loading: true });
    // params.password = hexMD5(params.password);
    let { data ,success} =await login(params);
    if(success){
      // wx.setStorage({ key: 'token', data: data });
        wx.switchTab({
          url: '/pages/home/index',
        })
    }

  },
});
