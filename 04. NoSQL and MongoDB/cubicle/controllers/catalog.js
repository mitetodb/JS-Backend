module.exports = {
    catalog: async (req, res) => {
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
    }
};