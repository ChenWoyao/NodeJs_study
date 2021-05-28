const env = process.env
const appKey = env.APP_KET || 'default key'
const appSecret = env.APP_SECRET || 'default secret'
const nodeEnv = env.NODE_ENV || 'development'

let db = {
    name: 'mongodb://127.0.0.1:27017/xcx',
    user: 'admin',
    password: 'admin'
}

if (nodeEnv === 'production') {
    db = {
        name: 'mongodb://127.0.0.1:27017/xcx',
        user: 'test',
        password: 'test'
    }
}

module.exports = {
    appKey,
    appSecret,
    db
}
