const fs = require('fs')
const path = require('path')
const { WeiBo } = require('../lib')

;(async function run () {
  const userInfoCachePath = path.resolve(__dirname, '../cache/weibo.userinfo.json')
  const platformer = new WeiBo(require(userInfoCachePath), {
    cachePath: path.resolve(__dirname, '../cache'),
    debug: true
  })

  platformer.addListener('loginHook', (status) => {
    if (status === 'finish') {
      fs.writeFileSync(userInfoCachePath, JSON.stringify(platformer.info(), null, 4))
    }
  })
  // await platformer.checkLogin()
  // console.log('------------------------------------------------------------------------')
  await platformer.login(1, 2, 3)
  // console.log('------------------------------------------------------------------------')
  // await platformer.checkLogin()
  // if (!await platformer.checkLogin()) await platformer.login()
  // await platformer.updatePlatformerInfo(platformer)
})()
