// pages/confirmIn/confirmIn.js
var app=getApp().globalData
var dateTimePicker = require('../../utils/dataTimePicker.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endTime: '2018-07-05',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    one: true,
    two: false,
    three: false,
    housePkcode: '',
    userAccountPkcode:'',
    names:'',
    cardId:'',
    checkInTime:'',
    userCode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var names = options.names
    console.log(names)
    var cardId=options.cardId
    var checkInTime = options.checkInTime
    var housePkcode = options.housePkcode
    var userCode=options.userCode
    var loginData = wx.getStorageSync('loginData')
    var userAccountPkcode = loginData.userAccountPkcode
    that.setData({
      names:names,
      cardId: cardId,
      checkInTime: checkInTime,
      userAccountPkcode: userAccountPkcode,
      housePkcode: housePkcode,
      userCode: userCode
    })
    var obj = dateTimePicker.dateTimePicker(that.data.startYear, that.data.endYear)
    var obj1 = dateTimePicker.dateTimePicker(that.data.startYear, that.data.endYear)
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    })
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 确认入住
   */
  precheckIn:function (e) {
    var that=this
    var housePkcode=that.data.housePkcode
    var userAccountPkcode = that.data.userAccountPkcode
    // var endtime = e.target.dataset.text
    var endTime = e.detail.value.endTime
    console.log(endTime)
    var userCode = that.data.userCode
    wx.request({
      url: app.common_post_address +'/house/checkIn',
      data:{
        'housePkcode': housePkcode,
        'userAccountPkcode': userAccountPkcode,
        'checkInUserAccountPkcode': userCode,
        'endtime': endTime
      },
      header:{
        'content-type':'application/json'
      },
      method:'POST',
      success:function(res){
        app.showToast('确认成功', 'success', 1000)
        wx.navigateBack({
          delta:1
        })
      }
    })
  },

  /**
   * 入住时间
   */
  bindDateChange: function (e) {
    let that = this
    that.setData({
      startDate: e.detail.value
    })
  },
  /**
   * 结束时间
   */
  bindDataChange2: function (e) {
    let that = this
    that.setData({
      endTime: e.detail.value
    })
  },
  /**
   * 一天
   */
  one: function (e) {
    let that = this
    let one = this.data.one
    if (one) {
      that.setData({
        one: false
      })
    } else {
      that.setData({
        one: true
      })
    }
  },

  /**
  * 两天
  */
  two: function (e) {
    let that = this
    let two = this.data.two
    if (two) {
      that.setData({
        two: false
      })
    } else {
      that.setData({
        two: true
      })
    }
  },
  //3天
  three: function (e) {
    let that = this
    let three = this.data.three
    if (three) {
      that.setData({
        three: false
      })
    } else {
      that.setData({
        three: true
      })
    }
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