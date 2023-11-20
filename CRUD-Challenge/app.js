// Mengimpor modul Express dan express-ejs-layouts
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express() // Membuat instance Express
const port = 3000 // Menetapkan port aplikasi
const fs = require('fs')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');

// Mendeklarasi path folder dan file data
const dirPath = './data';
const dataPath = './data/data-contact.json';

// Mengecek folder, jika tidak ada akan dibuat
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Mengecek file, jika tidak ada akan dibuat
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// Fungsi untuk membaca file JSON
const readFile = () => {
    try {
        // Membaca file secara synchronous
        const dataTemp = fs.readFileSync(dataPath, 'utf-8');
        // Mengembalikan hasil parsing JSON
        return JSON.parse(dataTemp) || [];
    } catch (err) {
        return [];
    }
}

// Fungsi untuk menulis ke dalam file JSON
const writeFile = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data));
}

// Konfigurasi untuk menggunakan EJS sebagai view engine
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.set('layout', './layout/layout')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

// Mengatur route untuk halaman utama (home)
app.get('/', (req, res) => {
    const name = "Nisa Alivia"

    // Merender halaman home.ejs dengan data yang diberikan
    res.render('home', {name, title:"Home"})
})

// Mengatur route untuk halaman about
app.get('/about', (req, res) => {
    // Merender halaman about.ejs dengan data title
    res.render('about', {title:"About"})
})

// Mengatur route untuk halaman contact
app.get('/contact', (req, res) => {
    const existingData = readFile();
    res.render('contact', {data: existingData, title:"Contact"})
})

// Mengatur route untuk halaman detail contact
app.get('/detail-contact/:name', (req, res) => {
    const existingData = readFile();
    // console.log(req.params.name);
    const contact = existingData.find((c) => c.name === req.params.name);
    // console.log(contact);
    res.render('detail-contact', {contact, title:'Detail Contact'})
})

// Mengatur route untuk menampilkan form add contact
app.get('/add-contact', (req, res) => {
    res.render('add-contact', {title:'Add Contact', contact: null})
})

// Mengatur route untuk menangani permintaan add contact melalui method POST
app.post('/add-contact', [
    // Validasi input nomor telepon dan email menggunakan express-validator
    check('phone', 'Phone number not valid!').isMobilePhone('id-ID'),
    check('email', 'Email not valid!').isEmail()
], (req, res) => {
    let error = validationResult(req);
    let errors = [];
    const existingData = readFile();
    const {name, phone, email} = req.body;

    // Membuat object contact baru
    const contact = {name, phone, email}

    // Kondisi untuk memeriksa apakah ada kesalahan validasi atau nama kontak sudah terdaftar
    if (!error.isEmpty() || !existingData.every(contact => contact.name !== name)) {
        // Kondisi ketika nama kontak sudah terdaftar
        if (!existingData.every(contact => contact.name !== name)) {
            errors.push({ msg: 'Name is already registered!'})
        }

        // Kondisi untuk menambahkan error message
        if (!error.isEmpty()) {
            errors.push(...error.array())
        }

        res.render('add-contact', {title: 'Add Contact', contact: contact, errors: errors})
    } else {
        // Jika tidak ada kesalahan, maka data yang dimasukan akan ditambahkan sebagai kontak baru
        const newData = {
            name: name,
            phone: phone,
            email: email,
        };
    
        existingData.push(newData);
    
        writeFile(existingData);
        
        // Redirect ke halaman contact setelah berhasil menambahkan kontak baru
        res.redirect('/contact');
    }
})

// Mengatur route untuk menampilkan form update contact
app.get('/update-contact/:name', (req, res) => {
    // Membaca data yang sudah ada
    const existingData = readFile()
    // Ambil nama kontak dari params
    const name = req.params.name
    let data

    // Pengulangan untuk mencari data kontak sesuai dengan nama dari params
    for (let i = 0; i < existingData.length; i++) {
        if (existingData[i]['name'] === name) {
            data = existingData[i]
        }
    }

    // Menambahkan properti oldName untuk menyimpan nama sebelum di update
    data.oldName = data.name

    // Merender view update-contact dengan data kontak yang akan di update
    res.render('update-contact', {
        contact: data,
        title: 'Update Contact'
    })
})

// Mengatur route untuk menangani permintaan update contact melalui method POST
app.post('/update-contact', [
    // Validasi input nomor telepon dan email menggunakan express-validator
    check('phone', 'Phone number not valid!').isMobilePhone('id-ID'),
    check('email', 'Email not valid!').isEmail()
], (req, res) => {
    // Variabel untuk menampung hasil validasi
    let error = validationResult(req);
    // Variabel untuk menampung error gabungan
    let errors = [];
    // Membaca data yang sudah ada
    const existingData = readFile();
    const {oldName, name, phone, email} = req.body

    // Membuat object kontak yang akan di update
    let contact = {
        oldName: oldName,
        name: name,
        phone: phone,
        email: email
    }

    // Kondisi untuk memeriksa apakah ada kesalahan validasi
    if (!error.isEmpty()) {
        // Kondisi ketika nama yang di update sudah terdaftar
        if (!oldName === name) {
            if (!existingData.every(contact => contact.name !== name)) {
                errors.push({ msg: 'Name is already registered!'})
            }
        }

        if (!error.isEmpty()) {
            errors.push(...error.array())
        }

        res.render('update-contact', {title: 'Update Contact', errors: errors, contact: contact})
    } else {
        // Pengulangan untuk mengupdate data kontak
        for (let i = 0; i < existingData.length; i++) {
            if (existingData[i]['name'] === oldName) {
                existingData[i] = contact
            }
        }
    
        writeFile(existingData);
    
        res.redirect('/contact');
    }

})

// Mengatur route untuk menghapus data kontak
app.get('/delete-contact', (req, res) => {
    // Membaca data yang sudah ada
    const existingData = readFile();
    // Mengambil nama kontak dari parameter query
    const name = req.query.name;

    // Mencari data kontak yang sesuai dengan nama dari parameter query dan melakukan penghapusan data
    for(let i = 0; i < existingData.length; i++) {
        if(existingData[i]['name'] === name) {
            existingData.splice(i, 1);
        }
    }

    writeFile(existingData);
    res.redirect('/contact')
})

// Mengatur route untuk halaman product dengan parameter id dan query name serta category
app.get('/product/:id', (req, res) => {
    // Mengirim repson dengan informasi produk berdasarkan parameter dan query 
    res.send('product id : ' + req.params.id + ', product name : ' + req.query.name + ', product category : ' + req.query.category)
})

// Posisinya harus dipaling bawah
// Untuk menampilkan halaman yang tidak ditemukan (404)
app.use('/', (req, res) => {
    res.status(404)
    res.send('page not found : 404')
})

// Menjalankan server pada port yang ditentukan
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})