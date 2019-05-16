const verify = require('./verify')
const config = require('../config/index')
/**
 * 判断token是否可用
 */
module.exports = function () {
  return async function (ctx, next) {
    try {
      let token = ctx.header.authorization  // 获取jwt
      if(token) {
        let payload
        token = token.split(' ')[1]
        try {
          payload = await verify(token, config.sign)  // 解密payload，获取用户名和ID
          if (!payload.code || payload.iat > payload.exp) {
            ctx.body = {
              status: 401
            }
          }
        } catch (err) {
          throw('token verify fail: ', err)
        }
      }
      // await next()
    } catch (err) {
      if (err.status === 401) {
        ctx.body = {
          code: -1,
          message: '认证失败'
        }
      } else {
        err.status = 404
        ctx.body = err
      }
    }
    await next()
  }
}
