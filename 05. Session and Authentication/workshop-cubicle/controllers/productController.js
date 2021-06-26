const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    //console.log(req.storage);
    //console.log(req.query); /* Display search query string. */

    const cubes = await req.storage.getAll(req.query);
    const ctx = {
        title: 'Cubicle',
        cubes,
        search: req.query.search || '',
        from: req.query.from || '',
        to: req.query.to || ''
    };

    res.render('index', ctx);
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube' });
});

router.post('/create', async (req, res) => {
    //console.log(req.body);

    const cube = {
        "name": req.body.name,
        "description": req.body.description,
        "imageUrl": req.body.imageUrl,
        "difficultyLevel": Number(req.body.difficultyLevel)
    };

    try {
        await req.storage.create(cube);
    } catch (err) {
        if (err.name == 'ValidationError') {
            return res.render('create', { title: 'Create Cube', error: 'All fields are required. Image URL must be a valid url.' });
        }
    }

    res.redirect('/');
});

router.get('/details/:id', async (req, res) => {
    //console.log(req.params.id);
    const cube = await req.storage.getById(req.params.id);

    if (cube == undefined) {
        res.redirect('/404');
    } else {
        const ctx = {
            title: 'Cubicle',
            cube
        };
        res.render('details', ctx);
    }
});

router.get('/edit/:id', async (req, res) => {
    const cube = await req.storage.getById(req.params.id);
    cube[`select${cube.difficultyLevel}`] = true;

    if (cube) {
        const ctx = { 
            title: 'Edit Cube Page',
            cube
        };

        res.render('edit', ctx);
    } else {
        res.redirect('/404');
    }

});

router.post('/edit/:id', async (req, res) => {

    const cube = {
        "name": req.body.name,
        "description": req.body.description,
        "imageUrl": req.body.imageUrl,
        "difficultyLevel": Number(req.body.difficultyLevel)
    };

    try {
        await req.storage.edit(req.params.id, cube);
        res.redirect('/');
    } catch (err) {
        res.redirect('/404');
    }

});

router.get('/details/:cubeId/attach', async (req, res) => {
    const cube = await req.storage.getById(req.params.cubeId);
    const accessories = await req.storage.getAllAccessories((cube.accessories || []).map(a => a._id));
    res.render('attach', {
        title: 'Attach Accessories',
        cube,
        accessories
    });
});

router.post('/details/:cubeId/attach', async (req, res) => {
    const cubeId = req.params.cubeId;
    console.log(req.body.accessory);
    const accessoryId = req.body.accessory;

    await req.storage.attachAccessory(cubeId, accessoryId);
    
    res.redirect(`/products/details/${cubeId}`);
});

module.exports = router;