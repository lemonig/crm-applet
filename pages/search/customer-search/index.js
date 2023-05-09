// pages/search/customer-search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        titleProps: {
            title: '选择客户'
        },
        key: '',
        options: [{
                name: "圣力控股集团杭州开关有限公",
                value: "1",
            },
            {
                name: "虎牌伊顿开关（杭州）有限",
                value: "2",
            },
            {
                name: "杭州电器开关有限公",
                value: "3",
            },
            {
                name: "宝开关（杭州）有限公",
                value: "4",
            },
            {
                name: "高田开关（杭州）有限公",
                value: "5",
            }
        ],
        btnLoad: false,
        value: ''

    },
    onSelect(event) {
        console.log(event);
        this.setData({
            value: event.currentTarget.dataset.value
        })

    },

    comfirm() {
        console.log(this.data.value);
        var pages = getCurrentPages()
        var prePages = pages[pages.length - 2]
        prePages.setData({
            "form.name": this.data.value
        })
        wx.navigateBack({
            delta: 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      console.log(options);
        this.setData({
            key: options.text
        })
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})