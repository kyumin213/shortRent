// pages/houseManage/houseDescribe/houseDescribe.js
var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    des: '',
    desnums:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var housePkcode = options.housePkcode
    var complete = that.data.complete
    var houseStatus = that.data.houseStatus
    var describe = that.data.describe
    var device = that.data.bindDevice
    var desData = wx.getStorageSync('houseDes')
    console.log(desData)
    if (desData != '' || desData != null || desData!=undefined){
      that.setData({
        des: desData.des,
        desnums: desData.des.length,
        housePkCode: housePkcode
      })
    }else{
     that.setData({
       desnums: 0
     })
    }
  
    if (!complete || !houseStatus || !describe || device) {
      that.setData({
        com: false
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  preDescript: function (e) {
    var that=this
    var des = e.detail.value
    var houseArea = wx.getStorageSync('areaData')
    var houseType = wx.getStorageSync('houseTypeData')
    var houseData = wx.getStorageSync('houseData')
    var city = houseData.city
    var street = houseData.street
    var area = houseData.detailInfo
    var address = city + street + area
    let houseDetail = wx.getStorageSync('houseDetails')
    let houseDes = wx.getStorageSync('houseDes') || {}
    wx.setStorageSync('houseDes', des)
    let loginData = wx.getStorageSync('loginData')
    var housePkCode = that.data.housePkCode
    if (housePkCode == '' || housePkCode == null || housePkCode==undefined){
      wx.request({
        url: app.common_post_address + 'house/save',
        data: {
          userAccountPkcode: loginData.userAccountPkcode,
          houseCommunityName: houseData.detailInfo,
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
          let result = res.data
          if (result.success == "200") {
            let that = this
            app.showToast('添加成功', 'success', 1000)
            wx.removeStorage('houseDes')
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
    }else{
      wx.request({
        url: app.common_post_address + 'house/update',
        data: {
          userAccountPkcode: loginData.userAccountPkcode,
          houseCommunityName: houseData.detailInfo,
          houseNumberL: houseDetail.mp,
          houseDescribe: houseDes.des,
          houseAcreage: houseArea.houseArea,
          housePeopleNumber: houseArea.people,
          houseType: JSON.stringify(houseType),
          houseToilet: 2,
          houseBedNumber: 1,
          houseAddress: address,
          housePkcode: housePkCode
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success:function(res){
          let result = res.data
          if (result.success == "200") {
            let that = this
            app.showToast('添加成功', 'success', 1000)
            wx.removeStorage('houseDes')
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
    }

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