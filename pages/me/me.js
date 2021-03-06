// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    phoneNumber: '',
    switchBtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let pkCode = wx.getStorageSync('loginData')
    var phone = pkCode.wechatMiniUserMobile
    var phoneNumber = phone.substring(0, 3) + "****" + phone.substring(8, 11)
    that.setData({
      phoneNumber: phoneNumber
    })
    if (app.globalData.userInfo) {
      var that = this
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 房东房客切换
   */
  switchCheck: function (e) {
    var that = this
    var switchBtn = that.data.switchBtn
    if (switchBtn) {
      that.setData({
        switchBtn: false
      })
    } else {
      that.setData({
        switchBtn: true
      })
    }
  },

  /**
   * 身份认证
   */
  sendAuth: function () {
    wx.navigateTo({
      url: '../authen/authen'
    })
  },
  /**
   * 发送二维码
   */
  // sendCode: function () {
  //   wx.navigateTo({
  //     url: '../houseManage/twoCode/twoCode',
  //   })
  // },

  /**
   * 入住记录
   */
  recordInList: function () {
    wx.navigateTo({
      url: '../houseManage/recordIn/recordIn',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
function iphoneCheck(id) {
  var temp = document.getElementById("myText");
  var re = /^[1][34587]\d{9}$/;
  if (re.test(temp.value)) {
    return true;
  } else {
    return false;
  }
}