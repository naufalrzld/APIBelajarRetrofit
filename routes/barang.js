const express = require('express');
const Barang = require('../model/barang');
const Toko = require('../model/toko');

const router = express.Router();

router.get('/getAllBarang/:idToko', async (req, res) => {
    let result = null

    const barang = await Barang.findAll({
        where : {
            idToko : req.params.idToko
        }
    });

    if (barang.length > 0) {
        result = {
            status : res.statusCode,
            message : 'Barang tersedia',
            data : barang
        }
    } else {
        result = {
            status : res.statusCode,
            message : 'Barang Tidak Tersedia',
            data : barang
        }
    }

    res.send(result)
})

router.get('/:kodeBarang', async (req, res) => {
    let result = null

    const barang = await Barang.find({
        where : {
            kodeBarang : req.params.kodeBarang
        }
    })

    if (!barang) {
        res.statusCode = 404
        result = res.json({
            status : res.statusCode,
            message : 'Barang Tidak Tersedia'
        })
    } else {
        result = res.json({
            status : res.statusCode,
            data : barang
        })
    }

    return result
})

router.post('/addBarang', async (req, res) => {
    let Mode = req.header('Mode');
    let result = null;
    let data = null;

    if (Mode === 'Postman') {
        data = req.body;
    } else {
        data = req.body.nameValuePairs;
    }

    const barang = await Barang.create(data);
    result = {
        status : res.statusCode,
        message : 'Barang Berhasil Ditambah',
        data : barang
    };

    res.json(JSON.stringify(result));
})

router.delete('/delete/:kodeBarang', async (req, res) => {
    let result = null

    const barang = await Barang.destroy({
        where : {
            kodeBarang : req.params.kodeBarang
        }
    })

    if (barang == 0) {
        console.log('Barang Tidak Tersedia')
        res.statusCode = 404
        result = res.json({
            status : res.statusCode,
            message : 'Barang Sudah Terhapus'
        })
    } else {
        result = res.json({
            status : res.statusCode,
            message : 'Barang Berhasil Dihapus'
        })
    }

    return result
})

module.exports = router