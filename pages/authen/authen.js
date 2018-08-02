// pages/authen/authen.js
var gesture, invitationCode, upFileName, tempFilePaths_front, tempFilePaths_back
var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths_front: "",
    tempFilePaths_back: "",
    hashList: true,
    success: false,
    userAccountPkcode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //链接参数
    if (options.gesture) {
      gesture = options.gesture
    }
    if (options.invitationCode) {
      invitationCode = options.invitationCode
    }
    var loginData = wx.getStorageSync('loginData')
    var pkCode = loginData.userAccountPkcode
    var count = loginData.userCertificationCount
    if (count>=1) {
      that.setData({
        success: true,
        hashList: false
      })
    }
    that.setData({
      userAccountPkcode: pkCode
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 身份证正面
  uploadPosi: function (e) {
    var that = this;
    var pkCode = that.data.userAccountPkcode
    wx.chooseImage({
      count: 1,
      // sizeType: ['original', 'compressed'],
      // sourceType: ['album', 'camera'],
      success: function (res) {
        upFileName = res.tempFilePaths[0]
        if (upFileName) {
          var suffix = upFileName.substring(upFileName.lastIndexOf(".") + 1, upFileName.length)   //后缀名
          var idcardType

          if (e.currentTarget.dataset.id == 'tempFilePaths_front') {
            idcardType = 'front'
            that.setData({
              tempFilePaths_front: upFileName
            })
          } else {
            idcardType = 'back'
            that.setData({
              tempFilePaths_back: upFileName
            })
          }
          wx.showLoading({
            mask: true,
            title: '图片上传中'
          })
          wx.uploadFile({
            url: app.common_post_address + '/wechatMiniUser/checkIdcard',
            filePath: upFileName,
            name: 'file',
            formData: {
              'userAccountPkcode': pkCode,
              'idcardType': idcardType,
              'fileType': suffix
            },
            header: {
              'content-type': 'application/json;charset=UTF-8'
            },
            success: function (rs) {
              wx.hideLoading()
              var tmp = JSON.parse(rs.data)
              if (tmp.success != '200') {
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: tmp.message
                })
                return false
              }
              if (e.currentTarget.dataset.id == 'tempFilePaths_front') {
                tempFilePaths_front = tmp.data
              } else {
                tempFilePaths_back = tmp.data
              }
            }, fail: function () {
              console.log('失败或超时')
              app.showToast('上传失败，请重试！', 'none', 1000)
            }
          })
        }
      }
    })
  },
  // 提交
  submit: function (e) {
    var that = this
    var pkCode = that.data.userAccountPkcode
    if (!tempFilePaths_front || !tempFilePaths_back) {
      app.showToast('请上传身份证照片', 'none', 1000)
      return false
    }
    wx.showLoading({
      mask: true,
      title: '发送中，请稍后',
    })

    wx.request({
      url: app.common_post_address + '/wechatMiniUser/certification',
      data: {
        'userAccountPkcode': pkCode,
        'userCertificationAddress': tempFilePaths_front.address,
        'userCertificationNumber': tempFilePaths_front.number,
        'userCertificationBirth': tempFilePaths_front.birth,
        'userCertificationName': tempFilePaths_front.name,
        'userCertificationSex': tempFilePaths_front.sex,
        'userCertificationNational': tempFilePaths_front.nationa,
        'userCertificationFrontFileName': tempFilePaths_front.frontFileName,
        'userCertificationBackFileName': tempFilePaths_back
      },
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
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
        app.userCertificationCount = 1
        setTimeout(function () {
          if (gesture == 'voluntary') {
            wx.switchTab({
              url: '../me/me'
            })
          } else {
            // wx.switchTab({
            //   url: '../index/index'
            // })
            that.setData({
              hashList: false,
              success: true
            })
          }
        }, 1000)
      }, fail: function () {
        app.showToast('发送失败，请重试！', 'none', 1000)
      }
    })
  },

  // 返回
  backBtn: function () {
    wx.navigateBack({
      delta:1
    })
  }
})