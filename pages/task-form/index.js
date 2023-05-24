import dayjs from "dayjs"
import {formatTime} from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleProps: {
      title: "任务"
    },
    id: undefined,
    btnLoad: false,
    optionsOrg: [{
        label: '政府',
        value: '1'
      },
      {
        label: '国企',
        value: '2'
      },

    ],
    optionsPri: [{
        label: '浙江',
        value: '1'
      },
      {
        label: '江苏',
        value: '2'
      },

    ],
    form: {
      name: "",
      orgId: "",
      dealId: "",
      startTime:"",
      endTime:'',
      dealName:'',
      phone: "",
      email: "",
      department: "",
      jobTitle: "",
      description: "",
      gender: "",
      isKdm: "",
      status:true,
      tipme:''
    },
    location: {},
    status: false,
  },


  formSubmit: function (e) {
    this.setData({
      btnLoad: true
    })
    console.log(e.detail.value)
    let params = e.detail.value
    params.status = this.data.status
    let {
      description,
      title,
      value
    } = e.detail.value
    wx.addPhoneCalendar({
      title,
      startTime:dayjs(this.data.tipme).unix(),
      endTime:dayjs(this.data.tipme).add(1,'day').unix(),
      success(){
        wx.showToast({
          title: '添加日程成功',
        })  
        setTimeout(() => {
          wx.showToast({
            title: '添加日程失败',
          })  
          this.setData({
            btnLoad: false
          })
        }, 2000)
      },
      fail(){
        
      }

    })

  },
  onChooseLocation () {
		wx.chooseLocation({
      success: (res) => {
        console.log(res);
				this.setData({
					location: res
				});
			}
		});
  },
  onTaskChange({ detail }) {
    console.log(!detail);
    this.setData({
     status:detail
    })
  },
  gotoBusiness() {
    wx.navigateTo({
      url: '/pages/search/business-select/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {
      id,
      dealId,
      dealName,
    } = options
    console.log(options);
    if ("id" in options) {
      this.setData({
        id,
        titleProps: {
          title: `编辑任务`
        },
        form: {
          address: "浙江",
          base: "1",
          creditCode: "cs23",
          description: "请我吃饭",
          name: "客户",
          orgType: "1",
        }
      })
      wx.showToast({
        title: 'id为'+ id,
      })
    } else {
      this.setData({
        titleProps: {
          title: "新建任务",
        },
        form: {
          ...this.data.form,
          dealId: dealId,
          dealName:dealName,
        }
      })

    }

    // TODO 请求联系人详情
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听联系人下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 联系人点击右上角分享
   */
  onShareAppMessage() {

  },

})