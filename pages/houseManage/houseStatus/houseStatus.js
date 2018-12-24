// pages/houseManage/houseStatus/houseStatus.js
var show = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doorStatus: false,
    num: 1,
    peoples: 1,
    ws: 0,
    kt: 0,
    cf: 0,
    dwc: 0,
    gwc: 0,
    // Types:[{ws:'1',kt:'1',cf:'1',dwc:'1',gwc:'1'}],
    houseType: {},
    houseArea: '',
    houseSta: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('areaData')
    var houseTypeData = wx.getStorageSync('houseTypeData')
    var housePeople = wx.getStorageSync('housePeople')
    if (houseTypeData != '' || houseTypeData != null || houseTypeData != undefined || houseTypeData) {
      this.setData({
        houseArea: value.houseArea,
        peoples: value.peoples,
        houseType: houseTypeData
      })
    }
    if (!houseTypeData || !value) {
      this.setData({
        peoples: 1
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
  closeModal: function (e) {
    var data=e.detail.value
    this.setData({
      doorStatus: false
    })
    var houseTypeData = wx.getStorageSync('houseTypeData') || {}
    wx.setStorageSync('houseTypeData', data)
  },
  // 保存

  preserve: function (e) {
    let data = e.detail.value
    var areaData = wx.getStorageSync('areaData') || {}
    wx.setStorageSync('areaData', data)
    wx.navigateTo({
      url: '../houseDescribe/houseDescribe',
    })
  },
  /**
   * 数量减
   */
  bindMinus: function (e) {
    let that = this
    let ws = that.data.ws;
    if (ws <= 0) {
      return false;
    }
    ws--
    this.setData({
      ws: ws
    });
  },
  /**
   * 数量加
   */
  bindPlus: function (e) {
    let that = this
    let ws = that.data.ws
    ws++
    this.setData({
      ws: ws
    })
  },
  // 客厅加减
  ktPlus: function () {
    let that = this
    let kt = that.data.kt
    kt++
    that.setData({
      kt: kt
    })
  },
  ktMinus: function () {
    let that = this
    let kt = that.data.kt
    if (kt <= 1) {
      return false
    }
    kt--
    that.setData({
      kt: kt
    })
  },
  // 厨房加减
  cfPlus: function () {
    let that = this
    let cf = that.data.cf
    cf++
    that.setData({
      cf: cf
    })
  },
  cfMinus: function () {
    let that = this
    let cf = that.data.cf
    if (cf <= 0) {
      return false
    }
    cf--
    that.setData({
      cf: cf
    })
  },
  // 公共卫生间加减
  gwcPlus: function () {
    let that = this
    let gwc = that.data.gwc
    gwc++
    that.setData({
      gwc: gwc
    })
  },
  gwcMinus: function () {
    let that = this
    let gwc = that.data.gwc
    if (gwc <= 0) {
      return false
    }
    gwc--
    that.setData({
      gwc: gwc
    })
  },
  // 独立卫生间加减
  dwcPlus: function () {
    var that = this
    var dwc = that.data.dwc
    dwc++
    that.setData({
      dwc: dwc
    })
  },
  dwcMinus: function () {
    let that = this
    let dwc = that.data.dwc
    if (dwc <= 0) {
      return false
    }
    dwc--
    that.setData({
      dwc: dwc
    })
  },
  peoplePlus: function (e) {
    var that = this
    var people = that.data.peoples
    people++
    that.setData({
      peoples: people
    })
    var data = e.currentTarget.dataset.people
    console.log(data)
    var houseTypeData = wx.getStorageSync('housePeople') || {}
    wx.setStorageSync('housePeople', data)

  },
  peopleMinus: function (e) {
    var people = this.data.peoples
    if (people <= 1) {
      return false;
    }
    people--
    this.setData({
      peoples: people
    });
  },
  powerDrawer: function (e) {
    //关闭 对象 e 关闭时 e又curr 。 datatest 。stat
    //提交 e.detail。v
    // 关闭进来 一定没有 e.detail。v
    var currentStatu = e.currentTarget.dataset.statu
    let data = e.detail.value
    this.setData({
      houseType: e.detail.value,
      doorStatus: false
    })
    var houseTypeData = wx.getStorageSync('houseTypeData') || {}
    wx.setStorageSync('houseTypeData', data)
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            doorStatus: false,
          }
        );
      } if (currentStatu == "hidden") {
        this.setData({
          areaStatus: false
        })
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          doorStatus: true,

        }
      )
    }
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