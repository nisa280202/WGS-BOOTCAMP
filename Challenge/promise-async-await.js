const fs = require('fs');
const readline = require('readline');
const validator = require('validator');

// Membuat interface untuk membaca input dari user
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let dataGlobal = null;
// Membaca file JSON yang berisi data sebelumnya
fs.readFile('./data/data-promise.json', 'utf-8', (err, dataTemp) => {
    // Parsing data JSON dan menyimpannya di variabel dataGlobal
    const data = JSON.parse(dataTemp)
    dataGlobal = data 
    if (err) throw err;
})

// Fungsi untuk mengajukan pertanyaan dan mengembalikan Promise
const questions = (ask) => {
    return new Promise((resolve, reject) => {
        rl.question(ask, (inputVariable) => {
            resolve(inputVariable);
        });
    });
};

// Fungsi async await untuk mengumpulkan data user
async function ask(){
    // Objek untuk menyimpan data user
    let userData = {};

    const nama = await questions('Nama Lengkap : ');
    userData.nama = nama;

    let telepon;
    do {
        telepon = await questions('No Telepon   : ');
        // Validasi nomor telepon dengan validator
        if (!validator.isMobilePhone(telepon, 'id-ID')) {
            userData.telepon = telepon;
            console.log('Nomor tidak valid. Masukan kembali nomor telepon');
        }
    } while (!validator.isMobilePhone(telepon, 'id-ID'));
    
    let email;
    do {
        email = await questions('Alamat Email : ');
        // Validasi alamat email dengan validator
        if (!validator.isEmail(email)) {
            userData.email = email;
            console.log('Email tidak valid. Masukan kembali alamat email');
        }
    } while (!validator.isEmail(email))
    
    console.log('Data berhasil ditambahkan!');

    // Menambahkan data user ke dalam variabel dataGlobal
    dataGlobal.push(userData);
    // Menyimpan data ke dalam file JSON
    writeFile();
    
    // Menutup interface baca input
    rl.close();
}

// Fungsi untuk menulis data ke dalam file JSON
const writeFile = () => { 
    fs.writeFileSync('./data/data-promise.json', JSON.stringify(dataGlobal))
}

// Memanggil fungsi utama untuk memulai proses pengumpulan data
ask();