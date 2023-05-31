// components/select/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    open: {
      type: Boolean
    },
    options: {
      type: Array
    },
    value: {
      type: String | Number
    },
    height:{
      type: Number | String,
      value: 30
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pagedata: [{
      type: "",
      project: "",

    }]

  },




  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
        open: false
      });
    },
    onSelect(event) {
      var myEventDetail = {
        value: event.currentTarget.dataset.value,
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      // console.log(this.data.options);
    },
    moved: function () {},
    detached: function () {},
  },
})