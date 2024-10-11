import { taskInfo } from '../api/home';
const app = getApp();
Component({
  data: {
    active: 0,
    taskNum: 1,
    list: [
      {
        icon: 'wap-home-o',
        text: '首页',
        url: 'pages/home/index',
        dot: false,
      },
      {
        icon: 'balance-o',
        text: '商机',
        url: 'pages/deal/index',
        dot: false,
      },
      {
        icon: 'friends-o',
        text: '客户',
        url: 'pages/customer/index',
        dot: false,
      },
      {
        icon: 'todo-list-o',
        text: '任务',
        url: 'pages/task/index',
        dot: false,
        info: true,
      },
      {
        icon: 'orders-o',
        text: '合同',
        url: 'pages/contract/index',
        dot: false,
      },
    ],
    theme: {
      custom: {
        colorPrimary: '#333',
      },
    },
  },

  methods: {
    onChange(event) {
      this.setData({
        active: event.detail,
      });
      wx.switchTab({
        url: this.data.list[event.detail].url.startsWith('/')
          ? this.data.list[event.detail].url
          : `/${this.data.list[event.detail].url}`,
      });
      // wx.switchTab({
      // 	url: this.data.list[event.detail].url
      // });
    },
    lifetimes: {
      attached: function () {
        // 在组件实例进入页面节点树时执行
      },
  
    },
    pageLifetimes: {
      show: function() {
        // 页面被展示
        console.log('bar');
      },
  
    },
    async getRelaInfo() {
      try {
        let { data ,success} = await taskInfo();
        if(success){
          this.setData({
            taskNum: data.undoneActivityCount
          })
        }
      } catch (error) { }
    
 
    },

    init() {
      this.getRelaInfo()
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) => (item.url.startsWith('/') ? item.url.substr(1) : item.url) === `${route}`,
      );
      this.setData({
        active,
      });
    },
  },
});
