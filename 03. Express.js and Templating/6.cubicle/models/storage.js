// load and parse data.json file.
// provide ability to:
// -read all entries
// -read entry by id
// -add new entry
// -get entries by search criteria.

const fs = require('fs/promises');
const uniqid = require('uniqid');

let data = {};

async function init() {
    try {
        data = JSON.parse(await fs.readFile('./models/data.json'));
    } catch (err) {
        console.error('Error reading DB.');
    }

    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create,
            edit
        };
        next();
    };
}

async function getAll(query) {
    let cubes = Object.entries(data).map(([id, val]) => Object.assign({}, { id }, val));

    /* Filter cubes by query params */
    if (query.search) {
        cubes = cubes.filter(c => c.name.toLowerCase().includes(query.search.toLowerCase()));
    }

    if (query.from) {
        cubes = cubes.filter(c => c.difficultyLevel >= query.from);
    }

    if (query.to) {
        cubes = cubes.filter(c => c.difficultyLevel <= query.to);
    }

    return cubes;
}

async function getById(id) {
    const cube = data[id];

    if (cube) {
        return Object.assign({}, { id }, cube);
    } else {
        return undefined;
    }
}

async function create(cube) {
    const id = uniqid();
    data[id] = cube;

    await persist();
}

async function edit(id, cube) {
    if (!data[id]) {
        throw new ReferenceError('No such id in DB');
    }
    
    data[id] = cube;

    await persist();
}

async function persist() {
    try {
        await fs.writeFile('./models/data.json', JSON.stringify(data, null, 2));  /* Adding ", null, 2" to have everything on new line in DB (make it more beautiful) */
        console.log('>>> Created new record.');
    } catch (err) {
        console.error('Can not save Cube in DB');
    }
}

module.exports = {
    init,
    getAll,
    getById,
    create,
    edit
};