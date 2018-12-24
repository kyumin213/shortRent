// pages/houseManage/twoCode/twoCode.js
var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAccountPkcode: '',
    houseid: '',
    QR_codeBase64: '',
    houseInviteCodeNumber: '',
    phones:'',
    houseName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let pkCode = wx.getStorageSync('loginData')
    let userAccountPkcode = pkCode.userAccountPkcode
    let housePkcode = options.housePkcode
    let houseName = options.houseName
    that.setData({
      userAccountPkcode: userAccountPkcode,
      houseid: housePkcode,
      houseName: houseName
    })
    that.createInviteCode()
  },
  /**
   * 创建二维码(如果已生成且未果有效期则二维码相同 可以考虑存入缓存)
   */
  createInviteCode: function (e) {
    var that = this
    var housePkcode = that.data.houseid
    var userAccountPkcode = that.data.userAccountPkcode
    wx.request({
      url: app.common_post_address + "/house/createInviteCode",
      data: {
        housePkcode: housePkcode,
        userAccountPkcode: userAccountPkcode
      },
      method: "POST",
      success: function (res) {
        if (res.data.success == '200') {
          var imgVlaue = res.data.data.houseInviteCodeBase64
          that.setData({
            QR_codeBase64: "data:img/png;base64," + imgVlaue.replace(/\s+/g, ""),
            houseInviteCodeNumber: res.data.data.houseInviteCodeNumber,
            // inputListVal: ''
          })
        }


        //houseInviteCodeUrl 图片地址
        //houseInviteCodeNumber邀请码
        //houseInviteCodeBase64图片base64位字节
        //searchArray 邀请手机号 如13811114444,15677770000 非数组对象
        //searchArray 可能为空 或空字符串 注意判断
      }
    })
  },


  /**
   * 监听输入的手机号
   */
  inpPhone:function(e){
    var that=this
    var phones=e.detail.value
    phones = phones.replace(/，/ig, ',')
    var arr = phones.split(",");
    // console.log(arr);
    that.setData({
      phones:arr
    })
  },
  isphone:function(e){
    var that=this
    var phone=e.detail.value
    var tel = phone.split(',')
    for (var i = 0; i < tel.length; i++) {
      if (!(/^1[34578]\d{9}$/.test(tel[i]))) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: tel[i]+'手机号格式不正确'
        })
        return false
      }
      else{
        that.setData({
          phones:phone
        })
      }
    }
  },
  /**
 * 保存邀请人
 */
    saveSearch: function() {
      var that=this
      var housePkcode = that.data.houseid
      var userAccountPkcode = that.data.userAccountPkcode
      var phones = that.data.phones.join(',')
      console.log(phones)
      // var searchArray = "";//邀请手机号 如13811114444,15677770000 非数组对象
      wx.request({
        url: app.common_post_address +"/house/saveSearch",
        data: {
          housePkcode: housePkcode,
          searchArray: phones,
          userAccountPkcode:userAccountPkcode
        },
        method: "POST",
        success: function (rs) {
          //rs.data.success == "200" 则代表成功
          var result=rs.data
          if(result.success=="200"){
            app.showToast('保存成功', 'success', 1000)
          }
        }
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