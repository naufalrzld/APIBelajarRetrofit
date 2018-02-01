const express = require('express');
const bodyParser = require('body-parser');
const member = require('./routes/member');
const toko = require('./routes/toko');
const barang = require('./routes/barang');
const app = express();
const timeout = require('connect-timeout');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(timeout('600s'));

app.get('/', (req, res) => {
    res.json('Hellow World')
});

app.use('/member', member);
app.use('/toko', toko);
app.use('/barang', barang);

app.listen(PORT, () => console.log('Example app running on port ${PORT}'));