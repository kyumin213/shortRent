// pages/index/getPhoneNumber/getPhoneNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  getPhoneNumber: function (e) {
    if (e.detail.encryptedData) {
      wx.showLoading({
        title: '发送中，请稍后',
      })
      getApp().globalData.temporaryLogin(e.detail.encryptedData, e.detail.iv)
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您拒绝了授权微信绑定手机号，允许授权后将为您自动登陆',
      })
    }
  }
})