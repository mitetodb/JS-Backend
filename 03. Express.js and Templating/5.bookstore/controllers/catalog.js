const router = require('express').Router();

router.get('/', (req, res) => {
    //console.log(req.storage.getAll());
    const ctx = {
        books: req.storage.getAll()
    };

    res.render('catalog', ctx);
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    console.log(req.body);
    // validate fields
    // safe in storage
    res.redirect('/catalog');
});

module.exports = router;