const fs = require('fs/promises');

demo();

async function demo() {
    const files = await fs.readdir('.');
    console.log(files);
}

// create new folder:
/* async function makeDir() {
    const files = await fs.mkdir('./newDir');  // fs.rmdir (remove dir) , fs.rename('old','new'), fs.unlink (remove file).
    console.log(files);
} */