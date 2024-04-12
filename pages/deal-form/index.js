import { debounce } from './../../utils/util';
import { addDeal, updateDeal, detailDeal, listPipelineStage } from '../../api/deal';
import { linkmanInfo } from '../../api/linkman';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: '',
    },

    form: {
      title: '',
      code: '',
      orgId: '',
      orgName: '',
      pipelineStageId: '',
      value: '0.0',
      description: '',
      probability: 50,
      isFinalOrg: true,
      personList: [],
      personName: '',
      productList: '',
      businessType: '1',
      probability:50,
    },
    currentValue: 50,

    columnsCustom: [],

    columnsStage: [],

    columnsUser: [
      {
        label: '是',
        value: true,
      },
      {
        label: '否',
        value: false,
      },
    ],
    columnScore: [
      {
        label: '90%',
        value: 90,
      },
     
      {
        label: '70%',
        value: 70,
      },
     
      {
        label: '50%',
        value: 50,
      },
     
      {
        label: '30%',
        value: 30,
      },
     
      {
        label: '10%',
        value: 10,
      },
     
    ],
    columnsLink: [],
    columnsSale: [
      {
        label: '普通业务',
        value: 1,
      },
      {
        label: '拓展业务',
        value: 2,
      },
    ],
    // columnsIndex: [],
    // columnsPro: [],

    btnLoad: false,
    productMsg: [],
    linkmanMsg: [],
    personName: '',
    dealMoney:'0'
  },

  async getListPipelineStage() {
    let { data } = await listPipelineStage();

    return data;
  },

  showPopup(e) {
    let idx = e.currentTarget.dataset.index;
    this.setData({
      ['show' + idx]: true,
    });
  },

  onClose() {
    // this.setData({
    //   show1: false,
    //   show2: false,
    //   show3: false,
    //   show4: false,
    //   show5: false,
    //   show6: false,
    //   show7: false,
    // });
  },

  sliderChange(event) {
    this.setData({
      currentValue: event.detail.value,
    });
  },
  formSubmit: async function (e) {
    this.setData({
      btnLoad: true,
    });

    let params = e.detail.value;
    params.orgId = this.data.form.orgId;
    params.dealProductList = this.data.productMsg;
    params.personList = this.data.linkmanMsg;
    // params.probability = this.data.currentValue;

    if (this.data._id) {
      params.id = this.data._id;
      var { success,message } = await updateDeal(params);
    } else {
      var { success ,message} = await addDeal(params);
    }
    this.setData({
      btnLoad: false,
    });
    if (success) {
      wx.showToast({
         title: message,
      });
      wx.navigateBack();
    }
  },

  selectCus() {
    wx.navigateTo({
      url: '/pages/search/customer-select/index',
    });
  },
  selectLinkman() {
    wx.navigateTo({
      url:
        '/pages/search/linkman-select/index?orgId=' +
        this.data.form.orgId +
        '&selected=' +
        this.data.linkmanMsg.join(''),
    });
  },
  selectProduct() {
    let url = '/pages/deal-detail/page/deal-detail-pro/index';
    if (this.data.productMsg.length) {
      url = url + '?selected=' + JSON.stringify(this.data.productMsg);
    }
    wx.navigateTo({
      url,
    });
  },

  fetchData: async function () {
    let { data } = await detailDeal({
      id: this.data._id,
    });
    this.setData({
      data,
      form: data.baseInfo,
      productMsg: data.relatedInfo.products,
      linkmanMsg: data.baseInfo.personList,
      currentValue: data.baseInfo.probability,
      dealMoney: data.baseInfo.value / 10000

    });
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getLinkman();
    let { id } = options;
    this.pageInit(id);
  },
  pageInit: async function (id) {
    let res = await this.getListPipelineStage();
    this.setData({
      _id: id,
      titleProps: {
        title: `${id ? '编辑' : '新建'}商机`,
      },
      columnsStage: res.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      'form.pipelineStageId': id ? '' : res[0].id,
    });

    if (id) this.fetchData();
  },
   digitToChinese:function(num) {
    var digitArr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unitArr = ['元', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟'];
    var decimalArr = ['角', '分'];

    var numStr = num.toString();
    var parts = numStr.split('.');
    var integerPart = parts[0];
    var decimalPart = parts[1] ? parts[1].substr(0, 2) : '';

    var result = '';

    // 处理整数部分
    var integerLength = integerPart.length;
    for (var i = 0; i < integerLength; i++) {
        var digit = parseInt(integerPart[i]);
        var unit = integerLength - i - 1;
        result += digitArr[digit] + unitArr[unit];
    }

    // 处理小数部分
    if (decimalPart) {
        for (var j = 0; j < decimalPart.length; j++) {
            var digit = parseInt(decimalPart[j]);
            result += digitArr[digit] + decimalArr[j];
        }
    } else {
        result += '整';
    }

    return result;
},
onMoneyChange(event) {
    // event.detail 为当前输入的值
   let res =  this.digitToChinese(event.detail)
   this.setData({
    dealMoney: event.detail / 10000
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
