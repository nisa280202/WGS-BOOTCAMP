// Import modul readline untuk berinteraksi dengan user
const readline = require('readline');

// Import modul validator untuk melakukan validasi nomor telepon dan alamat email
const validator = require('validator');

// Membuat antarmuka pembaca readline untuk input dan output
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

// Objek untuk menyimpan data user yang diinput
let userData = {};

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
            rl.close(); // Menutup antarmuka pembaca setelah mendapatkan semua informasi
            console.log('---------------------------------');
            // Menampilkan data yang telah dimasukkan user
            console.log(`Nama Lengkap : ${userData.nama}`);
            console.log(`No Telepon   : ${userData.telepon}`);
            console.log(`Alamat Email : ${userData.email}`);
        } else {
            console.log('Email yang kamu masukan salah');
            askEmail(); // Jika tidak valid, maka akan meminta input alamat email lagi
        }
    });
}

// Memanggil fungsi untuk memulai proses input
askTelepon();