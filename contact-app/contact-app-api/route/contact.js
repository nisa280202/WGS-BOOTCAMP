// Mengimpor modul 'express' untuk membuat router
const express = require('express');

// Mengimpor fungsi-fungsi dari modul 'contact.js' pada handler
const { getContacts, getContact, insertContact, updateContact, deleteContact } = require('../handler/contact');

// Membuat instance dari Router
const router = express.Router();

// Menetapkan rute-rute HTTP dengan fungsi-fungsi yang telah diimpor
router.get('/', getContacts);          // Route untuk mendapatkan semua kontak
router.get('/:id', getContact);        // Route untuk mendapatkan detail kontak berdasarkan ID
router.post('/', insertContact);       // Route untuk menambahkan kontak baru
router.put('/:id', updateContact);     // Route untuk memperbarui kontak berdasarkan ID
router.delete('/:id', deleteContact);  // Route untuk menghapus kontak berdasarkan ID

// Mengekspor router agar dapat digunakan di tempat lain
module.exports = router;