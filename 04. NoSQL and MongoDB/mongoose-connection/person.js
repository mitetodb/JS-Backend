const mongoose = require('mongoose');

start();

async function start() {

    const connectionStr = 'mongodb://localhost:27017/test';

    const client = await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    console.log('Database connected...');


    const personSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        age: Number
    });

    personSchema.virtual('fullName').get(function() {
        return `${this.firstName} ${this.lastName}`;
    });

    personSchema.methods.sayHi = function() {
        console.log(`My name is ${this.firstName} and I am ${this.age} years old.`);
    };
    
    const Person = mongoose.model('Person', personSchema);
    
    const person1 = new Person({
        firstName: 'Peter',
        lastName: 'Jackson',
        age: 34
    });
    const person2 = new Person({
        firstName: 'John',
        lastName: 'Smith',
        age: 29
    });

    await person1.save();
    await person2.save();

    const people = await Person.find({});
    console.log(people);

    people.forEach(p => p.sayHi());
    people.map(p => p.fullName).forEach(n => console.log(n));
}
