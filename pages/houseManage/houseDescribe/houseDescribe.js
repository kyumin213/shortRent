// pages/houseManage/houseDescribe/houseDescribe.js
var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    des: {},
    desnums:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let complete = that.data.complete
    let houseStatus = that.data.houseStatus
    let describe = that.data.describe
    let device = that.data.bindDevice
    let des = wx.getStorageSync('houseDes')
    if (!complete || !houseStatus || !describe || device) {
      that.setData({
        com: false
      })
    }
    that.setData({
      des: des,
      desnums:des.length
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  preDescript: function (e) {
    let des = e.detail.value
    let houseArea = wx.getStorageSync('areaData')
    let houseType = wx.getStorageSync('houseTypeData')
    // let types=houseType.toString()
    let houseData = wx.getStorageSync('houseData')
    var city = houseData.city
    var street = houseData.street
    var area = houseData.area
    var address = city + street + area
    let houseDetail = wx.getStorageSync('houseDetails')
    let houseDes = wx.getStorageSync('houseDes') || {}
    wx.setStorageSync('houseDes', des)
    let loginData = wx.getStorageSync('loginData')

    wx.request({
      url: app.common_post_address + 'house/save',
      data: {
        userAccountPkcode: loginData.userAccountPkcode,
        houseCommunityName: houseDetail.xq,
        houseNumberL: houseDetail.mp,
        houseDescribe: houseDes.des,
        houseAcreage: houseArea.houseArea,
        housePeopleNumber: houseArea.people,
        houseType: JSON.stringify(houseType),
        houseToilet: 2,
        houseBedNumber: 1,
        houseAddress: address
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        let result = res.data
        if (result.success == "200") {
          let that = this
          app.showToast('添加成功', 'success', 1000)
          wx.navigateTo({
            url: '../houseDetails/houseDetails',
          })
        } else {
          console.log(res.data.message)
        }
      }, fail: function () {
        app.showToast('添加失败，请重试！', 'none', 1000)
      }
    })
  },

  /**
   * 输入字数
   */
  desNums: function (e) {
    var that=this
    var des = e.detail.value
    var houseDes = wx.getStorageSync('houseDes') || {}
    wx.setStorageSync('houseDes', des)
    that.setData({
      desnums: des.length
    })
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