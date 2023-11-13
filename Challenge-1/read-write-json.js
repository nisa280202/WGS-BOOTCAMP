// Import modul readline untuk berinteraksi dengan user
const readline = require('readline');

// Import modul fs untuk operasi file system
const fs = require('fs');

// Import modul validator untuk melakukan validasi nomor telepon dan alamat email
const validator = require('validator');

// Membuat antarmuka pembaca readline untuk input dan output
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

// Objek untuk menyimpan data user yang diinput
let userData = {};
let dataGlobal = null;

// Membaca file data.json untuk mendapatkan data yang sudah ada
fs.readFile('./data/data.json', 'utf-8', (err, dataTemp) => {
    const data = JSON.parse(dataTemp) // Mengubah data JSON menjadi objek js
    dataGlobal = data 
    if (err) throw err;
})

// Menanyakan nama lengkap dan menyimpannya dalam objek userData
rl.question('Nama Lengkap : ', (nama) => {
    userData.nama = nama; 
    askTelepon(); // Memanggil fungsi untuk menanyakan nomor telepon
});

// Fungsi untuk menanyakan nomor telepon
function askTelepon() {
    rl.question('No Telepon   : ', (telepon) => {
        // Memeriksa apakah nomor telepon yang dimasukkan valid
        if (validator.isMobilePhone(telepon, 'id-ID')) {
            userData.telepon = telepon; // Menyimpan data no telepon kedalam objek userData
            askEmail(); // Jika valid, maka akan memanggil fungsi untuk menanyakan alamat email
        } else {
            console.log('No telepon tidak terdaftar');
            askTelepon(); // Jika tidak valid, makan akan meminta input nomor telepon lagi
        }
    });
}

// Fungsi untuk menanyakan alamat email
function askEmail() {
    rl.question('Alamat Email : ', (email) => {
        // Memeriksa apakah alamat email yang dimasukkan valid    
        if (validator.isEmail(email)) {
            userData.email = email; // Menyimpan data email kedalam objek userData
            dataGlobal.push(userData);
            writeFile(); // Menulis data ke dalam file data.json
            console.log('---------------------------------');
            console.log('Data Berhasil Ditambahkan!!');
            rl.close(); // Menutup antarmuka pembaca setelah mendapatkan semua informasi
        } else {
            console.log('Email yang kamu masukan salah');
            askEmail(); // Jika tidak valid, maka akan meminta input alamat email lagi
        }
    });
}

// Fungsi untuk menulis data ke dalam file data.json
const writeFile = () => { 
    fs.writeFileSync('./data/data.json', JSON.stringify(dataGlobal))
}

// Memanggil fungsi untuk memulai proses input
askTelepon();