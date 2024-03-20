// components/nav-bar/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true,
  },
  properties: {
    defaultData: {
      type: Object,
      value: {
        title: '',
      },
      observer: function (newVal, oldVal) {},
    },
    back: {
      type: Boolean,
      value: true,
    },
    title: {
      type: String,
    },
    isCusBack: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuTop: app.globalData.menuTop,
    menuHeight: app.globalData.menuHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goback: function () {
      if (this.data.isCusBack) {
        this.triggerEvent('customBack');
        return;
      }
      wx.navigateBack({
        delta: 1,
      });
    },
  },
});
