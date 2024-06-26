// components/loading.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    colorList: [],
  },
  //   获取颜色数组
  getColor() {
    wx.showLoading({
      title: "数据正在加载中...",
    });
    this.setData({
      isLoading: true,
    });
    wx.request({
      url: "https://www.escook.cn/api/color",
      method: "GET",
      success: (res) => {
        this.setData({
          colorList: [...this.data.colorList, ...res.data.data],
        });
      },
      complete: () => {
        this.setData({
          isLoading: false,
        });
        wx.hideLoading();
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getColor();
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
  onReachBottom() {
    if (this.data.isLoading) return;
    this.getColor();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
