const router = require('koa-router')()
const account = require('./controller/account')

router.prefix('/api')

router.post('/login', account.login)

module.exports = router
