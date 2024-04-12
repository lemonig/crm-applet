import dayjs from 'dayjs';
import { formatTime } from '../../utils/util';
import {
  addTask,
  updateTask,
  detailTask,
  searchDeal,
  listTask,
  activityList,
  activityPerson,
} from '../../api/task';

import { uploadFile } from '../../api/public';

import { dealLinkman } from '../../api/linkman';
import { baseURL } from '../../server/request';
import Dialog from '@vant/weapp/dialog/dialog';

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
      typeId: '',
      dealId: '',
      dealName: '',
      orgId: '',
      orgName: '',
      startTime: dayjs().add(2, 'days').format(),
      endTime: dayjs().add(3, 'days').format(),
      department: '',
      description: '',
      personId: '',
      personName: '',
      done: true,
      participant: '',
      longitude: '',
      latitude: '',
      address: '',
      subject: '',
      fee: undefined,
    },
    location: {},
    status: false,
    show: false,
    hasDeal: true,
    remindMe: dayjs().add(1, 'days').hour(14).minute(0).second(0).millisecond(0).format(),
    feeRequire: false,
    fileList: [],
 
  },
  parentMethod() {
    console.log(this.data._id);
    let id = this.data._id
    wx.redirectTo({
        url: '/pages/task-detail/index?id=' + id,
    })
},
  showActions() {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      sizeType: ['original', 'compressed'],
      camera: 'back',
      async success(res) {
        console.log(res);
        let res1 = await uploadFile(res.tempFiles[0].tempFilePath);
        console.log(res1);
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res1.data.url });
        this.setData({ fileList });
      },
      fail(err) {
        console.log(err);
      },
    });
  },
  onDelete(event) {
    const { index, file } = event.detail;
    // 从 fileList 中删除指定位置的图片
    const fileList = this.data.fileList.slice();
    fileList.splice(index, 1);
    this.setData({
      fileList,
    });
  },
  async afterRead(event) {
    const { file } = event.detail;
    let _this = this;
    wx.compressImage({
      src: file.url, // 图片路径
      quality: 30, // 压缩质量,
      async success(cfile) {
        let res = await uploadFile(cfile.tempFilePath);
        const { fileList = [] } = _this.data;
        fileList.push(res.data);
        _this.setData({ fileList });
      },
    });
  },

  onTimeChange(event) {
    const selectedTime = event.detail.time;
    this.setData({
      remindMe: dayjs(selectedTime)
        .subtract(1, 'day')
        .hour(14)
        .minute(0)
        .second(0)
        .millisecond(0)
        .format(),
    });
  },

  onTimeChange1(event) {
    const selectedTime = event.detail.time;
    this.setData({
      remindMe:selectedTime
    });
  },

  formSubmit: async function (e) {
    this.setData({
      btnLoad: true,
    });
    let params = e.detail.value;
    if (this.data.hasDeal) {
      params.dealId = this.data.form.dealId;
    } else {
      params.orgId = this.data.form.orgId;
    }
    params.done = this.data.status;
    (params.remindMe = dayjs(this.data.remindMe).format('YYYYMMDDHHmm')),
      (params.longitude = this.data.location.longitude);
    params.latitude = this.data.location.latitude;
    params.address = this.data.location.address;
    params.personId = this.data.form.personId;
    params.hasDeal = this.data.hasDeal;
    params.startTimeDto = {
      date: dayjs(params.startTime).format('YYYYMMDD'),
    };
    params.endTimeDto = {
      date: dayjs(params.endTime).format('YYYYMMDD'),
    };
    params.fileList = this.data.fileList.map((i) => ({
      id: i.id,
    }));

    let { description, subject, value } = e.detail.value;
    if (this.data._id) {
      params.id = this.data._id;
      var { success, message, data } = await updateTask(params);
    } else {
      var { success, message, data } = await addTask(params);
    }
    wx.showToast({
      title: message,
      icon: 'none',
    });

    if (success) {
      this.setData({
        btnLoad: false,
      });
      wx.requestSubscribeMessage({
        tmplIds: ['qtdVbTeX4B04lSAgzfTAI77IgePhkq80y9IxLGC_wyQ'],
        success(res) {
          //   wx.navigateBack();
        },
        fail(res) {},
      });

      if (data.done && data.dealId) {
        let id = this.data._id;
        // wx.navigateTo({
        //   url: '/pages/task-detail/index?id=' + id + '&dealId=' + data.dealId,
        // });
        Dialog.confirm({
          title: '消息',
          message: '任务已完成，是否去更新商机状态？ ',
          confirmButtonText: '好',
          cancelButtonText: '暂不更新',
          beforeClose: (action) =>
            action === 'confirm'
              ? wx.redirectTo({
                  url: '/pages/deal-detail/index?id=' + data.dealId,
                })
              : wx.redirectTo({
                  url: '/pages/task-detail/index?id=' + id,
                }),
        })
          .then(() => {})
          .catch(() => {});
      } else {
        wx.navigateBack();
      }

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
  onHasDealChange({ detail }) {
    this.setData({
      form: {
        ...this.data.form,
        orgId: '',
        orgName: '',
        dealId: '',
        dealName: '',
        personId: '',
        personName: '',
      },
    });
    this.setData({
      hasDeal: detail,
    });
  },

  gotoBusiness() {
    wx.navigateTo({
      url: '/pages/search/business-select/index',
    });
  },
  async beforeTap() {
    if (this.data.hasDeal) {
      if (!this.data.form.dealId) {
        wx.showToast({
          title: '请先选择商机',
          icon: 'none',
        });

        return;
      }
    } else {
      if (!this.data.form.orgId) {
        wx.showToast({
          title: '请先选择客户',
          icon: 'none',
        });

        return;
      }
    }

    this.setData({
      show: true,
    });
    let id = {
      orgId: this.data.form.orgId,
      dealId: this.data.form.dealId,
    };
    let res2 = await this.getLinkman(id);
    this.setData({
      optionsLink: res2.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    });
  },
  onConfirml(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      feeRequire: this.data.optionsActive.find((ele) => ele.value == value)['isFeeRequired'],
      form: {
        ...this.data.form,
        typeId: value,
      },
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
  getLinkman: async function (params) {
    let { data } = await activityPerson(params);
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
      hasDeal: !!data.dealId,
      remindMe: data.remindMe,
      fileList: data.fileList,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let { id, idJson, dealName } = options;
    this.pageInit(id, idJson, dealName);
  },

  pageInit: async function (id, idJson, dealName) {
    let res1 = await this.getActivityList();
    if (id) {
      let params = JSON.parse(idJson);

      var res2 = await this.getLinkman(params);
    }
    this.setData({
      _id: id,
      titleProps: {
        title: `${id ? '编辑' : '新建'}任务`,
      },
      optionsActive: res1.map((item) => ({
        ...item,
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
  selectCus() {
    wx.navigateTo({
      url: '/pages/search/customer-select/index',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // if (this.data.form.dealId) {
    //     var pages = getCurrentPages();
    //     var prePages = pages[pages.length - 1];
    //     var formDealId = prePages.data;
    //     console.log(formDealId);
    //   this.setData({
    //     form: {
    //       ...this.data.form,
    //       personName: '',
    //       personId: '',
    //     },
    //   });
    // }
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
