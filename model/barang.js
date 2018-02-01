const Sequelize = require('sequelize');
const db = require('../config/database');

const barang = db.define('barang', {
    kodeBarang : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    idToko : {
        type : Sequelize.INTEGER,
        foreignKey: true
    },
    namaBarang : {
        type : Sequelize.STRING(50),
    },
    stok : {
        type : Sequelize.INTEGER
    },
    harga : {
        type : Sequelize.INTEGER
    }
}, {
    tableName : 'barang'
})

barang.sync().then(() => {
    console.log('Table Barang Synced')
})

module.exports = barang