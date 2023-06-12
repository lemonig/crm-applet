// pages/deal-detail/base/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type: String,
    },
    pageData:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    show: false,
    pageShow: '1',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickShow(eve) {
      let page = eve.currentTarget.dataset.page;

      this.setData({ show: true, pageShow: page });
    },
    viewL(eve) {
      wx.navigateTo({
        url: '/pages/view-file/index?filepath='+eve.currentTarget.dataset.filepath,
      });
      // wx.downloadFile({
      //   url: 'https://grean-project-file.oss-cn-hangzhou.aliyuncs.com/rule/%E5%9C%B0%E8%A1%A8%E6%B0%B4%E7%8E%AF%E5%A2%83%E8%B4%A8%E9%87%8F%E6%A0%87%E5%87%86%EF%BC%88GB%203838-2002%20%EF%BC%89.pdf',
      //   success: function (res) {
      //     const filePath = res.tempFilePath
      //     wx.openDocument({
      //       filePath: filePath,
      //       success: function (res) {
      //         console.log('打开文档成功')
      //       }
      //     })
      //   }
      // })
    },
    onClickHide() {
      this.setData({ show: false });
    },
  },
});
