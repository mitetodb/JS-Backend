const { Router } = require('express');

const router = Router();

router.get('/create', (req, res) => {
    res.render('createAccessory', { title: 'Create New Accessory' });
});

router.post('/create', async (req, res) => {

    const accessory = {
        "name": req.body.name,
        "description": req.body.description,
        "imageUrl": req.body.imageUrl
    };

    try {
        await req.storage.createAccessory(accessory);
    } catch (err) {
        if (err.name == 'ValidationError') {
            return res.render('/accessory/create', { title: 'Create New Accessory', error: 'All fields are required. Image URL must be a valid url.' });
        }
    }

    res.redirect('/');
});

module.exports = router;
