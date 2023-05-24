import {formatTime } from "../../utils/util"
const dayjs = require('dayjs') 

Component({
  behaviors: ['wx://form-field'],
  properties: {
    title: {
      type: String
    },
    options: {
      type: Array
    },
    value: {
      type: String | Number,
      observer: function (newVal, oldVal) {}
    },
    required: {
      type: Boolean,
      value: false
    },
    formated: {
      type: String,
      value:''
    },
    type:{
      type: String,
      value:"date"
    }
  },
  data: {
    show: false,
    value: "",
    // 分开，label留本地，val回传
    label: "",
    valIdx: "",
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2008, 1, 1).getTime(),
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
  },
  lifetimes: {
    ready: function () {
      // FIXEDME此处因为生命周期加载两次
      let res = this.data.options.find(ele => ele.value == this.properties.value)
      if (res) {
        this.setData({
          label: res.label,
          value: res.value
        })
      }
    },
  },

  methods: {
    showPopup(e) {
      this.setData({
        show: true
      });
    },
    onClose() {
      this.setData({
        show: false
      });
    },
    confirmPicker(event) {
  
      let time = dayjs(event.detail).format(this.properties.formated) 
      this.setData({
        value: time,
        label:time,
        show: false
      })
    }
  },
})