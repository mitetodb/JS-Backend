const mongoose = require('mongoose');
const { DB_URI, DB_OPTIONS } = require('./config');

module.exports = (app) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URI, DB_OPTIONS);
    
        const db = mongoose.connection;
    
        db.on('error', err => {
            console.error('Database error: ', err.message);
            reject(err.message);
        });
    
        db.on('open', () => {
            console.log('Database connected.');
            resolve();
        });
    });
};