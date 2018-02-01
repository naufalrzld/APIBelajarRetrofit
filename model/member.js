const Sequelize = require('sequelize');
const db = require('../config/database');

const members = db.define('member', {
    username: {
        type: Sequelize.STRING(25),
        primaryKey : true
    },
    firstName: {
        type: Sequelize.STRING(50)
    },
    lastName: {
        type: Sequelize.STRING(50)
    },
    email: {
        type: Sequelize.STRING(100),
        unique : true
    },
    password : {
        type: Sequelize.STRING(16)
    }
})

members.sync().then(() => {
    console.log("Table Member Synced")
})

module.exports = members