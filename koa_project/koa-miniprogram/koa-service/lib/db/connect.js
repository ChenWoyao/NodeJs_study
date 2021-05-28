const mongoose = require('mongoose')
const {name, user, password } = require('../../conig').db

module.exports = {
    open() {
        return mongoose.connect(name, {
            user: user,
            pass: password,
            poolSize: 10,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then((status) => {
            console.log('mongo connection status', status)
        })
    },
    close() {
        return mongoose.connection.close()
    }
}
