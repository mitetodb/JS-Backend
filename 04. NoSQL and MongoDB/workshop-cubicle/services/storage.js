const Cube = require('../models/Cube');

async function init() {
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
    const options = {};

    /* Filter cubes by query params */
    if (query.search) {
        options.name = { $regex: query.search, $options: 'i' };
    }
    
    if (query.from) {
        options.difficultyLevel = { $gte: Number(query.from) };
    }
    
    if (query.to) {
        options.difficultyLevel = options.difficultyLevel || {};
        options.difficultyLevel.$lte = Number(query.to);
    }

    let cubes = Cube.find(options).lean();

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



module.exports = {
    init,
    getAll,
    getById,
    create,
    edit
};