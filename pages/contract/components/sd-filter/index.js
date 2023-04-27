// pages/contract/components/sd-filter/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    range: [
      {
        id:"1",
        label: '全部',
        value: '1',
        checked:false,
      },
      {
        id:"2",
        label: '我负责',
        value: '3',
        checked:true,
      },
      {
        id:"3",
        label: '下属负责',
        value: '3',
        checked:false,
      },
  
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    choseWrap(eve) {
      let id = eve.currentTarget.dataset.id
      let res = this.data.range.find(ele => ele.id == id)
      console.log(res);
      res.checked = !res.checked
      this.setData({
        range:[...this.data.range]
      })
    },
    deleteItem() {
      
    },
    search(event) {
      var myEventDetail = {
        value: '1'
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('filtercall', myEventDetail, myEventOption)
    }
  }
})
