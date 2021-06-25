module.exports = {
    createAccessory: (req, res) => {
        res.render('createAccessory', { title: 'Create New Accessory' });
    },
    postAccessory: async (req, res) => {

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
    }
};