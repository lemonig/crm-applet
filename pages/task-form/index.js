import dayjs from 'dayjs';
import { formatTime } from '../../utils/util';
import {
  addTask,
  updateTask,
  detailTask,
  searchDeal,
  listTask,
  activityList,
} from '../../api/task';

import { linkmanInfo } from '../../api/linkman';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '任务',
    },
    id: undefined,
    btnLoad: false,
    optionsLink: [],
    optionsActive: [],
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
    form: {
      name: '',
      orgId: '',
      orgName: '',
      dealId: '',
      dealName: '',
      startTime: '',
      endTime: '',
      phone: '',
      email: '',
      department: '',
      jobTitle: '',
      description: '',
      gender: '',
      personId: '',
      done: true,
      remindMe: '',
      participant:"",
      longitude:'',
      latitude:'',
      subject:''
    },
    location: {},
    status: false,
  },

  formSubmit: async function (e) {
    this.setData({
      btnLoad: true,
    });
    console.log(e.detail.value);
    let params = e.detail.value;
    params.done = this.data.status;
    params.longitude = this.data.location.longitude;
    params.latitude = this.data.location.latitude;
    params.startTimeDto = {
      // time : dayjs(params.startTime).format('HHmm'),
      date : dayjs(params.startTime).format('YYYYMMDD'),
    } 
    params.endTimeDto = {
      // time : dayjs(params.endTime).format('HHmm'),
      date : dayjs(params.endTime).format('YYYYMMDD'),
    } 

    let { description, title, value } = e.detail.value;

    if (this.data.id) {
      params.id = this.data.id;
      var { success } = await updateTask(params);
    } else {
      var { success } = await addTask(params);
    }
    wx.showToast({
      title: success ? '提交成功' : '提交失败',
    });
    setTimeout(() => {
      wx.navigateBack();
    }, 2000);

    wx.addPhoneCalendar({
      title,
      startTime: dayjs(this.data.tipme).unix(),
      endTime: dayjs(this.data.tipme).add(1, 'day').unix(),
      success() {
        wx.showToast({
          title: '添加日程成功',
        });
        setTimeout(() => {
          wx.showToast({
            title: '添加日程失败',
          });
          this.setData({
            btnLoad: false,
          });
        }, 2000);
      },
      fail() {},
    });
  },
  onChooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        console.log(res);
        this.setData({
          location: res,
        });
      },
    });
  },
  onTaskChange({ detail }) {
    console.log(!detail);
    this.setData({
      status: detail,
    });
  },
  gotoBusiness() {
    wx.navigateTo({
      url: '/pages/search/business-select/index',
    });
  },

  getLinkman: async function () {
    let params = {
      page: 1,
      size: 100000,
    };
    let { data } = await linkmanInfo(params);
    this.setData({
      optionsLink: data.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    });
  },
  getActivityList: async function () {
    let { data } = await activityList();
    this.setData({
      optionsActive: data.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    });
  },
  fetchData: async function () {
    let { data } = await detailTask({
      id: this.data.id,
    });
    data.startTime = dayjs(data.startTimeDto.date).format()
    data.endTime = dayjs(data.endTimeDto.date).format()
    this.setData({ form:data });
    console.log(this.data.form);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let { id, dealId, dealName } = options;
    console.log(options);
    this.getActivityList();
    this.getLinkman();
    if ('id' in options) {
      this.setData({
        id,
        titleProps: {
          title: `编辑任务`,
        },
      
      });
      this.fetchData()
    } else {
      this.setData({
        titleProps: {
          title: '新建任务',
        },
        form: {
          ...this.data.form,
          dealId: dealId,
          dealName: dealName,
        },
      });
    }

    // TODO 请求联系人详情
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
