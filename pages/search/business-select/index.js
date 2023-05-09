// index.js
// 获取应用实例
const app = getApp()
import Notify from '@vant/weapp/notify/notify';
import { list as getDealList } from '../../../api/deal';
Page({
  data: {
    loading: false,
    titleProps: {
      title: "商机",
    },
    //  请求列表数据类型
    dataType: '',
    key: '',
    list: [],
    filterList: [],
    indexList: []
  },
  //  页面加载事件
  onLoad (options) {
    if (!options.dataType) return Notify({ type: 'warning', message: '未获取到数据类型' })
    this.setData({
      dataType: options.dataType
    })
  },
  //  页面显示事件
  onShow () {
    if (!this.data.dataType) return Notify({ type: 'warning', message: '未获取到数据类型' })
    this.fetchData()
  },
  //  获取页面数据
  fetchData () {
    getDealList().then(({  }) => {
      const data = [
        {
          id: "1",
          key:'1',
          name: '111',
          value:'11'
        }
        
      ]
      const list = []
      const indexList = []
      for (let key in data) {
        list.push({
          key,
          list: data[key].map(item => {
            item.label = item.name
            return item
          })
        })
        indexList.push(key)
      }
      this.setData({
        list,
        filterList: list,
        indexList,
        show: true
      })
    }).catch(err => {
      console.log(err)
    })
    
  },
  //  站点列表点击事件
  handleSiteClick (event) {
   
      
  },
  //  搜索数组过滤
  handleListFilter (event) {
    const key = event.detail
    const reg =  new RegExp(key)
    const filterList = []
    this.data.list.map(l => {
      const sList = []
      l.list.map(site => {
        if (reg.test(site.label)) sList.push(site)
      })
      filterList.push({
        key: l.key,
        list: sList
      })
    })
    this.setData({
      key,
      filterList
    })
  },
// delete
  seDxxxx(eve){
    var pages = getCurrentPages()
    var prePages = pages[pages.length - 2]
    prePages.setData({
      "form.dealId":eve.currentTarget.dataset.id,
      "form.dealName":eve.currentTarget.dataset.data
    })
    wx.navigateBack({
      delta: 1
    })
  }

})
