// app.js
import {wxLogin  } from "./api/user";
import Monitor from './utils/monitor';
App(
  Monitor.hookApp({
    onError(err) {
        console.log('进入onError:', err);
    },
    onLaunch() {
      // 展示本地存储能力
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
  
      const that = this;
      // 获取系统信息
      const systemInfo = wx.getSystemInfoSync();
      // 胶囊按钮位置信息
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
      // 导航栏高度 = 状态栏高度 + 44
      that.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
      that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
      that.globalData.menuTop = menuButtonInfo.top;
      that.globalData.menuHeight = menuButtonInfo.height;
  
    
    },
    globalData: {
      userInfo: null,
      globalData: {
        navBarHeight: 0, // 导航栏高度
        menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
        menuTop: 0, // 胶囊距底部间距（保持底部间距一致）
        menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
      },
      taskNum: 0, //任务数量标记
  
    }
  })
)