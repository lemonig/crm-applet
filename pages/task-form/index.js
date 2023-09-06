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

import { dealLinkman } from '../../api/linkman';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '任务',
    },
    _id: undefined,
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
      dealId: '',
      dealName: '',
      startTime: dayjs().format(),
      endTime: dayjs().add(1, 'day').format(),
      department: '',
      description: '',
      personId: '',
      personName: '',
      done: true,
      remindMe: dayjs().format(),
      participant: '',
      longitude: '',
      latitude: '',
      address: '',
      subject: '',
    },
    location: {},
    status: false,
    show: false,
  },

  formSubmit: async function (e) {
    this.setData({
      btnLoad: true,
    });
    let params = e.detail.value;
    params.dealId = this.data.form.dealId;
    params.done = this.data.status;
    params.longitude = this.data.location.longitude;
    params.latitude = this.data.location.latitude;
    params.address = this.data.location.address;
    params.personId = this.data.form.personId;
    params.startTimeDto = {
      date: dayjs(params.startTime).format('YYYYMMDD'),
    };
    params.endTimeDto = {
      date: dayjs(params.endTime).format('YYYYMMDD'),
    };

    let { description, subject, value } = e.detail.value;
    if (this.data._id) {
      params.id = this.data._id;
      var { success, message } = await updateTask(params);
    } else {
      var { success, message } = await addTask(params);
    }
    wx.showToast({
      title: message,
      icon: 'none',
    });

    if (success) {
      wx.requestSubscribeMessage({
        tmplIds: ['qtdVbTeX4B04lSAgzfTAI77IgePhkq80y9IxLGC_wyQ'],
        success(res) {
          wx.navigateBack();
        },
        fail(res) {},
      });
      // wx.addPhoneCalendar({
      //   title:subject,
      //   startTime: dayjs(this.data.tipme).unix(),
      //   endTime: dayjs(this.data.tipme).add(1, 'day').unix(),
      //   success(res) {
      //     console.log(res);
      //     wx.showToast({
      //       title: '添加日程成功',
      //     });
      //     wx.navigateBack();
      //   },
      //   fail(res) {
      //     console.log(res);
      //     wx.showToast({
      //       title: '添加日程失败',
      //       icon: 'none',
      //     });
      //   },
      //   complete() {
      //     that.setData({
      //       btnLoad: false,
      //     });
      //   },
      // });
    } else {
      this.setData({
        btnLoad: false,
      });
    }
  },
  onChooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          location: res,
        });
      },
    });
  },
  onTaskChange({ detail }) {
    this.setData({
      status: detail,
    });
  },
  gotoBusiness() {
    wx.navigateTo({
      url: '/pages/search/business-select/index',
    });
  },
  async beforeTap() {
    if (!this.data.form.dealId) {
      wx.showToast({
        title: '请先选择商机',
        icon: 'none',
      });

      return;
    }
    this.setData({
      show: true,
    });
    let res2 = await this.getLinkman(this.data.form.dealId);
    this.setData({
      optionsLink: res2.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    });
  },

  onClose() {
    this.setData({
      show: false,
    });
  },
  confirmPicker(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      form: {
        ...this.data.form,
        personId: value.value,
        personName: value.label,
      },
      show: false,
    });
  },
  getLinkman: async function (dealId) {
    let params = {
      id: dealId,
    };
    let { data } = await dealLinkman(params);
    return data;
  },
  getActivityList: async function () {
    let { data } = await activityList();
    return data;
  },
  fetchData: async function () {
    let { data } = await detailTask({
      id: this.data._id,
    });
    // data.startTime = dayjs(data.startTime).format();
    // data.endTime = dayjs(data.endTime).format();
    this.setData({
      form: {
        ...data,
      },
      location: {
        address: data.address,
        longitude: data.longitude,
        latitude: data.latitude,
      },
      status: data.done,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let { id, dealId, dealName } = options;
    this.pageInit(id, dealId, dealName);
  },

  pageInit: async function (id, dealId, dealName) {
    let res1 = await this.getActivityList();
    if (id) {
      var res2 = await this.getLinkman(dealId);
    }
    this.setData({
      _id: id,
      titleProps: {
        title: `${id ? '编辑' : '新建'}任务`,
      },
      optionsActive: res1.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      optionsLink: id
        ? res2.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        : [],
    });
    if (id) this.fetchData();
    // if (!id) {
    //   this.setData({
    //     form: {
    //       ...this.data.form,
    //       dealId: dealId,
    //       dealName: dealName,
    //     },
    //   });
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(this.data.form);
  },

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
