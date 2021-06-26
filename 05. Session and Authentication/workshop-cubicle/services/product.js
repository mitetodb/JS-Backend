const Cube = require('../models/Cube');
const Comment = require('../models/Comment');
const Accessory = require('../models/Accessory');

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
    const cube = await Cube.findById(id).populate('comments').populate('accessories').lean();

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

async function createComment(cubeId, comment) {
    const cube = await Cube.findById(cubeId);
    
    
    if (!cube) {
        throw new ReferenceError('No such Id in database');
    }

    const newComment = new Comment(comment);

    await newComment.save();

    cube.comments.push(newComment);
    await cube.save();
}

async function attachAccessory(cubeId, accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    
    if (!cube || !accessory) {
        throw new ReferenceError('No such Id in database');
    }

    cube.accessories.push(accessory);
    return cube.save();
}

module.exports = {
    edit,
    getAll,
    getById,
    create,
    createComment,
    attachAccessory
};