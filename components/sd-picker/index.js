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
    }
  },
  data: {
    show: false,
    value: "",
    // 分开，label留本地，val回传
    label: "",
    valIdx: ""
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
      const {
        picker,
        value,
        index
      } = event.detail;
      this.setData({
        value: value.value,
        label: value.label,
        show: false
      })
    }
  },
})