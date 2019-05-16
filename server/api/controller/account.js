const jwt = require('jsonwebtoken')
const verify = require('../../utils/verify')
const config = require('../../config/index')

exports.login = async (ctx) => {
  const data = ctx.request.body
  // token 加密项
  const payload = {
        userName: data.username,
        exp: Math.ceil(((new Date()).getTime() + config.expires_in * 1) / 1000)
      }
  const token = jwt.sign(payload, config.sign)  // 签发token
  ctx.body = {
    code: 200,
    data: {},
    token: token
  }
}
