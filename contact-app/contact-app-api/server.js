// Mengimpor modul 'body-parser' untuk mengelola data permintaan HTTP
const bodyParser = require('body-parser');
// Mengimpor modul 'express' untuk membuat aplikasi web
const express = require('express');
// Mengimpor modul 'dotenv' untuk mengelola variabel lingkungan
require('dotenv').config();
// Mengimpor router untuk rute yang terkait dengan kontak
const contactRouter = require('./route/contact.js');
// Mengimpor modul 'cors' untuk menangani kebijakan lintas sumber (CORS)
const cors = require('cors');
// Membuat instance dari aplikasi Express
const app = express();

// Menggunakan middleware untuk menguraikan data permintaan HTTP
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Menggunakan middleware 'body-parser' untuk menguraikan data permintaan HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Menggunakan middleware 'cors' dengan konfigurasi untuk mengizinkan sumber dari 'http://localhost:3000'
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Menetapkan rute '/contact' ke router yang telah diimpor
app.use('/contact', contactRouter);

// Menjalankan pada port yang didefinisikan dalam variabel lingkungan
app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
});
