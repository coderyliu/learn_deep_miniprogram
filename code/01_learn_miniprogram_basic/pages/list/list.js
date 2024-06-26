// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    gridList: [],
    params: {},
  },
  //   获取轮播图
  getSwiperList() {
    wx.request({
      url: "https://www.escook.cn/slides",
      method: "GET",
      success: (res) => {
        //   console.log(res.data)
        this.setData({
          swiperList: res.data,
        });
      },
    });
  },
  //   获取九宫格数据列表
  getGridList() {
    wx.request({
      url: "https://www.escook.cn/categories",
      method: "GET",
      success: (res) => {
        //   console.log(res.data)
        this.setData({
          gridList: res.data,
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSwiperList();
    this.getGridList();
    this.setData({
      params: options,
    });
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
  onPullDownRefresh() {
    console.log("下拉刷新页面的事件被触发了!");
    wx.stopPullDownRefresh({
      success: (res) => {},
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
