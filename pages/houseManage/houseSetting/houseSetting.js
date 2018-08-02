// pages/houseManage/houseSetting/houseSetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifi: false,
    tv:false,
    xyj:false,
    kt:false,
    rsq:false,
    wc:false,
    nq:false,
    bx:false,
    ms:false,
    cfj:false,
    yc:false,
    yg:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 点击WIFI
  onclick:function(e){
    let wifi=this.data.wifi;
    if(!wifi){
      this.setData({
        wifi: true
      })
    }else{
      this.setData({
        wifi: false
      })
    }
 
  },
  // 点击电视
  tvClick:function(){
    let tv = this.data.tv;
    if (!tv) {
      this.setData({
        tv: true
      })
    } else {
      this.setData({
        tv: false
      })
    }
  },
  // 洗衣机
  xyjClick:function(){
    let xyj = this.data.xyj;
    if (!xyj) {
      this.setData({
        xyj: true
      })
    } else {
      this.setData({
        xyj: false
      })
    }
  },
  // 空调
  ktClick:function(){
    let kt = this.data.kt;
    if (!kt) {
      this.setData({
        kt: true
      })
    } else {
      this.setData({
        kt: false
      })
    }
  },
  // 热水器
  rsqClick:function(){
    let rsq = this.data.rsq;
    if (!rsq) {
      this.setData({
        rsq: true
      })
    } else {
      this.setData({
        rsq: false
      })
    }
  },
  // 洗手间
  wcClick:function(){
    let wc = this.data.wc;
    if (!wc) {
      this.setData({
        wc: true
      })
    } else {
      this.setData({
        wc: false
      })
    }
  },
  // 暖气
  nqClick:function(){
    let nq = this.data.nq;
    if (!nq) {
      this.setData({
        nq: true
      })
    } else {
      this.setData({
        nq: false
      })
    }
  },
  // 冰箱
  bxClick:function(){
    let bx = this.data.bx;
    if (!bx) {
      this.setData({
        bx: true
      })
    } else {
      this.setData({
        bx: false
      })
    }
  },
  // 智能门锁
  msClick:function(){
    let ms = this.data.ms;
    if (!ms) {
      this.setData({
        ms: true
      })
    } else {
      this.setData({
        ms: false
      })
    }
  },
  // 吹风机
  cfjClick:function(){
    let cfj = this.data.cfj;
    if (!cfj) {
      this.setData({
        cfj: true
      })
    } else {
      this.setData({
        cfj: false
      })
    }
  },
  // 泳池
  ycClick:function(){
    let yc = this.data.yc;
    if (!yc) {
      this.setData({
        yc: true
      })
    } else {
      this.setData({
        yc: false
      })
    }
  },
  // 浴缸
  ygClick:function(){
    let yg = this.data.yg;
    if (!yg) {
      this.setData({
        yg: true
      })
    } else {
      this.setData({
        yg: false
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