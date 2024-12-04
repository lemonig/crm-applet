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
    pageData: {
      type: Object,
    },
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
    //   wx.navigateToMiniProgram({
    //     appId: 'wxd45c635d754dbf59',
    //     path:
    //       'pages/detail/detail?url=' +
    //       encodeURIComponent('https://docs.qq.com/doc/DVmtlZUVtVGxQZFp3'),
    //     envVersion: 'release',

    //     success(res) {
    //       // 打开成功
    //     },
    //     fail: function (e) {
    //       console.log(e);
    //     },
    //   });
      // wx.navigateToMiniProgram({
      //     appId: 'wxd45c635d754dbf59',
      //     path: 'pages/view-file/index.html?filepath='+ eve.currentTarget.dataset.filepath,
      //     envVersion: 'release',

      //   })

      // wx.navigateTo({
      //   url: '/pages/view-file/index?filepath='+encodeURIComponent(eve.currentTarget.dataset.filepath),
      // });

        wx.showLoading({
          title: '加载中',
          mask: true,
        });
        wx.downloadFile({
          url: eve.currentTarget.dataset.filepath,
          success: function (res) {
            wx.hideLoading();
            const filePath = res.tempFilePath;
            wx.showLoading({
              title: '正在打开',
              mask: true,
            });
            wx.openDocument({
              filePath: filePath,
              showMenu: true,
              success: function (res) {
                console.log('打开文档成功');
              },
              fail: function () {
                uni.showToast({
                  title: '打开文件失败',
                  icon: 'none',
                  duration: 2000,
                });
              },
            });
          },
           fail(err) {
            console.error('PDF 下载失败', err);
          }
        });
    },
    onClickHide() {
      this.setData({ show: false });
    },
  },
});
