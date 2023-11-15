// Mengimpor modul Express dan express-ejs-layouts
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express() // Membuat instance Express
const port = 3000 // Menetapkan port aplikasi

// Konfigurasi untuk menggunakan EJS sebagai view engine
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.set('layout', './layout/layout')

// Mengatur route untuk halaman utama (home)
app.get('/', (req, res) => {
    // res.sendFile('./views/home.html', {root: __dirname})
    const name = "Nisa Alivia"

    // Merender halaman home.ejs dengan data yang diberikan
    res.render('home', {name, title:"Home"})
})

// Mengatur route untuk halaman about
app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root: __dirname})
    
    // Merender halaman about.ejs dengan data title
    res.render('about', {title:"About"})
})

// Mengatur route untuk halaman contact
app.get('/contact', (req, res) => {
    // res.sendFile('./views/contact.html', {root: __dirname})
    const cont = [
        {
            name: 'Nisa Alivia',
            phone: '0896625327489'
        }, 
        {
            name: 'Jumawa',
            phone: '0821118976562'
        },
        {
            name: 'Cacang',
            phone: '0812364892677'
        }
    ]
    // Merender halaman contact.ejs dengan data yang diberikan
    res.render('contact', {data: cont, title:"Contact"})
})

// app.get('/product/:id/:category', (req, res) => {
//     res.send('product id : ' + req.params.id + ' category id : ' + req.params.category)
// })

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