// Import modul readline untuk berinteraksi dengan user
const readline = require('readline');

// Membuat antarmuka pembaca readline untuk input dan output
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

// Menanyakan nama user dan menampilkannya
rl.question('Siapa Nama Kamu? ', (nama) => {
    console.log(`Nama Kamu adalah ${nama}`);

    // Menanyakan nomor telepon user dan menampilkannya
    rl.question('Berapa Nomor Telepon Kamu? ', (telepon) => {
        console.log(`Nomor Telepon Kamu adalah ${telepon}`);

        // Menanyakan alamat email user dan menampilkannya
        rl.question('Masukan alamat email kamu? ', (email) => {
            console.log(`Alamat email kamu adalah ${email}`);

            rl.close(); // Menutup antarmuka pembaca setelah selesai mendapatkan informasi
        });
    });
});