const mongoose = require('mongoose');

start();

async function start() {

    const connectionStr = 'mongodb://localhost:27017';

    const client = await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    console.log('Database connected...');
}
