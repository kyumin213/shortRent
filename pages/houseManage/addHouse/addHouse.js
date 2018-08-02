// pages/houseManage/addHouse/addHouse.js
var show = false
var app = getApp().globalData
var item = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      show: show
    },
    province: '城市/区域',
    detailaddress: '',
    showModalStatus: false,
    areaStatus: false,
    hasList: true,
    identity: false,
    complete: true,
    houseStatus: false,
    describe: false,
    bindDevice: false,
    com: false,
    property: false,
    street: '',
    src: '../../../image/house/house-bg2x.png',
    region: '',
    area: {},
    xq: '',
    lh: '',
    dy: '',
    mp: '',
    city: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let houseData = wx.getStorageSync('houseData')
    let houseDetail = wx.getStorageSync('houseDetails')
    console.log(houseDetail)
    let pkCode = wx.getStorageSync('loginData')
    that.setData({
      region: houseData.city,
      street: houseData.street,
      area: houseData.area,
      xq: houseDetail.xq,
      lh: houseDetail.lh,
      dy: houseDetail.dy,
      mp: houseDetail.mp
      // housePkcode: options.housePkcode

    })
  },

  houseAreaChange:function(){

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    that.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.moveToLocation()
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    // model.animationEvents(this, 0, true, 400);
    this.setData({
      region: e.detail.value
    })
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  /**
     * 自定义弹窗
     */
  preDetails: function (e) {
    var currentStatu = e.currentTarget.dataset.statu
    let details = e.detail.value
    this.setData({
      xq: e.detail.value.xq,
      lh:e.detail.value.lh,
      dy:e.detail.value.dy,
      mp:e.detail.value.mp,
      areaStatus: false
    })
    let houseDetails = wx.getStorageSync('houseDetails') || {}
    wx.setStorageSync('houseDetails', details)
    this.util(currentStatu)
  },
  closeModal: function () {
    this.setData({
      areaStatus: false
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu
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
            showModalStatus: false,
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
          showModalStatus: true,

        }
      );
    } if (currentStatu == 'show') {
      this.setData({
        areaStatus: true
      })
    }
  },

  /**
   * 下一步
   */
  next: function (e) {
    //false is vail
    let data = e.detail.value;
    

    let house = {}
    // if (data!=''){
    var houseData = wx.getStorageSync('houseData') || {}
    // searchData.push(e.detail.value)
    if (data.street) {
      houseData.street, data.street
    }
    if (data.city) {
      houseData.city, data.city
    }
    if (data.area) {
      houseData.area, data.area
    }
    wx.setStorageSync('houseData', data)
    wx.navigateTo({
      url: '../houseStatus/houseStatus',
    })
    // }
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