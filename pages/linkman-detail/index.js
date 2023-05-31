import Dialog from '@vant/weapp/dialog/dialog';
import { linkmanDetail ,linkmanDelete} from '../../api/linkman';

const beforeClose = (action) => new Promise((resolve) => {
  console.log(action);
  setTimeout(() => {
    if (action === 'confirm') {
      resolve(true);
    } else {
      // 拦截取消操作
      resolve(false);
    }
  }, 1000);
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: "联系人"
    },
    id:'',
    data:{}
  },

  async getDetail(){
    let { data } =  await linkmanDetail({
       id: this.data.id
     })
     this.setData({
       data
     })
   },
 


  deleteItem() {
    let that = this
    Dialog.confirm({
      title: '警告',
      message: '确定要删除吗，',
      beforeClose:(action) => new Promise((resolve) => {
        console.log(action);
        setTimeout(() => {
          if (action === 'confirm') {
            linkmanDelete({
              id:this.data.id
            }).then(res=>{
              wx.showToast({
                title: res.message,
                icon:'none'
              });
              wx.navigateBack()
            })
            resolve(true);
          } else {
            // 拦截取消操作
            resolve(false);
          }
        }, 1000);
      })
    });
  },
  gotoForm() {
    wx.navigateTo({
      url: '/pages/linkman-form/index?id='+ this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      id:options.id
    })
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
    this.getDetail()

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