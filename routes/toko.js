const express = require('express');
const Toko = require('../model/toko');
const Barang = require('../model/barang');

const router = express.Router();

router.get('/', async (req, res) => {
    let result = null;

    const toko = await Toko.findAll()
    if (!toko) {
        res.statusCode = 404
        result = res.json({
            status : res.statusCode,
            message : 'Tidak Ada Toko'
        })
    } else {
        result = res.json({
            status : res.statusCode,
            data : toko
        })
    }
    return result
})

router.get('/:username', async (req, res) => {
    const toko = await Toko.findAll({
        attributes: Object.keys(Toko.attributes).concat([
            [Toko.sequelize.literal('(SELECT COUNT(\'*\') FROM barang WHERE idToko = toko.idToko)'), 'jumlahBarang']
        ]),
        where : {
            username : req.params.username
        }
    })

    res.send({
        status : res.statusCode,
        message : "Success",
        data : toko
    })
})

router.get('/:idToko', async (req, res) => {
    const toko = await Toko.find({
        where : {
            idToko : req.params.idToko
        }
    })

    if (!toko) {
        res.statusCode = 404
        return res.json({
            status : res.statusCode,
            message : 'Toko Tidak Ditemukan'
        })
    }

    return res.json(toko)
})

router.post('/addToko', async (req, res) => {
    let mode = req.header('Mode');
    let toko = null;
    let data = null;
    let result = null;

    if (mode === 'Postman') {
        data = req.body;
    } else {
        data = req.body.nameValuePairs
    }

    try {
        toko = await Toko.create(data)
        result = {
            status : res.statusCode,
            message : 'Tambah Toko Sukses',
            data : toko
        }

        return res.json(JSON.stringify(result))
    } catch (err) {
        res.statusCode = 500;
        result = {
            status : res.statusCode,
            message : 'Nama Toko Sudah Tersedia'
        }

        return res.send(result)
    }
})

router.delete('/:username/deleteAllToko', async (req, res) => {
    const toko = await Toko.destroy({
        where : {
            username : req.params.username
        }
    })

    if (toko == 0) {
        res.statusCode = 404
        console.log("Toko Sudah Terhapus")
        return res.json({
            status : res.statusCode,
            message : 'Anda Sudah Tidak Memiliki Toko'
        })
    }

    return res.json({
        status : res.statusCode,
        message : toko + ' Toko Sudah Terhapus'
    })
})

router.delete('/delete/:idToko', async (req, res) => {
    let result = null

    const toko = await Toko.destroy({
        where : {
            idToko : req.params.idToko
        }
    })

    if (toko == 0) {
        console.log("Toko Tidak Ditemukan")
        res.statusCode = 404
        result = res.json({
            status : res.statusCode,
            message : 'Toko Tidak Ditemukan'
        })
    } else {
        result = res.json({
            status : res.statusCode,
            message : 'Toko Berhasil Dihapus'
        })
    }

    return result
})

router.post('/update', async (req, res) => {
    let result = null

    const toko = await Toko.update(req.body, {
        where : {
            idToko : req.body.idToko
        }
    })

    if (toko == 0) {
        res.statusCode = 500
        result =  res.json({
            status: res.statusCode,
            message: 'Update Gagal',
        })
    } else {
        result = res.json({
            status: res.statusCode,
            message: 'Update Berhasil',
        })
    }

    return result
})

module.exports = router