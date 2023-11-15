const yargs = require('yargs');
const fs = require('fs');
const { updateLocale } = require('yargs');

// Mendeklarasi path folder dan file data
const dirPath = './data';
const dataPath = './data/data-yargs.json';

// Mengecek folder, jika tidak ada akan dibuat
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Mengecek file, jika tidak ada akan dibuat
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// Fungsi untuk membaca file JSON
const readFile = () => {
    try {
        const dataTemp = fs.readFileSync(dataPath, 'utf-8');
        // Mengembalikan hasil parsing JSON
        return JSON.parse(dataTemp) || [];
    } catch (err) {
        return [];
    }
}

// Fungsi untuk menulis ke dalam file JSON
const writeFile = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data));
}

// Menambahkan data kontak lewat yargs
yargs.command({
    // Deklarasi command add untuk menambahkan data
    command: 'add',
    describe: 'Menambahkan Data Kontak',
    builder: {
        nama: {
            describe: 'Nama',
            demandOption: true, // Required atau wajib diisi
            type: 'string'
        },
        telepon: {
            describe: 'Telepon',
            demandOption: true, // Required atau wajib diisi
            type: 'string'
        },
        email: {
            describe: 'Email',
            type: 'string'
        },
        alamat: {
            describe: 'Alamat',
            type: 'string'
        },
    },
    handler(argv) {
        // Memasukkan data yang telah di inputkan kedalam objek newData
        const newData = {
            nama: argv.nama,
            telepon: argv.telepon,
            email: argv.email || '',
            alamat: argv.alamat || '',
        };

        // Membaca data yang sudah ada
        const existingData = readFile();

        // Menambahkan data baru
        existingData.push(newData);

        // Menulis kembali data ke file JSON
        writeFile(existingData);

        console.log('Data berhasil ditambahkan!', newData);
    },
});

// Menampilkan semua data kontak (nama dan nomor telepon) yang sudah diinputkan melalui yargs
yargs.command({
    // Deklarasi command list untuk menampilkan nama dan nomor telepon
    command: "list",
    describe: "Menampilkan nama dan nomor telepon",
    handler() {
        // Membaca data yang sudah ada
        const existingData = readFile();
        console.log('List Data Kontak: ');
        // Menggunakan metode forEach untuk iterasi melalui setiap elemen dalam array existingData
        existingData.forEach((kontak, index) => {
            console.log(`${index + 1}. Nama : ${kontak.nama}, No Telepon : ${kontak.telepon}`);
        });
    },
});

// Menampilkan data berdasarkan nama yang diinputkan melalui yargs
yargs.command({
    // Deklarasi command detail untuk menampilkan data berdasarkan nama
    command: "detail",
    describe: "Menampilkan data berdasarkan nama yang diinputkan",
    builder: {
        nama: {
            describe: 'Nama',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const existingData = readFile();
        // console.log(argv);
        // console.log(123);
        // console.log(existingData);

        // Mencari data kontak berdasarkan nama
        const kontak = existingData.find((k) => k.nama.toLowerCase() === argv.nama.toLowerCase());

        // Kondisi yang akan menampilkan data kontak apabila nama yang diinputkan ditemukan
        if (kontak) {
            console.log(`Nama       : ${kontak.nama}`);
            console.log(`No Telepon : ${kontak.telepon}`);
            console.log(`Email      : ${kontak.email}`);
            console.log(`Alamat     : ${kontak.alamat}`);
        } else {
            console.log(`Data dengan nama ${argv.nama} tidak ditemukan`);
        }
    },
});

// Mengupdate data kontak menggunakan yargs
yargs.command({
    // Deklarasi command update untuk mengubah data
    command: "update",
    describe: "Mengubah data kontak",
    builder: {
        nama: {
            describe: 'Nama',
            demandOption: true,
            type: 'string'
        },
        telepon: {
            describe: 'Telepon Baru',
            type: 'string'
        },
        email: {
            describe: 'Email Baru',
            type: 'string'
        },
        alamat: {
            describe: 'Alamat Baru',
            type: 'string'
        },
        namaBaru: {                 // Untuk menampung nama baru yang telah diubah
            describe: 'Nama Baru',
            type: "string"
        }
    },
    handler(argv) {
        const existingData = readFile();
        // console.log(existingData);
        // console.log(argv.alamat);

        for(let i = 0; i < existingData.length; i++) {
            // Kondisi untuk mendapatkan data dengan nama yang diinputkan
            if(existingData[i]['nama'].toLowerCase() === argv.nama.toLowerCase()) {
                if(argv.telepon !== undefined) {
                    existingData[i]['telepon'] = argv.telepon
                }
                if(argv.email !== undefined) {
                    existingData[i]['email'] = argv.email
                }
                if(argv.alamat !== undefined) {
                    existingData[i]['alamat'] = argv.alamat
                }
                if(argv.namaBaru !== undefined) {
                    existingData[i]['nama'] = argv.namaBaru
                }
            }
        }

        // Menulis kembali data yang telah di update
        writeFile(existingData);

        console.log('Data berhasil diubah!');
    },
});

// Menghapus data kontak menggunakan yargs
yargs.command({
    // Deklarasi command delete untuk menghapus data kontak
    command: "delete",
    describe: "Menghapus data kontak",
    builder: {
        nama: {
            describe: 'Nama',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const existingData = readFile();

        // Menghapus data berdasarkan nama yang diinputkan 
        for(let i = 0; i < existingData.length; i++) {
            if(existingData[i]['nama'] === argv.nama) {
                existingData.splice(i, 1);
            }
        }

        // Menulis kembali data setelah penghapusan
        writeFile(existingData);

        console.log('Data berhasil dihapus!');
    }
})

yargs.parse();