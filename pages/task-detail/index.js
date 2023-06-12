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

  deleteItem() {
    Dialog.confirm({
      title: '警告',
      message: '确定要删除吗？',
      beforeClose: (action) =>
        action === 'confirm' ? activityDelte({ id: this.data.id }).then(res => res.success && wx.navigateBack()) : true,
    });
  },
  gotoForm() {
    wx.navigateTo({
      url: '/pages/task-form/index?id=' + this.data.id,
    });
  },
  fetchData: async function () {
    let { data } = await detailTask({
      id: this.data.id,
    });
    this.setData({ data });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      id: options.id,
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
