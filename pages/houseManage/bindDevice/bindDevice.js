// pages/houseManage/bindDevice/bindDevice.js
var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seriesid:'',
    deviceName:'',
    proData:'',
    bind:false,
    houseid: undefined,
    deviceid: undefined,
    userPkcode:'',
    devicePkcode: '',
    deviceData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var bindStatus = options.bindStatus
    var that=this
    that.setData({
      houseid: options.housePkcode,
    })
    if (bindStatus){
      this.loadFindDevice()
      that.setData({
        bind:true
      })
    }else {
      that.setData({
        bind: false
      })
    }
   
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
   * 查询设备信息
   * 设备id存入this.data中
   */
  loadFindDevice: function (e) {
    var that=this
    var housePkcode = this.data.houseid
    let pkCode = wx.getStorageSync('loginData')
    var userAccountPkcode = pkCode.userAccountPkcode
    wx.request({
      url: app.common_post_address+"/device/findObj",
      data: {
        houseid: housePkcode,
        userAccountPkcode: userAccountPkcode
      },
      
      method: "POST",
      success: function (rs) {
        var result = rs.data;
        if (result.success == "200") {
          that.setData({
            deviceid: result.data.platformDeviceSn,
            deviceName: result.data.platformDeviceName,
            devicePkcode: result.data.platformDevicePkcode
          })
          if(result.data!=''){
            that.setData({
              bind:true,
              hasDeviceName:true
            })
          }
       
          //成功 设备信息在 result.data
        } else {
          //失败 result.message
        }
      }
    })
  },
  /**
   * 绑定设备
   */
  bindDevice: function (e) {
    var that=this
    let pkCode = wx.getStorageSync('loginData')
    var userAccountPkcode = pkCode.userAccountPkcode
    // console.log(userAccountPkcode)
    var platformDeviceName = e.detail.value.deviceName
    var deviceSn = e.detail.value.series
    that.setData({
      deviceid:deviceSn
    })
    var platformDeviceSn = this.data.deviceid
    
    var housePkcode = this.data.houseid

    wx.request({
      url: app.common_post_address+ "/device/tied",
      data: {
        platformDeviceSn: platformDeviceSn,
        userAccountPkcode: userAccountPkcode,
        housePkcode: housePkcode,
        platformDeviceName: platformDeviceName
      },
      method: "POST",
      success: function (rs) {
        var result = rs.data;
        if (result.success == "200") {
         wx.navigateTo({
           url: '../houseDetails/houseDetails',
         })
       
          //成功
        } else {
          //失败 result.message
        }
      }
    })
  },
  /**
   * 解绑设备
   */
  unbindDevice: function (e) {
    var that = this
    let pkCode = wx.getStorageSync('loginData')
    var userAccountPkcode = pkCode.userAccountPkcode
    // console.log(userAccountPkcode)
    // var deviceSn = e.detail.value.series
    // that.setData({
    //   deviceid: deviceSn
    // })
    var platformDevicePkcode = that.data.devicePkcode

    var housePkcode = that.data.houseid

    wx.request({
      url: app.common_post_address + "/device/untied",
      data: {
        platformDevicePkcode: platformDevicePkcode,
        userAccountPkcode: userAccountPkcode,
        housePkcode: housePkcode
      },
      method: "POST",
      success: function (rs) {
        var result = rs.data;
        if (result.success == "200") {
          wx.showToast({
            title: '解绑成功',
            icon:"success",
            duration: 2000
          })
          wx.navigateTo({
            url: '../houseDetails/houseDetails',
          })

          //成功
        } else {
          //失败 result.message
          wx.showToast({
            title: '解绑失败',
            icon: "none",
            duration: 2000
          })
        }
      }
    })
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