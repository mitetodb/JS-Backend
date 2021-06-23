module.exports = {
    create: (req, res) => {
        res.render('create', { title: 'Create Cube' });
    },
    post: async (req, res) => {
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
    }
};