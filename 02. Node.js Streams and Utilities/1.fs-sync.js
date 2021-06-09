const fs = require('fs');

console.log('before');
handleFiles();
console.log('after');

function handleFiles() {
    const data = fs.readFileSync('./package.json');
    console.log(data.toString());
}