// pages/index/index.js
var that, index = 0
var app = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    openEvent: '',           //open 事件触发
    openText: '',            //open 文字
    openRotate: 'rotate',    //open 旋转控制
    displayOpen: false,     //显示 open界面
    displayCheck: false,    //显示 输入邀请码界面
    Length: 4,               //邀请码 长度
    isFocus: true,           //邀请码 聚焦
    invitationCode_ture: '', //邀请码 value - 真
    invitationCode_false: '', //邀请码 vlaue - 假   
    indicatorDots: true,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "",
    searchStatus: false,
    InvitationCode: false,
    inviteCode: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if (options.inInviteCode) {
      app.housingCode = options.inInviteCode
    }
  },
  /**
   * 申请开门
   */
  applyUnlock: function (e) {
    var that = this
    let loginData = wx.getStorageSync('loginData')
    let pkCode = loginData.userAccountPkcode
    var inviteCode = e.detail.value.inviteCode
    wx.request({
      url: app.common_post_address + '/inInviteCode',
      data: {
        userAccountPkcode: pkCode,
        inviteCode: inviteCode
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        var result = res.data
        if (result.success == '200') {
          app.showToast('申请成功','success',2000)
          that.setData({
            displayCheck: false,
            displayOpen: true
          })
        } else {
          app.showToast(res.data.message,'失败',2000)
        }
      }, fail: function () {
        app.showToast('开锁失败，请重试！', 'none', 1000)
      }
    })
  },
  //open 开门
  submitUnlock: function () {
    let loginData = wx.getStorageSync('loginData')
    let userAccountPkcode = loginData.userAccountPkcode
    wx.request({
      url: app.common_post_address + '/openTheDoor',
      data: {
        userAccountPkcode: userAccountPkcode
      },
      header: {
        'content-type': 'application/json'
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
        } else if (res.data.data != '' || res.data.data!=null){
          var mac = res.data.data.tggDeviceBlemac
          var pwd = res.data.data.tggDeviceBlepwd
          wx.navigateTo({
            url: '../blueTooth/blueTooth?mac='+mac+'&pwd='+pwd,
          })
          console.log(res.data.data)
        }
      }
    })
  },
  //open 提交邀请码
  submitInvitation: function () {
    this.setData({ //按钮旋转停止
      openRotate: false
    })
    if (this.data.invitationCode_false.length < 4) {
      app.showToast('请填写住房邀请码', 'none', 1000)
      return false
    }
    submitInvitationCode(this.data.Value)
  },
  //邀请码输入框-真
  Focus(e) {
    var inputValue = e.detail.value;
    this.setData({
      invitationCode_false: inputValue
    })
    if (inputValue.length >= 4) {
      submitInvitationCode(inputValue)
    }
  },
  //邀请码输入框-假
  Tap() {
    this.setData({
      isFocus: true,
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
    login()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading()
    this.setData({
      invitationCode_true: '',
      invitationCode_false: ''
    })

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

  },

})
function submitInvitationCode(value) {
  if (app.userCertificationCount == 1) {
    wx.showLoading({
      title: '发送中，请稍后',
    })
    wx.request({
      url: app.common_post_address + 'inInviteCode',
      data: {
        inviteCode: value,
        userAccountPkcode: app.mini_user_id
      },
      header: {
        'content-type': 'application/json'
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
        }
        app.housingCode = false
        login()
      }
    })

  } else {
    wx.navigateTo({
      url: '/personal/authentication/card/card?gesture=automatic&invitationCode=' + value
    })
  }
}
function submitInvitationCode(value) {
  if (app.userCertificationCount == 1) {
    wx.showLoading({
      title: '发送中，请稍后',
    })
    wx.request({
      url: app.common_post_address + 'inInviteCode',
      data: {
        inviteCode: value,
        userAccountPkcode: app.mini_user_id
      },
      header: {
        'content-type': 'application/json'
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
        }
        app.housingCode = false
        login()
      }
    })

  } else {
    wx.navigateTo({
      url: '/authen/authen?gesture=automatic&invitationCode=' + value
    })
  }
}

function login() {
  wx.login({
    success: function (res) {
      if (res.code) {

        wx.request({
          url: app.common_post_address + 'wechatMiniUser/login',
          data: {
            js_code: res.code
          },
          method: "POST",
          success: function (rs) {
            let loginData = wx.getStorageSync('loginData') || {}
            let login = rs.data.data
            var searchStatus = login.searchStatus
            wx.setStorageSync('loginData', login)
            var Pkcode = rs.data.data.userAccountPkcode
            var CertificationCount = rs.data.data.userCertificationCount
            var houseCheckInState = rs.data.data.houseCheckInState
            var Mobile = rs.data.data.wechatMiniUserMobile
            app.mini_user_id = Pkcode
            app.userCertificationCount = CertificationCount
            app.houseCheckInState = houseCheckInState
            // app.userInfo=login

            if (Mobile) {   //判断是否存在手机号，否则跳转授权微信页面
              app.mini_user_phoneNumber = Mobile
            } else {
              wx.navigateTo({
                url: 'getPhoneNumber/getPhoneNumber'
              })
            }
            if (houseCheckInState == 0 || houseCheckInState == 1) {  //显示界面
              that.setData({
                openEvent: 'submitUnlock',
                openText: 'OPEN',
                displayOpen: true,
                displayCheck: false,
              })
            }

            else {
              if (app.housingCode) {
                submitInvitationCode(app.housingCode)
              }
              that.setData({
                openEvent: 'submitInvitation',
                openText: '发送',
                displayOpen: false,
                displayCheck: true
              })
            }

            if (rs.data.data.searchStatus == 1) {
              submitInvitationCode(rs.data.data.inviteCode)
            }
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}