const mongoose = require('mongoose');

start();

async function start() {

    const connectionStr = 'mongodb://localhost:27017/test';

    const client = await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    console.log('Database connected...');

    const catSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        color: { type: String, required: true }
    });

    const Cat = mongoose.model('Cat', catSchema);

    const myCat = new Cat({
        name: 'John',
        age: 26
    });
    await myCat.save();

    const data = await Cat.find({});
    console.log(data);

}
