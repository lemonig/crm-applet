// pages/task-detail/index.js
import Dialog from '@vant/weapp/dialog/dialog';
import {
  addTask,
  updateTask,
  detailTask,
  searchDeal,
  listTask,
  activityList,
  activityDelte,
} from '../../api/task';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '任务',
    },
    id: '',
    data: {},
  },

  parentMethod() {
    wx.switchTab({
      url: '/pages/task/index',
    });
  },

  deleteItem() {
    Dialog.confirm({
      title: '警告',
      message: '确定要删除吗？',
      beforeClose: (action) =>
        action === 'confirm'
          ? activityDelte({ id: this.data.id }).then((res) => res.success && wx.navigateBack())
          : true,
    });
  },
  gotoForm() {
    let id = {
      orgId: this.data.data.orgId,
      dealId: this.data.data.dealId,
    };
    let idJson = JSON.stringify(id);
    wx.redirectTo({
      url: '/pages/task-form/index?id=' + this.data.id + '&idJson=' + idJson,
    });
  },
  fetchData: async function () {
    let { data } = await detailTask({
      id: this.data.id,
    });
    this.setData({ data });
  },
  viewImg(event) {
    let { src } = event.currentTarget.dataset;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: this.data.data.fileList.map((item) => item.url), // 需要预览的图片http链接列表,
      success(res) {
        console.log(res);
      },
      fail(err) {
        console.log(err);
      },
      complete() {},
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if ('dealId' in options) {
      Dialog.confirm({
        title: '消息',
        message: '任务已完成，是否去更新商机状态？ ',
        confirmButtonText: '好',
        cancelButtonText: '暂不更新',
        beforeClose: (action) =>
          action === 'confirm'
            ? wx.redirectTo({
                url: '/pages/deal-detail/index?id=' + options.dealId,
              })
            : true,
      })
        .then(() => {})
        .catch(() => {});
    }
    this.setData({
      id: options.id,
    });
  },
  gotoRelation(eve) {
    if (eve.currentTarget.dataset.dealid) {
      wx.navigateTo({
        url: '/pages/deal-detail/index?id=' + eve.currentTarget.dataset.dealid,
      });
    }
  },
  gotoRelation1(eve) {
    if (eve.currentTarget.dataset.orgid) {
      wx.navigateTo({
        url: '/pages/customer-detail/index?id=' + eve.currentTarget.dataset.orgid,
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
  onShow() {
    this.fetchData();
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
