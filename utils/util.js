const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function hasList() {
  var that = o
  let pkCode = wx.getStorageSync('loginData')
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
        // if (result.data.length > 0) {
        //   that.setData({
        //     hasList: true,
        //     houseStatus: true,
        //     describe: true,
        //   })
        // }
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  hasList: hasList
}
