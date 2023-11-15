const http = require('http');

http 
    .createServer((req, res) => {
        const url = req.url;

        if (url === '/') {
            console.log(url);
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write('HOME');
        } else if (url === '/about') {
            console.log(url);
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write('ABOUT');
        } else if (url === '/contact') {
            console.log(url);
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write('CONTACT');
        }
        res.end();
    })
        .listen(3000, () => {
            console.log('Server is listening on port 3000');
        });