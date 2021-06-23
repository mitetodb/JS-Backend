const mongoose = require('mongoose');
const Cat = require('./models/Cat');
const Person = require('./models/Person');

start();

async function start() {

    const connectionStr = 'mongodb://localhost:27017/test';

    const client = await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    console.log('Database connected...');

    /* const someCat = new Cat({
        name: 'fluffy',
        color: 'White',
    });

    try {
        await someCat.save();  
    } catch (err) {
        console.log('Caught the error');
        console.error('>>>', err.message);
    } */


 /* const person = new Person({
        age: -5
    });

    try {
        await person.save();
    } catch (err) {
        console.log('Caught the error');
        console.error('>>>', err.message);
    }
 */

    // ---------------------------------- read (extract data)
 /* Person.findOne({'lastName':'Petrov'});
    Person.find({}).where('age').gt(7).lt(14);
    Person.find({}).where('facultyNumber').equals('123456');
    Person.findOne({'lastName':'Kirilov'}).select('name age');  // selection of some properties
    Person.find({}).sort({ age: -1 }); // sort -1 for decending. 1 for accending order
    Person.find({}).sort({ age: -1 }).skip(10).limit(10);  // skip first 10 result and show the next 10 results. (pageSize * (page-1))

    Student.find({})
            .where('firstName').equals('gosho')
            .where('age').gt(18).lt(65)
            .sort({ age: -1 })
            .skip(10)
            .limit(10);
     */

 /* const data1 = await Cat.find({});
    console.log(data1);
    
    const data2 = await Person.find({ firstName: 'John'});
    console.log(data2);

    const data3 = await Person.find({ _id: '60d24d344b61c3334c2fd2eb'});
    console.log(data3);

    const data4 = await Person.findById('60d24d344b61c3334c2fd2eb');
    console.log(data4);

    const data5 = await Person.find({ firstName: /s/i });  // search for all names with letter s and case insensitive
    console.log(data5);

    const data6 = await Person.find({ age: { $gt: 30 }});  // age > 30 ($gt or $gte, $lt or $lte)  $lte = less then or equal
    console.log(data6); */

    // ---------------------------------- create (imput data)
    // await person.save();

    // ---------------------------------- update (modify data)
 /* Person.findById(id, callback);
    Person.findByIdAndUpdate(id, {$set: {prop: newVal}}, callback);
    Person.update({_id: id}, {$set: {prop: newVal}}, callback); // Deprecated: use:
    updateOne
    updateMany
    */

    /* await Person.findByIdAndUpdate('60d24d344b61c3334c2fd2eb', { $set: { lastName: 'Ryan', age: 31}});
    console.log(await Person.find({}));

    await Person.updateOne({ firstName: 'John' }, { $set: { lastName: 'Parker', age: 32}});
    console.log(await Person.find({})); 

    const person = await Person.findOne({ firstName: 'John', age: { $gt: 30 }});
    person.age++;
    await person.save();
    console.log(await Person.find({})); */

    // ---------------------------------- delete (remove data)
 /* Person.findByIdAndRemove(id, callback);
    Person.remove({ firstName: 'John' }); // deprecated: use
    Person.removeOne
    Person.removeMany
     */


    //console.log(await Person.countDocuments( {firstName: 'Peter'})); // -> 1


    const people = await Person.find({}).lean(false);
    console.log(people.map(p => p.fullName));
}
