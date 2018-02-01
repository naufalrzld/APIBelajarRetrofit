    const Sequelize = require('sequelize');
    const db = require('../config/database');
    const member = require('./member');
    const barang = require('./barang');

    const toko = db.define('toko', {
        idToko : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : {
            type : Sequelize.STRING(25)
        },
        namaToko : {
            type : Sequelize.STRING(50),
            unique : true
        },
        descToko : {
            type : Sequelize.STRING
        }
    }, {
        tableName : 'toko'
    })

    toko.belongsTo(member, {
        foreignKey : 'username',
        onUpdate : 'cascade',
        onDelete : 'cascade'
    })

    toko.hasMany(barang, {
        foreignKey : 'idToko',
        onUpdate : 'cascade',
        onDelete : 'cascade'
    })

    toko.sync().then(() => {
        console.log('Table Toko Synced')
    })

    module.exports = toko