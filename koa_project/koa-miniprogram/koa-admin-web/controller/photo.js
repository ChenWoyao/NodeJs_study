const model = require('../model/home.js')
const axios = require('axios')
const { HOST, PORT} = require('../config')

module.exports = {
    getPhotos: async (ctx, next) => {
        let status = ctx.params.status || 'all'
        let count = 12
        let index = ctx.request.querystring ? ctx.request.query.index : 1
        let column = ctx.request.querystring ? ctx.request.query.column : 3

        // 调接口
        let res = await axios.get(
            `http://${HOST}:${PORT}/admin/photo/${status}?pageIndex=${index}&pageSize=${count}`, {
                headers: {
                    'x-session': ctx.state.token
                }
            }
        )

        await ctx.render('home/photos', {
            menu: model.getMenu(),
            activeMenu: 0,
            photos: res.data.data.data || [],
            page: Math.ceil(res.data.data.count / count),
            column: column,
            index: parseInt(index),
            status: status
        })
    },
    editPhotos: async (ctx, next) => {
        let isApproved = ctx.request.body.type === 0 ? null : (ctx.request.body.type === 1)
        let res = await axios.put(`http://${HOST}:${PORT}/admin/photo/${ctx.params.id}`, {
            isApproved
        }, {
            headers: {
                'x-session': ctx.state.token
            }
        })
        ctx.body = res.data
    }
}
