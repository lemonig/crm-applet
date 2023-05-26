// pages/deal-detail/info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dealId: {
      type: String,
    },
    pagaDate: {
      type: Object,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    productList: [],
    oppoList: [],
    agentList: [],
    conList: [],
    contList: [],
  },
  lifetimes: {
    attached() {
     
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoEdit(eve) {
      let {text,url,key} = eve.currentTarget.dataset;
      let selectedList = this.properties.pagaDate[text]
      console.log(selectedList);
      let idList = selectedList.map(item => item[key])
      console.log(this.properties.id);
      let urlAll = `/pages/deal-detail/page/deal-detail-${url}/index?dealId=` + this.properties.dealId+ '&selected='+ idList.join();
      if(url == 'pro'){
        urlAll+= '&post=true'
      }
      wx.navigateTo({
        url: urlAll,
      });
    },
  },
});
