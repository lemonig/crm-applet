// pages/myself/index.js
import Dialog from '@vant/weapp/dialog/dialog';
// const defaultAvatarUrl = require("../../assets/imgs/head.png")
import {  getUserInfo as getUserInfoApi,wxLogOut} from "../../api/user";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleProps:{
      title:'我的'
    },
    avatarUrl: '',
    userName:''
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
    wx.setStorage({
      key:"userAvator",
      data:avatarUrl
    })
  },
  logout() {
    Dialog.confirm({
      title: '提示',
      message: '确定退出吗',
    })
      .then(() => {
        // on confirm
        wxLogOut()
        wx.clearStorage();
        wx.redirectTo({
          url: '/pages/login/index',
        });

      })
      .catch(() => {
        // on cancel
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getUserInfo()
    // let that = this
    // wx.getStorage({
    //   key: 'userName',
    //   success (res) {
    //     that.setData({
    //       userName:res.data,
    //     })
    //   }
    // })
    // wx.getStorage({
    //   key: 'userAvator',
    //   success (res) {
    //     that.setData({
    //       avatarUrl:res.data,
    //     })
    //   }
    // })
    
  },
  nameChange(event){
    wx.setStorage({
      key:"userName",
      data: event.detail.value
    })
  },

  async getUserInfo(){
    
    let res = await getUserInfoApi()
    this.setData({
      pageData: res.data
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})