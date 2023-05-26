// pages/deal-detail/stage/index.js
import {  listPipelineStagePlus} from "../../../api/deal";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      list: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoPipeline() {
      wx.navigateTo({
        url: '/pages/pipeline-select/index',
      })
    },
  }
})