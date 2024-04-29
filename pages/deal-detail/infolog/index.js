// pages/customer-detail/infolog/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {
    dealId: {
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
    steps:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {},
  lifetimes: {
    created: function () {
    },
    attached: function () {
     this.data.steps =  this.data.pageData.map(item=>{
        return  {
            text: item.message,
            desc: item.createTime,
            inactiveIcon: 'circle',
            activeIcon: 'circle',
          }
      })
      this.setData({
          steps: this.data.steps
      })
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
});
