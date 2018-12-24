module.exports = {
  begBindCmd: begBindCmdStr,
  endBindCmd: endBindCmdStr,
  reomveBindCmd: reomveBindCmdStr,
  confCommunCmd: confCommunCmd,
  vailCommunCmd: vailCommunCmd,
  confDeviceTimeCmd: confDeviceTimeCmd,
  getDeviceTimeCmd: getDeviceTimeCmdStr,
  confAdminPwdCmd: confAdminPwdCmd,
  confPwdCmd: confPwdCmd,
  confTempPwdCmd: confTempPwdCmd
}

// L1
var dd = "dd"
var result = "00"
var len = null
var crc = "00"
var seq = "01";


//开始绑定
var begBindCmdStr = "dd00020001101600"
//结束绑定
var endBindCmdStr = "dd00020001101700"
//解除绑定
var reomveBindCmdStr = "dd00020001105700"
//设置通讯密码
var confCommunCmdStr = ""
//验证通讯密码
var vailCommunCmdStr = ""
//设置设备时间
var confDeviceTimeCmdStr = ""
//获取设备时间
var getDeviceTimeCmdStr = "dd00020001020200"
//设置通讯密匙
var confCommunKeyCmdStr = ""
//一键开门
var openCmdStr = "dd00020001101500"
//设置自定义密码
var confCustomPwdCmdStr = ""
//删除密码
var reomvePwdCmdStr = ""
//通知读卡
//添加卡片
//删除卡片
//设备升级

//设置通讯密码
function confCommunCmd(pwdStr){
  var pwd = convertPwd(pwdStr)
  var cmd_id = "02"
  var key = "0a"

  confCommunCmdStr = installPwdRs(pwdStr, pwd, cmd_id, key);
  console.log(confCommunCmdStr)
  return confCommunCmdStr;
}
//验证通讯密码
function vailCommunCmd(pwdStr){
  var pwd = convertPwd(pwdStr)
  var cmd_id = "10"
  var key = "01"

  vailCommunCmdStr = installPwdRs(pwdStr, pwd, cmd_id, key);
  console.log(vailCommunCmdStr)
  return vailCommunCmdStr;
}
//设置设备时间
function confDeviceTimeCmd(datestr){
  datestr = "2018-09-14 10:08:11";
  cmd_id = "02"
  key = "01"
  var yy = datestr.substring(2,4)
  var MM = datestr.substring(5, 7)
  var day = datestr.substring(8, 10)
  var hh = datestr.substring(11, 13)
  var mm = datestr.substring(14, 16)
  var ss = datestr.substring(17, 19)
  var vlen = "06"
  var len = (6 + 1 + 1).toString(16)
  len = "0" + len
  
  var value = yy + MM + day + hh + mm + ss
  var cmdStr = dd + result + len + crc + seq + cmd_id + key + vlen + value;
  return cmdStr
}

//设置管理员密码
function confAdminPwdCmd(pwdStr,uid){
  pwdStr = "123456"
  uid = "01";
  cmd_id = "02"
  key = "12"
  var begtime = "ffffff"
  var endtime = "ffffff"
  var value = uid + pwdStr +begtime + endtime
  vlen = value.length / 2
  len = vlen + 1 + 1
  vlen = "0" + vlen.toString(16)
  len = "0" + len.toString(16)

  var cmdStr = dd + result + len + crc + seq + cmd_id + key + vlen + value
  return cmdStr
}
//设置永久密码
function confPwdCmd(pwdStr, uid){
  pwdStr = "123456"
  uid = "01";
  cmd_id = "02"
  key = "14"
  var begtime = "ffffff"
  var endtime = "ffffff"
  var value = uid + pwdStr + begtime + endtime
  vlen = value.length / 2
  len = vlen + 1 + 1
  vlen = "0" + vlen.toString(16)
  len = "0" + len.toString(16)

  var cmdStr = dd + result + len + crc + seq + cmd_id + key + vlen + value
  return cmdStr
}

//设置清除密码
function confCleanPwdCmd(pwdStr, uid) {
  pwdStr = "123456"
  uid = "01";
  cmd_id = "02"
  key = "13"
  var begtime = "ffffff"
  var endtime = "ffffff"
  var value = uid + pwdStr + begtime + endtime
  vlen = value.length / 2
  len = vlen + 1 + 1
  vlen = "0" + vlen.toString(16)
  len = "0" + len.toString(16)

  var cmdStr = dd + result + len + crc + seq + cmd_id + key + vlen + value
  return cmdStr
}

//设置临时密码
function confTempPwdCmd(pwdStr, uid, btime, etime) {
  pwdStr = "123456"
  uid = "01";
  cmd_id = "02"
  key = "15"
  //计算时间
  var cleanDate = new Date("2018-01-01 00:00:00")
  var begDate = new Date("2018-01-01 00:10:00")
  var endDate = new Date("2018-01-01 00:15:00")
  var begtime = (begDate.getTime() - cleanDate.getTime()) / 60000
  var endtime = (endDate.getTime() - cleanDate.getTime()) / 60000
  begtime = begtime + 3000
  console.log(begtime.toString(16))





  var value = uid + pwdStr + begtime + endtime
  vlen = value.length / 2
  len = vlen + 1 + 1
  vlen = "0" + vlen.toString(16)
  len = "0" + len.toString(16)
  var ssss = 15

  var cmdStr = dd + result + len + crc + seq + cmd_id + key + vlen + value
  return cmdStr
}

//设置通讯密匙
//一键开门
//设置自定义密码
//删除密码
//通知读卡
//添加卡片
//删除卡片
//设备升级

//转换密码
function convertPwd(pwdStr){
  var pwdarray = pwdStr.split('')
  var pwd = "";
  for (var o in pwdarray) {
    pwd += pwdarray[o].charCodeAt().toString(16)
    console.log(pwdarray[o])
  }
  return pwd;
}

//组装返回结果
function installPwdRs(pwdStr, pwd, cmd_id, key){
  var vlen = "0" + pwdStr.length
  var l = pwdStr.length + 1 + 1
  var len = l.toString(16)
  len = "0"+len

  var cmdStr = dd + result + len + crc + seq + cmd_id + key + vlen + pwd;
  return cmdStr;
}