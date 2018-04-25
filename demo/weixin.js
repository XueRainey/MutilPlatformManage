const fs = require('fs')
const path = require('path')
const { WeiXin } = require('../lib')
const { weixin: weixinLoginInfo } = require('../cache/loginInfo')

;(async function run () {
  try {
    const userInfoCachePath = path.resolve(__dirname, '../cache/weixin.userinfo.json')
    const platformer = new WeiXin({
      debug: false
    }, require(userInfoCachePath))

    platformer.addListener('loginHook', (status, data) => {
      console.log(status)
      if (status === 'qrImageDownload') {
        // `data:${data.fileType};base64,${data.buffer.toString('base64')}`
        fs.writeFileSync('./cache/qr.jpeg', data.buffer.toString('binary'), 'binary', console.log)
      }
      if (status === 'finish') {
        // fs.writeFileSync(userInfoCachePath, JSON.stringify(platformer.info(), null, 4))
        console.log('login done')
      }
    })

    platformer.addListener('onUserInfoChange', () => {
      fs.writeFileSync(userInfoCachePath, JSON.stringify(platformer.info(), null, 2))
    })

    if (!await platformer.checkLogin()) await platformer.login(weixinLoginInfo)
  } catch (e) {
    console.error(e.message)
  }
})()
