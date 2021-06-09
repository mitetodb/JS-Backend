const fs = require('fs');

module.exports = (req, res) => {
    const filename = req.url.slice(8);
    const file = fs.createReadStream(`./static/${filename}`);
    let type;
    if (filename.endsWith('css')) {
        type = 'text/css'
    } else if (filename.endsWith('jpg') || filename.endsWith('jpeg')) {
        type = 'image/jpeg'
    } else if (filename.endsWith('png')) {
        type = 'image/png'
    }

    file.on('error', () => {
        console.log(`>>> Error (file "${filename}" not found)`);
        res.statusCode = 404;
        res.write('File Not Found');
        res.end();
    });

    res.writeHead(200, {
        'Content-Type': type
    });

    //file.pipe(res);
    file.on('data', data => res.write(data));
    file.on('end', () => {
        res.end();
    });
};