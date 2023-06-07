// pages/customer/components/link-man/index.js
import { linkmanInfo } from '../../../../api/linkman';
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据 排序：跟进时间（正反）、姓名首字母 搜索：按姓名、职务、单位、手机号码
   */
  data: {
    option1: [
      {
        text: '录入时间',
        value: 1,
      },
      {
        text: '姓名首字母',
        value: 2,
      },
    ],
    option2: [
      {
        text: '仅本人',
        value: 1,
      },
      {
        text: '我的下属',
        value: 2,
      },
      {
        label: '我及我下属的',
        value: '3',
      },
    ],
    value1: 1,
    value2: 1,

    pageData: [],
    isPage: false,
    pageNo: 1,
    loading: false,
    isAllData: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleToLower: function () {
      this.setData({
        loading: true,
        pageNo: this.data.pageNo + 1,
      });
      this.fetchData();
    },
    fetchData: async function () {
      let params = {
        data: {
          orderBy: this.data.value1,
          filterBy: this.data.value2,
        },
        page: this.data.pageNo,
        size: 10,
      };
      let { data } = await linkmanInfo(params);
      if (!data.length) {
        this.setData({
          isAllData: true,
        });
        return;
      }
      this.setData({
        loading: false,
        pageData: this.data.pageData.concat(data),
      });
    },

    sortChange1(eve) {
      this.setData({
        pageNo: 1,
        pageData: [],
        value1:eve.detail
      });
      this.fetchData();
    },
    sortChange2(eve) {
      this.setData({
        pageNo: 1,
        pageData: [],
        value2:eve.detail
      });
      this.fetchData();
    },

    gotoCustomer() {
      wx.navigateBack();
    },
    add() {
      wx.navigateTo({
        url: '/pages/linkman-form/index',
      });
    },
    edit(eve) {
      let id = eve.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/linkman-form/index?id=' + id,
      });
    },

    gotoDetail(eve) {
      let id = eve.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/linkman-detail/index?id=' + id,
      });
    },
  },
  ready: function () {
    this.fetchData();
  },
  detached(){
    this.setData({
      pageData: []
    });
  }
});
