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
    isOwner:{
      type:Boolean
    }
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
        if(!this.data.isOwner){
            return
        }
      let {text,url,key} = eve.currentTarget.dataset;
      let urlAll = `/pages/deal-detail/page/deal-form-${url}/index?dealid=` + this.properties.dealId;
      if(url == 'pro') urlAll+= '&post=true'
      wx.navigateTo({
        url: urlAll,
      });
    },
    gaotoDetail(eve){
        if(!this.data.isOwner){
            return
        }
        let {text,url,id} = eve.currentTarget.dataset;

        let urlAll = `/pages/deal-detail/page/deal-detail-${url}/index?id=` + id;
        wx.navigateTo({
          url: urlAll,
        });
    }
  },
});
