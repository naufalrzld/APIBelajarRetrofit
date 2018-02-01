const express = require('express');
const Member = require('../model/member');

const router = express.Router();

router.get('/', async (req, res) => {
    const members = await Member.findAll()
    return res.json(members)
});

router.get('/:username', async (req,res) => {
    try {
        let result = null;

        console.log(req.params.username)

        const members = await Member.find({
            where : {
                username : req.params.username
            }
        })

        if (!members) {
            res.statusCode = 404
            result = {
                status : res.statusCode,
                message : 'Member Tidak Ditemukan'
            }
        }

        result = {
            status : res.statusCode,
            data : members
        }

        if (req.header('Mode') === 'Postman') {
            res.json(result)
        } else {
            res.end(JSON.stringify(result).toString())
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.delete('/delete/:username', async (req, res) => {
    let result = null
    const member = await Member.destroy({
        where: {
            username : req.params.username
        }
    })

    if (member == 0) {
        console.log("Member Tidak Ditemukan")
        res.statusCode = 404
        result = res.json({
            status : res.statusCode,
            message : 'Member Tidak Ditemukan'
        })
    } else {
        result = res.json({
            status : res.statusCode,
            message : 'Member Berhasil Dihapus'
        })
    }

    return result
})

router.post('/register', async (req, res) => {
    let mode = req.header('Mode')
    let data = null
    let result = null
    let member = null

    try {
        if (mode === 'Postman') {
            data = req.body
        } else {
            data = req.body.nameValuePairs
        }

        console.log(data);

        member = await Member.create(data)
        result = {
            status : res.statusCode,
            message : 'Registrasi Berhasil',
            data : member
        }
    } catch (err) {
        res.statusCode = 500;
        result = {
            status : 500,
            message : 'Member Sudah Terdaftar'
        }
    }

    res.send(result)
})

router.post('/update', async (req, res) => {
    let mode = req.header('Mode')
    let result = null
    let data = null
    let member = null

    if (mode === 'Postman') {
        data = req.body
    } else {
        data = req.body.nameValuePairs
    }

    console.log(data)

    await Member.update(data, {
        where : {
            username : data.username
        }
    }).then(async (res) => {
        member = await Member.find({
            where : {
                username : data.username
            }
        })
    })

    result = {
        status: res.statusCode,
        message: 'Update Berhasil',
        data : member
    }

    res.send(result)
})

router.post('/login', async (req, res) => {
    let mode = req.header('Mode')
    let data = null
    let result = null

    if (mode === 'Postman') {
        data = req.body
    } else {
        data = req.body.nameValuePairs
    }

    console.log(data)

    const member = await Member.findOne({
        where : {
            username : data.username
        }
    })

    if (!member) {
        res.statusCode = 404
        result = {
            status : res.statusCode,
            message : 'Username Tidak Ditemukan'
        }
    } else {
        if (member.password === data.password) {
            result = {
                status : res.statusCode,
                message : 'Login Sukses',
                data : member
            }
        } else {
            res.statusCode = 401
            result = {
                status : res.statusCode,
                message : "Password Salah"
            }
        }
    }

    res.send(result)
})

module.exports = router;