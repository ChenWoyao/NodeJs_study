const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticFiles = require('koa-static')

const app = new Koa()
const JSON_MIME = 'application/json'

// open: 启动mongo客户端
const {
    open
} = require('./lib/db/connect')
const router = require('./routes')
// 跨域用cors处理
const cors = require('@koa/cors')

// 引用自定义的中间键
const logger = require('./middlewares/log')

open()


app.use(logger)
app.use(cors({
    origin: '*'
}))
app.use(bodyParser({
    multipart: true
}))
/**
 * 强制缓存: Cache-Control > expires(一般不用了)
 * 协商缓存: Etag/If-None-Match > Last-Modified/If-Modified-Since
 *
 * max-age 是 caceh-control设置的，如果过期，资源带有Etag标识，发送If-None-Match
 * 优先根据Etag的值判断被请求的文件有没有做修改，Etag值一致则没有修改，命中协商缓存，返回304；
 * 如果不一致则有改动，直接返回新的资源文件带上新的Etag值并返回200；；
 *
 * 如果服务器收到的请求没有Etag值，则将If-Modified-Since和被请求文件的最后修改时间做比对，
 * 一致则命中协商缓存，返回304；不一致则返回新的last-modified和文件并返回200；
 */
app.use(staticFiles(path.resolve(__dirname, './uploads'), {
    maxage: 30 * 24 * 60 * 60 * 1000
}))

app.use(async (context, next) => {
    context.type = JSON_MIME
    await next()
})

app.use(async (context, next) => {
    try {
        await next()
    } catch (ex) {
        context.logger.error(ex.stack || ex)
        context.body = {
            status: -1,
            message: ex.message || ex,
            code: ex.status
        }
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4001)
console.log('app service start at 4001')
