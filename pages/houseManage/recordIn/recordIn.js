// pages/houseManage/recordIn/recordIn.js
var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    housePkcode: '',
    userAccountPkcode: '',
    recordList: {},
    names:'',
    cardId:'',
    checkInTime:'',
    userCode:'',
    authen:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var housePkcode = options.housePkcode
    var userList = options.userCode
    var loginData = wx.getStorageSync("loginData")
    var userAccountPkcode = loginData.userAccountPkcode
    var count = loginData.userCertificationCount
    if(count==1){
      that.setData({
        authen:true
      })
    }
    that.setData({
      housePkcode: housePkcode,
      userAccountPkcode: userAccountPkcode,
      userCode: userList
    })
    that.CheckrecordInList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 入住记录列表
   */

  CheckrecordInList: function () {
    var that = this
    var housePkcode = that.data.housePkcode
    console.log(housePkcode)
    var userAccountPkcode = that.data.userAccountPkcode
    wx.request({
      url: app.common_post_address + '/house/findCheckInList',
      data: {
        'housePkcode': housePkcode,
        'userAccountPkcode': userAccountPkcode
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        var result = res.data
        var recordList=result.data
        if (result.success == '200') {
          that.setData({
            recordList: recordList,
            names: recordList.houseCheckInName
          })
        }
      }

    })

  },

  /**
   * 确认入住
   */
  checkIn: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var record = that.data.recordList
    var names = that.data.recordList[index].houseCheckInName
    var cardId = that.data.recordList[index].houseCheckInIdnumber
    var checkInTime = that.data.recordList[index].houseCheckInCtime
    var housePkcode = that.data.housePkcode
    var userCode=that.data.userCode
    wx.navigateTo({
      url: '../../confirmIn/confirmIn?names=' + names + '&cardId=' + cardId + '&checkInTime=' + checkInTime + '&housePkcode=' + housePkcode + '&userCode=' + userCode
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