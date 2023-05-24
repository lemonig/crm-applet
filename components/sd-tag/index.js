// components/sd-tags/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
    },

    color: {
      type: String,
    },
  },
  lifetimes: {
    attached() {
      console.log(this.properties);
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
});
