// pages/deal-detail/record/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type:String
    },
    pageData:{
      type:Object,
      observer: function (newVal, oldVal) {

        console.log(newVal);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tableHeader1: [{
      prop: 'name',
      width: 300,
      label: '名称'
    },
    {
      prop: 'value',
      width: 200,
      label: '金额'
    }, {
      prop: 'rate',
      width: 200,
      label: '比例',
      color: '#55C355'
    },
  ],
    tableHeader2: [{
      prop: 'invoiceIssuer',
      width: 300,
      label: '开票人'
    },
    {
      prop: 'invoiceDate',
      width: 200,
      label: '开票日期'
    }, {
      prop: 'invoiceValue',
      width: 200,
      label: '发票金额',
      color: '#55C355'
    },
  ],
    tableHeader3: [{
      prop: 'paymentDate',
      width: 300,
      label: '收款日期'
    },
    {
      prop: 'paymentValue',
      width: 400,
      label: '收款金额'
    }
  ],
    tableHeader4: [{
      prop: 'deductionDate',
      width: 300,
      label: '扣款日期'
    },
    {
      prop: 'deductionValue',
      width: 200,
      label: '扣款金额'
    },
    {
      prop: 'deductionDescription',
      width: 200,
      label: '扣款备注'
    }
  ],
  stripe: true,
  border: true,
  outBorder: true,
  row1: [{
    "id": '合同额',
    "status": '6356',
    "datetime": "20%",

  }, {
    "id": '实际合同额',
    "status": '30402',
    "datetime": "20%",

  }, {
    "id":'已回款',
    "status": '30',
    "datetime": "30%",
  },
  {
    "id":'未收款',
  },
  {
    "id":'已开票',
  },
  {
    "id":'已开票未收',
  },
  {
    "id":'应收未收',
  },
  {
    "id":'未开票',
  },
  {
    "id":'质保金',
  },
  {
    "id":'扣款额',
  },

],
  row2: [{
    "id": "刘则宇",
    "status": '2022-12-08',
    "datetime": "464,601.77",
  },{
    "id": "刘则",
    "status": '2022-12-08',
    "datetime": "464,551.77",
  },],
  row3: [{
    "id": 1,
    "status": '2022-12-08',
    "datetime": "464,601.77",

  },
  {
    "id": 2,
    "status": '2022-2-08',
    "datetime": "464,641.77",

  },

],
  row4: [{
    "c": '质量问题  ',
    "a": '2022-12-08',
    "b": "464,601.77",

  },


],


  msg: '暂无数据',
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addDeal(events) {
      wx.navigateTo({
        url: "/pages/task-form/index?id="+ this.properties.id,
        events: events,
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    }
  }
})
