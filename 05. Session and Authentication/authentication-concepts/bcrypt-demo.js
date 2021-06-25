const bcrypt = require('bcrypt');

const saltRounds = 8;
const myPassword = 'password1';
const someOtherPassword = 'not_bacon';

/* 
// tech1: (gen salt and hash on separate function calls)
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPassword, salt, function(err, hash) {
        console.log(hash);
        //store hash in your password db
    });
});

// tech2: (auto-gen a salt and hash)
bcrypt.hash(myPassword, saltRounds, function(err, hash) {
    // store hash in your password db
});

// both techs receive same end-result.

// async/await  tech:

async function checkUser(username, password) {
    // fetch user from a db etc.

    const match = await bcrypt.compare(password, user.passwordHash);

    if(match) {
        //login
    }

    // ...
} */

/* 
function generatePass() {

    bcrypt.genSalt(saltRounds, function(err, salt) {
        console.log(salt);
        bcrypt.hash(myPassword, salt, function(err, hash) {
            console.log(hash);
        });
    });

}

function comparePass(hash) {

    bcrypt.compare(myPassword, hash, function(err, result) {
        console.log('Comparing ', myPassword, ' >>> ', result);
    });
    bcrypt.compare(someOtherPassword, hash, function(err, result) {
        console.log('Comparing ', someOtherPassword, ' >>> ', result);
    });
}

generatePass();

comparePass('$2b$10$c7ru4hwL1ztzGG.6O0.fgOmCO6pBx68cby4Ye.nR/dyeRdtI7vrbG'); */


/* async function generatePass() {

    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt);
    const hash = await bcrypt.hash(myPassword, salt);
    console.log(hash);

}

async function comparePass(hash) {

    const result1 = await bcrypt.compare(myPassword, hash);
    console.log('Comparing ', myPassword, ' >>> ', result1);
    const result2 = await bcrypt.compare(someOtherPassword, hash);
    console.log('Comparing ', someOtherPassword, ' >>> ', result2);
}

generatePass();

comparePass('$2b$10$c7ru4hwL1ztzGG.6O0.fgOmCO6pBx68cby4Ye.nR/dyeRdtI7vrbG'); */


async function generatePass() {

    const hash = await bcrypt.hash(myPassword, saltRounds);
    console.log(hash);

}

async function comparePass(hash) {

    const result1 = await bcrypt.compare(myPassword, hash);
    console.log('Comparing ', myPassword, ' >>> ', result1);
    const result2 = await bcrypt.compare(someOtherPassword, hash);
    console.log('Comparing ', someOtherPassword, ' >>> ', result2);
}

generatePass();

comparePass('$2b$10$c7ru4hwL1ztzGG.6O0.fgOmCO6pBx68cby4Ye.nR/dyeRdtI7vrbG');