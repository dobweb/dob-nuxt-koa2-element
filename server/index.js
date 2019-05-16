const Koa = require('koa')
const app = new Koa()
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const xmlParser = require('koa-xml-body')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const jwtKoa = require('koa-jwt')
const authorization = require('./utils/authorization')
const config = require('./config/index')

const api = require('./api/routers')

// Import and Set Nuxt.js options
let pkg = require('../nuxt.config.js')
pkg.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(pkg)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (pkg.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(authorization())

  app.use(cors({
    origin: function (ctx) {
      if (ctx.url === '/test') {
        return false;
      }
      // return 'http://192.168.0.85:4000';
      return ctx.header.origin;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'date', 'dobToken'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST','DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'dobToken']
  }))
  // 排除不需要验证
  app.use(
    jwtKoa({ secret: config.sign }).unless({
      path: [
        /^\/_nuxt\/*/,
        /^\/__webpack_hmr\/*/,
        /^\/favicon.ico/,
        /^\/admin/,
        /^\/admin\/login/,  // 后台登录页面
        /^\/api\/login/,  // 登录接口

      ]
    })
  )
  // middlewares
  app.use(xmlParser({
    limit: 2048,
    encoding: 'utf8', // lib will detect it from `content-type`
    xmlOptions: {
        explicitArray: false
    },
    // key: 'xmlBody', // lib will check ctx.request.xmlBody & set parsed data to it.
    onerror: (err, ctx) => {
      console.log(err)
        //ctx.throw(err.status, err.message);
    }
  }))
  app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
  }))
  app.use(logger())

  // 后台路由
  app.use(api.routes(), api.allowedMethods())

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
