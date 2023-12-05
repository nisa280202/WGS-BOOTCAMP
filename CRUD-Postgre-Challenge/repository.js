// Mengimpor modul 'pg' untuk PostgreSQL, dan modul 'dotenv' untuk mengambil konfigurasi dari file .env
const Pool = require('pg').Pool
require('dotenv').config()
const util = require('util')

// Membuat objek Pool untuk koneksi ke database PostgreSQL menggunakan konfigurasi dari file .env
const pool = new Pool({
    user: process.env.USERNAME_DB,        // Nama pengguna database
    password: process.env.PASSWORD_DB,    // Kata sandi database
    host: process.env.DB_HOST,            // Host database
    database: process.env.DB_NAME,        // Nama database
    port: process.env.PORT_DB             // Port koneksi database
})

// Menggunakan util.promisify untuk mengubah metode callback dari pool.query menjadi promise
const query = util.promisify(pool.query).bind(pool)

// Definisi fungsi untuk mendapatkan semua data kontak dari tabel contacts
const getAllContact = async () => {
    try {
        // Query SQL untuk memilih semua data dari tabel contacts dan mengurutkannya berdasarkan ID secara ascending
        const queryText = 'SELECT * FROM contacts ORDER BY id ASC'
        // Menjalankan query ke database dan menunggu hasilnya
        const result = await query(queryText)
        // Mengembalikan baris hasil query
        return result.rows
    } catch (error) {
        // Menangani kesalahan jika terjadi
        console.log(error)
        // Mengembalikan null sebagai indikator bahwa operasi mendapatkan data kontak gagal
        return null
    }
}

// Definisi fungsi untuk mendapatkan satu kontak berdasarkan ID
const getContact = async (id) => {
    try {
        // Query SQL untuk memilih satu data kontak berdasarkan ID
        const queryText = 'SELECT * FROM contacts WHERE id = $1'
        // Menjalankan query ke database dengan menggunakan nilai ID sebagai parameter
        const result = await query(queryText, [id])
        // Mengembalikan baris hasil query
        return result.rows[0]
    } catch (error) {
        // Menangani kesalahan jika terjadi
        console.log(error)
        // Mengembalikan null sebagai indikator bahwa operasi mendapatkan kontak gagal
        return null
    }
}

// Definisi fungsi untuk menambahkan kontak baru ke dalam tabel
const addContact = async (contact) => {
    try {
        // Query SQL untuk menyisipkan data ke dalam tabel contacts
        const queryText = 'INSERT INTO contacts(name, phone, email, address) VALUES ($1, $2, $3, $4)' // $1, $2, $3, $4 merupakan parameter yang digunakan sebagai placeholder untuk nilai dari data yg akan dimasukkan
        // Menyiapkan nilai-nilai yang akan disisipkan ke dalam query
        const value = [contact.name, contact.phone, contact.email, contact.address]
        // Menjalankan query ke database dan menunggu hasilnya
        const result = await query(queryText, value)
        // Mengembalikan baris hasil query
        return result.rows
    } catch (error) {
        // Menangani kesalahan jika terjadi
        console.log(error)
        // Mengembalikan null sebagai indikator bahwa operasi penambahan kontak gagal
        return null
    }
}

// Definisi fungsi untuk memperbarui kontak berdasarkan ID
const updateContact = async (contact) => {
    try {
        // Query SQL untuk memperbarui data kontak berdasarkan ID
        const queryText = 'UPDATE contacts SET name = $1, phone = $2, email = $3, address = $4 WHERE id = $5'
        // Menyiapkan nilai-nilai yang akan diupdate ke dalam query
        const value = [contact.name, contact.phone, contact.email, contact.address, contact.id]
        // Menjalankan query ke database dan menunggu hasilnya
        const result = await query(queryText, value)
        // Mengembalikan baris hasil query
        return result.rows
    } catch (error) {
        // Menangani kesalahan jika terjadi
        console.log(error)
        // Mengembalikan null sebagai indikator bahwa operasi pembaruan kontak gagal
        return null
    }
}

// Definisi fungsi untuk menghapus kontak berdasarkan ID
const deleteContact = async (id) => {
    try {
        // Query SQL untuk menghapus data kontak dari tabel contacts berdasarkan ID
        const queryText = 'DELETE FROM contacts WHERE id = $1'  
        // Menjalankan query ke database dengan menggunakan nilai ID sebagai parameter
        const result = await query(queryText, [id])
        // Mengembalikan baris hasil query
        return result.rows[0]
    } catch (error) {
        // Menangani kesalahan jika terjadi
        console.log(error)
        // Mengembalikan null sebagai indikator bahwa operasi penghapusan kontak gagal
        return null
    }
}

// Mengekspor semua fungsi agar dapat digunakan
module.exports = { 
    getAllContact,
    getContact,
    addContact,
    updateContact,
    deleteContact
}