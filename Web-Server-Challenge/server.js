const http = require('http');
const fs = require('fs');

// Read file json dari folder data
const readFile = (fileName) => {
    try {
        // Membaca file secara synchronous dan mengembalikan hasil parsing JSON
        const html = fs.readFileSync(fileName, 'utf-8');
        return html
    } catch (err) {
        // Menangani kesalahan dengan mencetak pesan dan mengembalikan array kosong
        console.error('Terjadi kesalahan dalam membaca file:', err.message);
    }
}

http 
    .createServer((req, res) => {
        const url = req.url;

        if (url === '/') {
            const home = readFile('./views/home.html')
            console.log(url);
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write(home);
        } else if (url === '/about') {
            const about = readFile('./views/about.html')
            console.log(url);
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write(about);
        } else if (url === '/contact') {
            const contact = readFile('./views/contact.html')
            console.log(url);
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write(contact);
        }
        res.end();
    })
        .listen(3000, () => {
            console.log('Server is listening on port 3000');
        });