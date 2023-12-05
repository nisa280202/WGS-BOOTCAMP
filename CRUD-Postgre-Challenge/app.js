// Mengimpor modul Express.js untuk membangun aplikasi web
const express = require('express')
// Mengimpor modul Express EJS Layouts
const expressEjsLayouts = require('express-ejs-layouts')
// Membuat instance aplikasi Express
const app = express()
// Menetapkan nomor port yang akan digunakan oleh aplikasi
const port = 3000
// Mengimpor modul Body Parser untuk memproses data POST request
const bodyParser = require('body-parser')
// Mengimpor modul Express Validator untuk melakukan validasi data dari request
const { check, validationResult } = require('express-validator');
// Mengimpor fungsi-fungsi terkait database dari file repository.js
const { getAllContact, addContact, getContact, updateContact, deleteContact } = require('./repository')

// Mengatur view engine menggunakan EJS
app.set('view engine', 'ejs')
// Menggunakan Express EJS Layouts untuk mengelola layout dengan EJS sebagai view engine
app.use(expressEjsLayouts)
// Mengatur layout default yang akan digunakan oleh aplikasi
app.set('layout', './layout/layout')
// Menggunakan file statis (CSS, gambar, dll.) dari direktori 'public'
app.use(express.static('public'))
// Menggunakan middleware Body Parser untuk memproses data dari POST request
app.use(bodyParser.urlencoded({ extended: true }))


// Mendefinisikan route untuk handle HTTP GET request ke root path ('/')
app.get('/', (req, res) => {
    // Menentukan data yang akan dikirimkan ke template EJS
    const name = "Nisa Alivia"
    // Merender template 'home.ejs' dengan data yang telah ditentukan
    res.render('home', { name, title: "Home" })
})

// Mendefinisikan route untuk handle HTTP GET request ke path '/about'
app.get('/about', (req, res) => {
    // Merender template 'about.ejs'
    res.render('about', { title: "About" })
})

// Mendefinisikan route untuk handle HTTP GET request ke path '/contact'
app.get('/contact', async (req, res) => {
    // Memanggil fungsi getAllContact untuk mendapatkan semua kontak
    const contacts = await getAllContact();
    // Merender template 'contact.ejs' dengan data yang telah diperoleh dari getAllContact
    res.render('contact', { data: contacts, title: "Contact" })
})

// Mendefinisikan route untuk handle HTTP GET request ke path '/detail-contact' dengan parameter id
app.get('/detail-contact/:id', async (req, res) => {
    // Mengambil nilai ID dari parameter yang ada dalam URL
    const id = req.params.id;
    // Memanggil fungsi getContact untuk mendapatkan detail kontak berdasarkan ID
    const contact = await getContact(id);
    // Merender template 'detail-contact.ejs' dengan data yang telah diperoleh dari getContact
    res.render('detail-contact', { contact, title: 'Detail Contact' })
})

// Mendefinisikan route untuk handle HTTP GET request ke path '/add-contact'
app.get('/add-contact', (req, res) => {
    // Merender template 'add-contact.ejs' dengan data yang telah ditentukan
    // Data contact diatur menjadi null karena ini adalah halaman untuk menambahkan kontak baru
    res.render('add-contact', { title: 'Add Contact', contact: null })
})

// Mendefinisikan route untuk handle HTTP POST request ke path '/add-contact'
app.post('/add-contact', [
    // Menentukan validasi phone number dan email untuk data yang dikirim melalui formulir
    check('phone', 'Phone number not valid!').isMobilePhone('id-ID'),
    check('email', 'Email not valid!').isEmail()
], async (req, res) => {
    // Mendapatkan hasil validasi dari data yang dikirim melalui formulir
    let errors = validationResult(req);
    // Mendapatkan data dari body request
    const { name, phone, email, address } = req.body;
    // Membuat objek contact dengan data yang diterima dari formulir
    const contact = { name, phone, email, address };

    // Membuat objek data yang akan disimpan ke dalam database
    const data = {
        name: name,
        phone: phone,
        email: email,
        address: address
    };

    // Memeriksa apakah terdapat kesalahan validasi
    if (!errors.isEmpty()) {
        // Jika ada kesalahan, merender kembali halaman 'add-contact' dengan menampilkan pesan kesalahan
        res.render('add-contact', { title: 'Add Contact', contact: contact, errors: errors.array() })
    } else {
        // Jika tidak ada kesalahan, melakukan penambahan kontak ke dalam database
        const result = await addContact(data);
        // Memeriksa apakah penambahan kontak berhasil
        if (!result) {
            // Jika gagal, merender kembali halaman 'add-contact' dengan menampilkan pesan kesalahan
            res.render('add-contact', { title: 'Add Contact', contact: contact, errors: errors.array() })
        }
        // Jika berhasil, melakukan redirect ke halaman 'contact'
        res.redirect('/contact');
    }
})

// Mendefinisikan route untuk handle HTTP GET request ke path '/update-contact' dengan parameter id
app.get('/update-contact/:id', async (req, res) => {
    // Mengambil nilai ID dari parameter yang ada dalam URL
    const id = req.params.id;
    // Memanggil fungsi getContact untuk mendapatkan detail kontak berdasarkan ID
    const contact = await getContact(id);
    // Merender template 'update-contact.ejs' dengan data yang telah diperoleh dari getContact
    res.render('update-contact', { contact: contact, title: 'Update Contact' })
})

// Mendefinisikan route untuk handle HTTP POST request ke path '/update-contact'
app.post('/update-contact', [
    // Menentukan validasi phone number dan email untuk data yang dikirim melalui formulir
    check('phone', 'Phone number not valid!').isMobilePhone('id-ID'),
    check('email', 'Email not valid!').isEmail()
], async (req, res) => {
    // Mendapatkan hasil validasi dari data yang dikirim melalui formulir
    let errors = validationResult(req);
    // Mendapatkan data dari body request yang dikirim melalui formulir
    const { id, name, phone, email, address } = req.body;

    // Membuat objek contact dengan data yang diterima dari formulir
    let contact = {
        id: id,
        name: name,
        phone: phone,
        email: email,
        address: address
    };

    // Memeriksa apakah terdapat kesalahan validasi
    if (!errors.isEmpty()) {
        // Jika ada kesalahan, merender kembali halaman 'update-contact' dengan menampilkan pesan kesalahan
        res.render('update-contact', { title: 'Update Contact', contact: contact, errors: errors.array() })
    } else {
        // Jika tidak ada kesalahan, melakukan pembaruan kontak ke dalam database
        const result = await updateContact(contact);
        // Memeriksa apakah pembaruan kontak berhasil
        if (!result) {
            // Jika gagal, merender kembali halaman 'update-contact' dengan menampilkan pesan kesalahan
            res.render('update-contact', { title: 'Update Contact', contact: contact, errors: errors.array() })
        }
        // Jika berhasil, melakukan redirect ke halaman 'contact'
        res.redirect('/contact');
    }
})

// Mendefinisikan route untuk handle HTTP GET request ke path '/delete-contact' dengan parameter id
app.get('/delete-contact/:id', async (req, res) => {
    // Mengambil nilai ID dari parameter yang ada dalam URL
    const id = req.params.id;
    // Memanggil fungsi deleteContact untuk menghapus kontak berdasarkan ID
    await deleteContact(id);
    // Melakukan redirect ke halaman 'contact' setelah menghapus kontak
    res.redirect('/contact');
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('page not found : 404')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})