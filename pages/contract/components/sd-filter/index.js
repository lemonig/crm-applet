// pages/contract/components/sd-filter/index.js
const app = getApp()
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
  navBarHeight: app.globalData.navBarHeight,

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
  
    ],
    //全部、东部大区、北部大区、南部大区
    appart: [
      {
        id:"1",
        label: '全部',
        value: '1',
        checked:false,
      },
      {
        id:"2",
        label: '东部大区',
        value: '3',
        checked:true,
      },
      {
        id:"3",
        label: '北部大区',
        value: '3',
        checked:false,
      },
      {
        id:"4",
        label: '南部大区',
        value: '4',
        checked:false,
      },
    ],
    //全部、工程、运维、贸易、其他
    types: [
      {
        id:"1",
        label: '全部',
        value: '1',
        checked:false,
      },
      {
        id:"2",
        label: '工程',
        value: '3',
        checked:true,
      },
      {
        id:"3",
        label: '贸易',
        value: '3',
        checked:false,
      },
      {
        id:"4",
        label: '其他',
        value: '4',
        checked:false,
      },
    ],
    others: [
      {
        id:"1",
        label: '不看款清票清',
        value: '1',
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
    choseWrap1(eve) {
      let id = eve.currentTarget.dataset.id
      let res = this.data.appart.find(ele => ele.id == id)
      console.log(res);
      res.checked = !res.checked
      this.setData({
        appart:[...this.data.appart]
      })
    },
    choseWrap2(eve) {
      let id = eve.currentTarget.dataset.id
      let res = this.data.types.find(ele => ele.id == id)
      console.log(res);
      res.checked = !res.checked
      this.setData({
        types:[...this.data.types]
      })
    },
    choseWrap3(eve) {
      let id = eve.currentTarget.dataset.id
      let res = this.data.others.find(ele => ele.id == id)
      console.log(res);
      res.checked = !res.checked
      this.setData({
        others:[...this.data.others]
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
