// pages/ble/ble.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceId : undefined,
    serviceId : undefined,
    characteristicId : undefined,
    localName: "dodo-E3920B490328",
    pwd: "01223344",
    cmd : ""
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!wx.openBluetoothAdapter) {
      console.log("当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。");
      return;
    }
    this.connect()
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
  
  },
  connect : function(){
    var _this = this;
    var b = true;
    wx.openBluetoothAdapter({
      success: function (res) {
      },
      complete(res) {
        wx.onBluetoothAdapterStateChange(function (res) {
          if (!res.available) { //蓝牙未打开 则每两秒查看是否打开
            console.log('no')
            b = false;
            setTimeout(function () {
              _this.connect();
            }, 2000);
            console.log(1)
            return;
          }
        })

        if(b == false){
          return;
        }

        if(_this.data.device_id){
          return;
        }
        wx.getBluetoothAdapterState({
          success: function (res) {
            if (!!res && res.available) {//蓝牙可用  
              console.log('蓝牙可用')
              wx.startBluetoothDevicesDiscovery({
                services: [],
                success(res) {
                  wx.onBluetoothDeviceFound(function (res) {
                    //过滤目标设备
                    console.log('过滤目标设备')
                    var devices = res.devices;
                    var device = devices[0];
                    if (device.localName != _this.data.localName){
                      return;
                    }
                    _this.setData({
                      deviceId: device.deviceId,
                    })


                    //
                    wx.stopBluetoothDevicesDiscovery({
                      success: function (res) {
                        console.log('停止搜索' + "localName : " + _this.data.localName)
                        
                      }
                    })
                    wx.createBLEConnection({
                      deviceId: _this.data.deviceId,
                      success(res) {
                        console.log('连接上了')
                        wx.getBLEDeviceServices({
                          deviceId: _this.data.deviceId,
                          success: function (res) {
                            console.log('服务列表如下')
                            console.log(res.services)
                            var service = res.services[0]
                            _this.setData({
                              serviceId: service.uuid
                            })
                            console.log('---------------')

                            //获取特征
                            wx.getBLEDeviceCharacteristics({
                              deviceId: _this.data.deviceId,
                              serviceId: _this.data.serviceId,
                              success: function (res) {
                                let notify_id, write_id, read_id;
                                for (let i = 0; i < res.characteristics.length; i++) {
                                  let charc = res.characteristics[i];
                                  if (charc.properties.notify) {
                                    notify_id = charc.uuid;
                                    _this.setData({
                                      characteristicId : notify_id
                                    })
                                  }
                                  if (charc.properties.write) {
                                    write_id = charc.uuid;
                                  }
                                  if (charc.properties.write) {
                                    read_id = charc.uuid;
                                  }
                                }
                                //订阅特征
                                wx.notifyBLECharacteristicValueChange({
                                  state: true,
                                  deviceId: _this.data.deviceId,
                                  serviceId: _this.data.serviceId,
                                  characteristicId: notify_id,
                                  success : function(res) {
                                    //监听特征变化
                                    wx.onBLECharacteristicValueChange(function (res) {
                                      //所谓特征值 类似与设备当前状态信息 如当前出于开门状态 不需要执行开门操作                 
                                      // console.log(res.value);
                                      var s = ab2hex(res.value)
                                      console.log("监听特征变化 "+s)
                                      switch (_this.data.cmd){
                                        case "开始绑定":
                                          //1开始绑定返回 验证倒数第二个字节是否为56
                                          console.log("开始绑定返回处")
                                          // _this.confCommunCmd("01223344")
                                          break;
                                        case "设置通讯密码":
                                          //2设置通信密码 验证倒数第二个字节是否为4a
                                          //提交通讯密码
                                          console.log("设置通讯密码返回处")
                                          // _this.endBind()
                                          break;
                                        case "结束绑定":
                                          console.log("结束绑定返回处")
                                          //3结束绑定 验证倒数第二个字节是否为57
                                          // _this.vailCommun()
                                          break;
                                        case "验证绑定":
                                          //4验证通信密码 验证顺数第二个字节是否为00
                                          console.log("验证绑定返回处")
                                          // _this.writeble()
                                          break;
                                        case "开门":
                                          console.log("开门返回处")
                                          //5下发立即开门 验证倒数第二个字节是否为55
                                          //提交开门记录
                                          break;
                                        case "解除绑定":
                                          break;
                                        default:console.log("未知命令")
                                      }
                                    })
                                  }
                                })
                                // if (_this.data.localName != "" && _this.data.pwd != "") {
                                //   _this.vailCommun()
                                // }else{
                                //   _this.bindDevice()
                                // }
                              }
                            })
                          }
                        })
                      }
                    })
                    

                    // if (device) {
                    //   _this.blue_data.device_id = device.deviceId;
                    //   _this.stopSearch();
                    //   _this.connectDevice();
                    // }
                  });
                }
              })
            }
          }
        })
      }
    })
  },
  readble : function (){
    console.log('开始读取')
    wx.readBLECharacteristicValue({
      deviceId: this.data.deviceId,
      serviceId: this.data.serviceId,
      // characteristicId: this.data.characteristicId,
      characteristicId: "0000FFF2-0000-1000-8000-00805F9B34FB",
      success: function (res) {
        console.log('readBLECharacteristicValue:', res.errCode)
        
      }
    })
  },
  writeble : function(){
    this.setData({
      cmd:"开门"
    })
    console.log('执行开门')
    var hex = 'dd00020001101500'
    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    var buffer1 = typedArray.buffer

    console.log(ab2hex(buffer1))

    wx.writeBLECharacteristicValue({
      deviceId: this.data.deviceId,
      serviceId: this.data.serviceId,
      // characteristicId: this.data.characteristicId,
      characteristicId: "0000FFF1-0000-1000-8000-00805F9B34FB",
      value: buffer1,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
      }
    })
  },
  cleanDevice: function () {
    console.log('执行清除')
    this.setData({
      cmd: "解除绑定"
    })
    var hex = "dd00020001101800"
    
    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    var buffer1 = typedArray.buffer

    console.log(ab2hex(buffer1))

    wx.writeBLECharacteristicValue({
      deviceId: this.data.deviceId,
      serviceId: this.data.serviceId,
      // characteristicId: this.data.characteristicId,
      characteristicId: "0000FFF1-0000-1000-8000-00805F9B34FB",
      value: buffer1,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
      }
    })
  },
  bindDevice: function () {
    console.log('执行绑定')
    this.setData({
      cmd: "开始绑定"
    })
    var hex = "dd00020001101600"

    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    var buffer1 = typedArray.buffer

    console.log(ab2hex(buffer1))

    wx.writeBLECharacteristicValue({
      deviceId: this.data.deviceId,
      serviceId: this.data.serviceId,
      // characteristicId: this.data.characteristicId,
      characteristicId: "0000FFF1-0000-1000-8000-00805F9B34FB",
      value: buffer1,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
      }
    })
  },
  vailCommun: function () {

    console.log('执行验证密码')
    this.setData({
      cmd: "验证绑定"
    })
    console.log(this.data.pwd)
    var hex = require("cmdUtil.js").vailCommunCmd(this.data.pwd)

    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    var buffer1 = typedArray.buffer

    console.log(ab2hex(buffer1))

    wx.writeBLECharacteristicValue({
      deviceId: this.data.deviceId,
      serviceId: this.data.serviceId,
      // characteristicId: this.data.characteristicId,
      characteristicId: "0000FFF1-0000-1000-8000-00805F9B34FB",
      value: buffer1,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
      }
    })
  },
  confCommunCmd : function(p){
    console.log('执行设置通讯密码')
    this.setData({
      cmd: "设置通讯密码",
      pwd:p
    })
    var hex = p

    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    var buffer1 = typedArray.buffer

    console.log(ab2hex(buffer1))

    wx.writeBLECharacteristicValue({
      deviceId: this.data.deviceId,
      serviceId: this.data.serviceId,
      // characteristicId: this.data.characteristicId,
      characteristicId: "0000FFF1-0000-1000-8000-00805F9B34FB",
      value: buffer1,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
      }
    })
  },
  endBind: function () {
    console.log('执行结束绑定')
    var hex = "dd00020001101700"
    this.setData({
      cmd: "结束绑定"
    })

    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    var buffer1 = typedArray.buffer

    console.log(ab2hex(buffer1))

    wx.writeBLECharacteristicValue({
      deviceId: this.data.deviceId,
      serviceId: this.data.serviceId,
      // characteristicId: this.data.characteristicId,
      characteristicId: "0000FFF1-0000-1000-8000-00805F9B34FB",
      value: buffer1,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
      }
    })
  }
})

function hexStringToArrayBuffer(str) {
  if (!str) {
    return new ArrayBuffer(0);
  }
  var buffer = new ArrayBuffer(str.length);
  let dataView = new DataView(buffer)
  let ind = 0;
  for (var i = 0, len = str.length; i < len; i += 2) {
    let code = parseInt(str.substr(i, 2), 16)
    dataView.setUint8(ind, code)
    ind++
  }
  return buffer;
}

function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}
