const yargs = require('yargs');
const fs = require('fs');

// Mendeklarasi folder data
const dirPath = './data';
// Mendeklarasi file path JSON 
const dataPath = './data/data-yargs.json';

// Mengecek folder, jika tidak ada akan dibuat
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Mengecek file, jika tidak ada akan dibuat
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// Membaca file JSON
const readFile = () => {
    try {
        const dataTemp = fs.readFileSync(dataPath, 'utf-8');
        // Mengembalikan hasil parsing JSON
        return JSON.parse(dataTemp) || [];
    } catch (err) {
        return [];
    }
}

// Menulis ke dalam file JSON
const writeFile = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data));
}

// Menambahkan data lewat yargs
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

yargs.command({
    command: "list",
    describe: "Menampilkan nama dan nomor telepon",
    handler() {
        const existingData = readFile();
        console.log('List Data Kontak: ');
        existingData.forEach((kontak, index) => {
            console.log(`${index + 1}. Nama : ${kontak.nama}, No Telepon : ${kontak.telepon}`);
        });
    },
});

yargs.command({
    command: "detail",
    describe: "Menampilkan data berdasarkan nama yang diinputkan",
    builder: {
        nama: {
            describe: 'Nama',
            demandOption: true, // Required atau wajib diisi
            type: 'string'
        }
    },
    handler(argv) {
        const existingData = readFile();
        // console.log(argv);
        // console.log(123);
        // console.log(existingData);
        const kontak = existingData.find((c) => c.nama.toLowerCase() === argv.nama.toLowerCase());

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

yargs.parse();