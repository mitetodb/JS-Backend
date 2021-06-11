const { MongoClient } = require('mongodb');

const connectionStr = 'mongodb://localhost:27017';

const client = new MongoClient(connectionStr, { useUnifiedTopology: true });

client.connect((err) => {
    if (err != null) {
        console.log('Something unexpected happend!');
        return;
    }

    console.log('Database connected...');
});