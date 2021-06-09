const database = require('../util/database');

module.exports = (req, res) => {
    const id = req.url.split('=')[1];
    database.deleteItem(id);

    console.log('Deleting item with id = ' + id);

    res.writeHead(301, {
        'Location': '/catalog'
    });
    res.end();
};