const mongoose = require('mongoose');

start();

async function start() {

    const connectionStr = 'mongodb://localhost:27017/test';

    const client = await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    console.log('Database connected...');


/*     const personSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        eyesColor: {
            type: String,
            required: true,
            enum: ['brown', 'green', 'blue', 'gray', 'black']
        },
        age: { 
            type: Number, 
            min: [0, 'Age can not be negative'], 
            max: 122 
        }
    }); */

    const personSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    const letter = value.slice(0,1);
                    return letter === letter.toLocaleUpperCase();
                },
                message: 'Name must begin with caputal letter - {VALUE}'
            }
        },
        lastName: String,
        eyesColor: {
            type: String,
            required: true,
            enum: {
                values: ['brown', 'green', 'blue', 'gray', 'black'],
                message: 'Color must be one of: brown, green, blue, gray or black. {VALUE} is not supported.'
            }
        },
        age: { 
            type: Number, 
            min: [0, 'Age can not be negative'], 
            max: 122 
        }
    });

    personSchema.virtual('fullName').get(function() {
        return `${this.firstName} ${this.lastName}`;
    });

    personSchema.methods.sayHi = function() {
        console.log(`My name is ${this.firstName} and I am ${this.age} years old.`);
    };
    
    const Person = mongoose.model('Person', personSchema);
    
    const person1 = new Person({
        firstName: 'peter',
        eyesColor: 'white',
        age: 5
    });

    try {
        await person1.save();
    } catch (err) {
        console.log('Caught the error');
        console.log('>>>', err.message);
    }


    const people = await Person.find({});
    console.log(people);
}
