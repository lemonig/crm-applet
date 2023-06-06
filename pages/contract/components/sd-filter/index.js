// pages/contract/components/sd-filter/index.js
import { contractTypeList } from '../../../../api/contract';
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,

    range: [
      {
        id: 0,
        label: '全部',
        value: 0,
      },
      {
        id: 1,
        label: '我负责',
        value: 1,
      },
      {
        id: 2,
        label: '下属负责',
        value: 2,
      },
    ],
    //全部、东部大区、北部大区、南部大区
    appart: [
      //   {
      //     id: '1',
      //     label: '全部',
      //     value: '1',
      //     checked: false,
      //   },
      //   {
      //     id: '2',
      //     label: '东部大区',
      //     value: '3',
      //     checked: true,
      //   },
      //   {
      //     id: '3',
      //     label: '北部大区',
      //     value: '3',
      //     checked: false,
      //   },
      //   {
      //     id: '4',
      //     label: '南部大区',
      //     value: '4',
      //     checked: false,
      //   },
    ],
    //全部、工程、运维、贸易、其他
    types: [
    
    ],
    others: [
      {
        id: '1',
        label: '不看款清票清',
        value: '1',
        checked: false,
      },
    ],
    key:'',
    value: 0,
    // value1:0,
    value2: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    choseWrap(eve) {
      let id = eve.currentTarget.dataset.id;
      let res = this.data.range.find((ele) => ele.id == id);
      this.setData({
        value: res.id,
      });
    },
    choseWrap1(eve) {

    },
    choseWrap2(eve) {
      let id = eve.currentTarget.dataset.id;
      let res = this.data.types.find((ele) => ele.id == id);
      this.setData({
        value2: res.id,
      });
    },
    choseWrap3(eve) {
      let id = eve.currentTarget.dataset.id;
      let res = this.data.others.find((ele) => ele.id == id);
      console.log(res);
      res.checked = !res.checked;
      this.setData({
        others: [...this.data.others],
      });
    },

    deleteItem() {},
    search(event) {
      let { value, key,value2, others } = this.data;
      let otherType = others[0].cecked ? 1: 0;
      console.log(key,value,value2);
      var myEventDetail = {
        dataScope: value,
        contractType: value2,
        otherType:otherType,
        name: key,
      }; // detail对象，提供给事件监听函数
      var myEventOption = {}; // 触发事件的选项
      this.triggerEvent('filtercall', myEventDetail, myEventOption);
    },

    async getContractTypeList() {
        let { data } = await contractTypeList();
        this.setData({
          types: [{name:"全部",id:'0'}, ...data],
        });
      },
  },


  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.getContractTypeList();
    },
   
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
});
