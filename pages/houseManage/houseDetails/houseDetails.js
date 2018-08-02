// pages/houseManage/houseDetails/houseDetails.js
// var model = require('../../../utils/util.js')
var show = false
var app = getApp().globalData
var item = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaStatus: false,
    hasList: true,
    identity: false,
    complete: true,
    houseStatus: false,
    describe: false,
    bindDevice: false,
    com: false,
    address: false,
    property: false,
    src: '../../../image/house/house-bg2x.png',
    housePkcode: '',
    houseDetails: {},
    userAccountPkcode: '',
    housePkid: '',
    checkIn: false,
    checkArray: {},
    device:{},
    index: '',
    bindHouse:false

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var housePkcode = options.housePkcode
    var index = options.index
    let houseData = wx.getStorageSync('houseData')
    let houseDetail = wx.getStorageSync('houseDetails')
    let pkCode = wx.getStorageSync('loginData')
    let userAccountPkcode = pkCode.userAccountPkcode
    // var housePkcode = that.data.housePkcode
    that.setData({
      housePkcode: housePkcode,
      userAccountPkcode: userAccountPkcode,
      index: index
    })

    wx.request({
      url: app.common_post_address + 'house/findObj',
      data: {
        userAccountPkcode: userAccountPkcode,
        housePkcode: housePkcode
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        let result = res.data
        var details = result.data.houseInfo
        var checkArray = result.data.checkArray
        var device = result.data.platformDeviceArray
        var houseData = details.houseType
        var complete = that.data.complete
        if (result.success == '200') {
          that.setData({
            houseDetails: details,
            housePkid: details.housePkid,
            checkArray: checkArray,
            device: device
          })
          if (details.houseAddress != '') {
            that.setData({
              address: true
            })
          }
          if (details.houseDescribe != '') {
            that.setData({
              describe: true
            })
          }
          if (houseData.ws != '' && houseData.kt != '' && houseData.cf != '' && houseData.dwc != '' && houseData.gwc != '') {
            that.setData({
              houseStatus: true
            })
          }
          if (device.length != 0) {
            that.setData({
              bindDevice: true
            })
          }
          if (details.housePocImg != '') {
            that.setData({
              property: true
            })
          }
          if (details.houseAddress != '' && details.houseDescribe != '' && houseData.ws != '' && houseData.kt != '' && houseData.cf != '' && houseData.dwc != '' && houseData.gwc != '' && device.length != 0 && details.housePocImg != '' && complete) {
            that.setData({
              com: true
            })
          }

        }
      }
    })
  },



  // 删除

  houseDelete: function (e) {
    let that = this
    let houseData = wx.getStorageSync('houseData')
    let houseDetail = wx.getStorageSync('houseDetails')
    let pkCode = wx.getStorageSync('loginData')
    wx.request({
      url: app.common_post_address + 'house/deleteByPkcode',
      data: {
        userAccountPkcode: pkCode.userAccountPkcode,
        housePkcode: options.housePkcode
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        var result = res.data
        console.log(result)
        if (result.success == "200") {
          wx.showModal({
            title: '提示',
            content: '删除成功',
          })
        }
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {


  },
  /**
   * 查看房屋详情
   */
  viewDetails: function (e) {
    let pkCode = wx.getStorageSync('loginData')
    var housePkcode = this.data.housePkcode
    wx.request({
      url: app.common_post_address + 'house/findObj',
      data: {
        userAccountPkcode: pkCode.userAccountPkcode,
        housePkcode: housePkcode
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        let result = res.data
        if (result.success == '200') {
          if (result.data.length > 0) {
            that.setData({
              hasList: true,
              houseStatus: true,
              describe: true,
            })
          }
        }
      }
    })
  },
  /**
   * 解除绑定
   */

  unbindHouse:function(){
    var that=this;
    var pkCode = wx.getStorageSync('loginData')
    var housePkCode = that.data.housePkcode
    var deviceCode=that.data.device
    var index=that.data.index
    var platformDevicePkcode = deviceCode[index].platformDevicePkcode
    wx.request({
      url: app.common_post_address + '/device/untied',
      data:{
        userAccountPkcode: pkCode.userAccountPkcode,
        housePkcode: housePkCode,
        platformDevicePkcode: platformDevicePkcode
      },
      method:'POST',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        var result=res.data
        if(result.success=='200'){
          wx.showToast({
            title: '解绑成功',
            icon:'success',
            duration:2000
          })
        }else{
          wx.showToast({
            title: '解绑失败',
            icon:'none',
            duration:2000
          })
        }
      }
    })
  },
  /**
   * 房屋信息
   */
  houseStatus: function () {
    wx.navigateTo({
      url: '../houseStatus/houseStatus',
    })
  },
  /**
   * 设备绑定
   */
  bindDevice: function (e) {
    var housePkcode = this.data.housePkcode
    wx.navigateTo({
      url: '../bindDevice/bindDevice?housePkcode=' + housePkcode,
    })
  },
  /**
   * 房屋描述
   */
  houseDes: function () {
    wx.navigateTo({
      url: '../houseDescribe/houseDescribe',
    })
  },
  /**
   * 基本设备
   */
  setting: function () {
    wx.navigateTo({
      url: '../houseSetting/houseSetting',
    })
  },

  /**
   * 房产证认证
   */
  property: function (e) {
    var that = this
    var housePkid = that.data.housePkid
    wx.navigateTo({
      url: '../property/property?housePkid=' + housePkid,
    })
  },
  /**
 * 发送二维码
 */
  sendCode: function (e) {
    var housePkcode = this.data.housePkcode
    var userAccountPkcode = this.data.userAccountPkcode
    wx.navigateTo({
      url: '../twoCode/twoCode?housePkcode=' + housePkcode,
    })
  },
  /**
   * 申请入住
   */

  recordIn: function (e) {
    var that = this
    var housePkcode = that.data.housePkcode
    var index = that.data.index
    console.log(index)
    var userList = that.data.checkArray
    var userCode = userList[index].userAccountPkcode
    if (userList == '' && userList == null) {
      wx.showToast({
        title: '信息未完善',
        icon: 'none',
        duration: 1000
      })
    } else {

      wx.navigateTo({
        url: '../recordIn/recordIn?housePkcode=' + housePkcode + '&userCode=' + userCode,
      })
    }

  },
  /**上传门锁照片 */
  uploadImg: function (e) {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          src: tempFilePaths
        })
      },
    })
  },

  // 弹窗确认
  modalSubmit: function (e) {
    this.setData({
      area: e.detail.value
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
