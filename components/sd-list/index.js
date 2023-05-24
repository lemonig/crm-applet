// components/sd-list/index.js
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    border: {
      type: Boolean,
      value:true
    },
    title: {
      type: String
    },
    value: {
      type: String
    },
    lab1: {
      type:String
    },
    desc1: {
      type:String
    },
    lab2: {
      type:String
    },
    desc2: {
      type:String
    },
    lab3: {
      type:String
    },
    desc3: {
      type:String
    }
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
    onClick: function (event) {
      this.triggerEvent('click', event.detail)
  },
  }
})
