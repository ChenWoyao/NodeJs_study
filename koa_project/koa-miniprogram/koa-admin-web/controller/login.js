const util = require('../util/util.js')
const axios = require('axios')
const { HOST, PORT} = require('../config')

module.exports = {
    index: async (ctx, next) => {
        if (ctx.state.token) {
            /**
             * 301 Moved Permanently 永久重定向
             * 与 301 状态码类似；但是，客户端应该使用 Location 首部给出的 URL 来临时定位资源。将来的请求仍应使用老的 URL
             * 303 与 302相似，但是只准get请求方式
             * 304 客户的缓存资源是最新的， 要客户端使用缓存
             */
            ctx.status = 302
            ctx.redirect('/photos/all')
        } else {
            await ctx.render('login/login')
        }
    },
    // 生成二维码
    getQrcode: async (ctx, next) => {
        const res = await axios.get(`http://${HOST}:${PORT}/login/ercode`)
        ctx.response.body = res.data.data
    },
    // 轮询二维码验证
    getToken: async (ctx, next) => {
        const res = await axios.get(`http://${HOST}:${PORT}/login/errcode/check/${ctx.query.code}`)
        ctx.response.body = res.data
        if (res.data.data) {
            util.setToken(ctx, res.data.data.sessionKey)
        }
    },
    // 验证是否管理员
    checkAuth: async (ctx, next) => {
        let res = await axios.get(`http://${HOST}:${PORT}/my`, {
            headers: {
                'x-session': util.getToken(ctx)
            }
        })
        ctx.response.body = res.data
    },
    logout: async (ctx, next) => {
        util.redirectToLogin(ctx)
    }
}
