// pages/deal/components/sd-filter/index.js
import dayjs from 'dayjs';
import { contractTypeList } from '../../../../api/contract';
import { range, yearListFun } from './dataColum';
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

    range: range,
    //全部、东部大区、北部大区、南部大区
    appart: [],
    //全部、工程、运维、贸易、其他
    types: [
        { name: '全部', id: '0' }
    ],
    others: [
      {
        id: '1',
        label: '不看款清票清',
        value: '1',
        checked: false,
      },
    ],
    key: '',
    value: 0,
    // value1:0,
    value2: 0,
    beginTime: new Date().getFullYear(),
    endTime: new Date().getFullYear(),
    yearList: yearListFun(),
    showPicker:false,
    showPicker1:false,
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
      res.checked = !res.checked;
      this.setData({
        others: [...this.data.others],
      });
    },

    deleteItem() {

      this.setData({
        value: 0,
        value2: 0,
        key: '',
        beginTime: new Date().getFullYear() ,
        endTime: new Date().getFullYear(),
      })
    },
    search(event) {
      let { value, key, value2, beginTime, endTime } = this.data;
      var myEventDetail = {
        dataScope: value,
        contractType: value2,
        name: key,
        beginTime: beginTime ,
        endTime: endTime,
      };
      // detail对象，提供给事件监听函数
      var myEventOption = {}; // 触发事件的选项
      this.triggerEvent('filtercall', myEventDetail, myEventOption);
    },

    async getContractTypeList() {
      let { data } = await contractTypeList();
      if(data.length){
        this.setData({
            types: [...this.data.types, ...data],
          });
      }
    
    },
    // 选年份
    showPopup(e) {
      this.setData({
        showPicker: true,
      });
    },
    onClose() {
      this.setData({
        showPicker: false,
      });
    },
    confirmPicker(event) {
      const { picker, value, index } = event.detail;
      this.setData({
        beginTime: value,
        showPicker: false,
      });
    },
    showPopup1(e) {
      this.setData({
        showPicker1: true,
      });
    },
    onClose1() {
      this.setData({
        showPicker1: false,
      });
    },
    confirmPicker1(event) {
      const { picker, value, index } = event.detail;
      this.setData({
        endTime: value,
        showPicker1: false,
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
