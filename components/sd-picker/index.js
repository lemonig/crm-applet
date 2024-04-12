Component({
  behaviors: ['wx://form-field', 'wx://component-export'],

  properties: {
    title: {
      type: String,
    },
    options: {
      type: Array,
    },
    value: {
      type: String | Number,
      observer: function (newVal, oldVal) {
        let res = this.data.options.find((ele) => ele.value == newVal);
        if (res) {
          this.setData({
            label: res.label,
            value: res.value,
          });
        }
      },
    },
    required: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    show: false,
    // 分开，label留本地，val回传
    label: '',
    valIdx: '',

  },
  lifetimes: {
    created: function () {
     
       
    },
  },

  methods: {
    showPopup(e) {
        let idx = this.data.options.findIndex(ele => ele.value == this.data.value)?? 0
      this.setData({
        show: true,
        valIdx  :idx

      });
    },
    onClose() {
      setTimeout(() => {
        this.setData({
          show: false,
        });
      });
    },
    confirmPicker(event) {
      const { picker, value, index } = event.detail;
      this.setData({
        value: value.value,
        label: value.label,
        show: false,
      });
      this.triggerEvent('confirm', value);
    },
  },
});
