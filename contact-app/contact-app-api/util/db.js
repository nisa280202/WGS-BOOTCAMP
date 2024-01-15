// Mengimpor modul 'pg' untuk berinteraksi dengan PostgreSQL
const Pool = require('pg').Pool;

// Mengimpor modul 'dotenv' untuk mengelola variabel lingkungan
require('dotenv').config();

// Mengimpor modul 'util' untuk utilitas umum
const util = require('util');

// Membuat instance dari objek Pool untuk koneksi ke database PostgreSQL
const pool = new Pool({
    user: process.env.USERNAME_DB,      // Mengambil nilai user dari variabel lingkungan
    password: process.env.PASSWORD_DB,  // Mengambil nilai password dari variabel lingkungan
    host: process.env.DB_HOST,          // Mengambil nilai host dari variabel lingkungan
    database: process.env.DB_NAME,      // Mengambil nilai database dari variabel lingkungan
    port: process.env.PORT_DB           // Mengambil nilai port dari variabel lingkungan
});

// Membuat fungsi 'query' yang merupakan versi berpromisifikasi dari fungsi 'query' pada objek Pool
const query = util.promisify(pool.query).bind(pool);

// Mengekspor fungsi 'query' agar dapat digunakan di tempat lain
module.exports = query;
