const fs = require('fs/promises');
const uniqid = require('uniqid');

const Cube = require('../models/Cube');

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
    let cubes = Cube.find({}).lean();

    /* Filter cubes by query params */
    /* if (query.search) {
        cubes = cubes.filter(c => c.name.toLowerCase().includes(query.search.toLowerCase()));
    }

    if (query.from) {
        cubes = cubes.filter(c => c.difficultyLevel >= query.from);
    }

    if (query.to) {
        cubes = cubes.filter(c => c.difficultyLevel <= query.to);
    } */

    return cubes;
}

async function getById(id) {
    const cube = await Cube.findById(id).lean();

    if (cube) {
        return cube;
    } else {
        return undefined;
    }
}

async function create(cube) {
    const record = new Cube(cube);
    await record.save();
}

async function edit(id, cube) {
    const existingCube = await Cube.findById(id);
    
    
    if (!existingCube) {
        throw new ReferenceError('No such id in DB');
    }
    
    Object.assign(existingCube, cube);
    
    return existingCube.save();
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