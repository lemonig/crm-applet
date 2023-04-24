// components/nav-bar/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultData: {
      type: Object,
      value: {
        title: "crm"
      },
      observer: function (newVal, oldVal) {}
    },
    back: {
      type: Boolean,
      value: true,
    },
    title: {
      type: String,

    }
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
      wx.navigateBack({
        delta: 1
      })

    }
  }
})