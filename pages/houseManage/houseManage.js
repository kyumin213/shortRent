// pages/houseManage/houseManage.js
var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseIcon: '../../image/house/house-icon.png',
    hashList: false,
    houseData: {},
    pkCode: '',
    index:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let pkCode = wx.getStorageSync('loginData')
    that.setData({
      pkCode: pkCode.userAccountPkcode
    })
    wx.request({
      url: app.common_post_address + 'house/findList',
      data: {
        userAccountPkcode: pkCode.userAccountPkcode
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        let result = res.data
        if (result.success == '200') {
          if (result.data.length > 0) {
            var list = result.data;
            for (var i = 0; i < list.length; i++) {
              var houseType = JSON.parse(list[i].houseType);
              var housePkcode = list[i].housePkcode
              houseType = houseType.ws + "室" + houseType.kt + "厅" + houseType.cf + "厨" + houseType.dwc + "独立卫生间" + houseType.gwc + "公共卫生间"
              list[i].houseType = houseType
              list[i].housePkcode = housePkcode
            }
            that.setData({
              hashList: true,
              houseData: result.data
            })

          }
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
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
  },
  // 添加房屋
  addHouse: function () {
    wx.navigateTo({
      url: 'addHouse/addHouse',
    })
  },
  /**
   * 查看房屋
   */
  viewHouse: function (e) {
    var code = e.currentTarget.id
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: 'houseDetails/houseDetails?housePkcode=' + code+'&index='+index,
    })
  },
  /**
   * 发送二维码
   */
  sendEwm: function (e) {
    wx.navigateTo({
      url: 'twoCode/twoCode',
    })
  },
  /**
   * 删除房屋
   */

  houseDelete: function (e) {
    var that = this
    var userAccountPkcode=that.data.pkCode
    var houseData = that.data.houseData
    var index = e.currentTarget.dataset.index
    var housePkcode = houseData[index].housePkcode
    wx.showModal({
      title: '温馨提示',
      content: '是否删除该房屋',
      success: function (res) {
        if (res.confirm) {
          houseData.splice(index, 1);              // 删除购物车列表里这个商品
          wx.request({
            url: app.common_post_address +'/house/deleteByPkcode',
            data:{
              userAccountPkcode: userAccountPkcode,
              housePkcode: housePkcode
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            success:function(res){
              houseData.splice(index, 1)
              app.showToast('删除成功', 'success', 1000)
              that.setData({
                houseData: houseData
              })
            }
          })

        } else if (res.cancel) {
          console.log('取消')
        }
      },fail:function(){
        app.showToast('数据出错', 'none', 1000)
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