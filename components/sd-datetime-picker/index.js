import {formatTime } from "../../utils/util"
const dayjs = require('dayjs') 

Component({
  behaviors: ['wx://form-field'],
  properties: {
    title: {
      type: String
    },

    value: {
      type: String | Number,
      observer: function (newVal, oldVal) {
        if(newVal){
          this.setData({
            value: dayjs(newVal).valueOf(),
            label:dayjs(newVal).format(this.properties.formated)
          })
        }
      },
      value: dayjs().valueOf()
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
    },
    overlay:{
      type:Boolean,
      value: true
    }
  },
  data: {
    show: false,
    // 分开，label留本地，val回传
    label: "",
    valIdx: "",
    minHour: 10,
    maxHour: 20,
    minDate: dayjs('2008-01-01').valueOf(),
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