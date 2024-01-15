// Mengimpor modul 'db.js' yang berisi fungsi untuk berinteraksi dengan database
const query = require("../util/db.js");

// Fungsi untuk mendapatkan semua kontak dari database
const getAllContactRepo = async () => {
    try {
        // Query untuk mengambil semua data kontak dari tabel 'contacts' yang diurutkan berdasarkan ID secara ascending
        const queryText = 'SELECT * FROM contacts ORDER BY id ASC';
        // Menjalankan query menggunakan fungsi 'query' yang diimpor dari 'db.js'
        const result = await query(queryText);
        // Mengembalikan array dari hasil query
        return result.rows;
    } catch (error) {
        // Menangani kesalahan dengan mencetak error dan mengembalikan nilai null
        console.log(error);
        return null;
    }
}

// Fungsi untuk mendapatkan detail kontak berdasarkan ID dari database
const getContactRepo = async (id) => {
    try {
        // Query untuk mengambil data kontak dengan ID tertentu dari tabel 'contacts'
        const queryText = 'SELECT * FROM contacts WHERE id = $1';
        // Menjalankan query dengan menggunakan fungsi 'query' dan menyertakan nilai ID sebagai parameter
        const result = await query(queryText, [id]);
        // Mengembalikan objek kontak yang pertama ditemukan dari hasil query
        return result.rows[0];
    } catch (error) {
        // Menangani kesalahan dengan mencetak error dan mengembalikan nilai null
        console.log(error);
        return null;
    }
}

// Fungsi untuk menambahkan kontak baru ke dalam database
const addContactRepo = async (contact) => {
    try {
        // Query untuk menambahkan data kontak ke dalam tabel 'contacts' dengan nilai yang diterima dari parameter
        const queryText = 'INSERT INTO contacts(name, phone, email, address) VALUES ($1, $2, $3, $4)';
        
        // Menyiapkan nilai yang akan digunakan dalam query berdasarkan data kontak yang diterima
        const value = [contact.name, contact.phone, contact.email, contact.address];
        
        // Menjalankan query dengan menggunakan fungsi 'query' dan menyertakan nilai-nilai yang telah disiapkan
        const result = await query(queryText, value);
        
        // Mengembalikan hasil query
        return result.rows;
    } catch (error) {
        // Menangani kesalahan dengan mencetak error dan mengembalikan nilai null
        console.log(error);
        return null;
    }
}

// Fungsi untuk memperbarui kontak dalam database berdasarkan ID
const updateContactRepo = async (contact) => {
    try {
        // Query untuk memperbarui data kontak dalam tabel 'contacts' berdasarkan ID
        const queryText = 'UPDATE contacts SET name = $1, phone = $2, email = $3, address = $4 WHERE id = $5';
        // Menyiapkan nilai yang akan digunakan dalam query berdasarkan data kontak yang diterima
        const value = [contact.name, contact.phone, contact.email, contact.address, contact.id];
        // Menjalankan query dengan menggunakan fungsi 'query' dan menyertakan nilai-nilai yang telah disiapkan
        const result = await query(queryText, value);
        // Mengembalikan hasil query
        return result.rows;
    } catch (error) {
        // Menangani kesalahan dengan mencetak error dan mengembalikan nilai null
        console.log(error);
        return null;
    }
}

// Fungsi untuk menghapus kontak dari database berdasarkan ID
const deleteContactRepo = async (id) => {
    try {
        // Query untuk menghapus data kontak dari tabel 'contacts' berdasarkan ID
        const queryText = 'DELETE FROM contacts WHERE id = $1';
        // Menjalankan query dengan menggunakan fungsi 'query' dan menyertakan nilai ID sebagai parameter
        const result = await query(queryText, [id]);
        // Mengembalikan hasil query
        return result.rows[0];
    } catch (error) {
        // Menangani kesalahan dengan mencetak error dan mengembalikan nilai null
        console.log(error);
        return null;
    }
}

// Mengekspor fungsi-fungsi tersebut agar dapat digunakan di tempat lain
module.exports = { 
    getAllContactRepo,
    getContactRepo,
    addContactRepo,
    updateContactRepo,
    deleteContactRepo
}