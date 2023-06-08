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

const beforeClose = (action) =>
  new Promise((resolve) => {
    console.log(action);
    setTimeout(() => {
      if (action === 'confirm') {
        resolve(true);
      } else {
        // 拦截取消操作
        resolve(false);
      }
    }, 1000);
  });

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
    let that = this;
    Dialog.confirm({
      title: '警告',
      message: '确定要删除吗？',
      beforeClose: (action) =>
        new Promise((resolve) => {
          console.log(action);
            if (action === 'confirm') {
              activityDelte({
                id:this.data.id
              }).then(res =>{
                if(res.success){
                  wx.navigateBack()
                }
                resolve(true);
              })
             
            } else {
              // 拦截取消操作
              resolve(true);
            }
        }),
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
