const Sequelize = require('sequelize')

const sequelize = new Sequelize('cisam', 'root', '', {
    host: "127.0.0.1",
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})

module.exports = {Sequelize, sequelize}
