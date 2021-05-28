const {
    appKey,
    appSecret
} = require('../conig')

const request = require('request')

/**
 * oauth2
 * 用户访问客户端，后者将前者导向认证服务器
 * https://b.com/oauth/authorize?
  response_type=code&client_id=CLIENT_ID&redirect_uri=CALLBACK_URL&scope=read
 * 用户选择是否给予客户端授权
 * 假设用户给予授权，认证服务器将用户导向客户端事先指定的"重定向URI"（redirection URI），同时附上一个授权码
 * https://a.com/callback?code=AUTHORIZATION_CODE
 * 客户端收到授权码，附上早先的"重定向URI"，向认证服务器申请令牌。这一步是在客户端的后台的服务器上完成的，对用户不可见。
 * https://b.com/oauth/token?client_id=CLIENT_ID&
client_secret=CLIENT_SECRET&grant_type=authorization_code&code=AUTHORIZATION_CODE&
redirect_uri=CALLBACK_URL
 *B 网站收到请求以后，就会颁发令牌。具体做法是向redirect_uri指定的网址，发送一段 JSON 数据
 */
module.exports = {
    // code是授权码
    async getSession(code) {
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appKey}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
        return new Promise((resolve, reject) => {
            reqeust(url, {
                method: 'GET',
                json: true,
            }, (error, res, body) => {
                if (error) {
                    reject(error)
                } else {
                    if (body.errcode) {
                        reject(new Error(body.errmsg))
                    } else {
                        resolve(body)
                    }
                }
            })
        })
    }
}
