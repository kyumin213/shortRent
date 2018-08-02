// pages/houseManage/property/property.js
var uploadOne, gesture
var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    propertyOne: '',
    propertyTwo: '',
    hashList: true,
    userAccountPkcode: '',
    tempFilePaths: '',
    suffix: '',
    housePkid: '',
    success: false,
    housePocImg: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var housePkid = options.housePkid
    var loginData = wx.getStorageSync('loginData')

    var pkCode = loginData.userAccountPkcode
    that.setData({
      userAccountPkcode: pkCode,
      housePkid: housePkid
    })

    that.setData
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  // 房产所有权页
  uploadOne: function (e) {
    var that = this
    var userAccountPkcode = that.data.userAccountPkcode
    wx.chooseImage({
      count: 1,
      // sizeType: ['original', 'compressed'],
      // sourceType: ['album', 'camera'],
      success: function (res) {
        var uploadFilePaths = res.tempFilePaths[0]
        console.log(uploadFilePaths)
        if (uploadFilePaths) {
          var suffix = uploadFilePaths.substring(uploadFilePaths.lastIndexOf(".") + 1, uploadFilePaths.length)   //后缀名
          that.setData({
            propertyOne: uploadFilePaths,
            suffix: suffix
          })
          wx.uploadFile({
            url: app.common_post_address + '/house/uploadPOCImg',
            filePath: uploadFilePaths,
            name: 'file',
            formData: {
              'userAccountPkcode': userAccountPkcode,
              'fileType': suffix
            },
            header: {
              'content-type': 'application/json;charset=UTF-8'
            },
            method: 'POST',
            success: function (rs) {
              var tmp = JSON.parse(rs.data)
              var housePocImg = tmp.data
              that.setData({
                housePocImg: housePocImg
              })
              if (tmp.success != 200) {
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: tmp.message
                })
                return false
              } 
              // if (e.currentTarget.dataset.id == 'propertyOne') {
              //   housePocImg = tmp.data
              // }
            }, fail: function () {
              console.log('失败或超时')
              app.showToast('上传失败，请重试！', 'none', 1000)
            }
          })
        }
      },
    })
  },
  // 房产附件页
  uploadTwo: function () {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          propertyTwo: tempFilePaths
        })
      },
    })
  },
  // 提交
  fileSubmit: function () {
    var that = this
    var pkCode = that.data.userAccountPkcode
    var tempFilePaths = that.data.propertyOne
    var housePkid = that.data.housePkid
    var housePocImg = that.data.housePocImg
    var suffix = that.data.suffix
    if (tempFilePaths) {
      // wx.showLoading({
      //   mask: true,
      //   title: '发送中，请稍后',
      // })
      wx.request({
        url: app.common_post_address + '/house/update',
        data: {
          'userAccountPkcode': pkCode,
          'file': tempFilePaths,
          'housePkid': housePkid,
          'housePocImg': housePocImg
        },
        header: {
          'content-type': 'application/json;charset=UTF-8'
        },
        method: 'POST',
        success: function (res) {
          if (res.data.success != '200') {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: res.data.message
            })
            return false
            that.setData({
              hashList: false,
              success: false
            })
          }
          app.showToast('提交成功', 'success', 1000)
          setTimeout(function () {
            that.setData({
              hashList: false,
              success: true
            })
          }, 1000)
        }, fail: function () {
          console.log('失败或超时')
          app.showToast('上传失败，请重试！', 'none', 1000)
        }
      })
    }
  },
  // 返回
  backBtn: function () {
    wx.navigateBack({
      delta: 1
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