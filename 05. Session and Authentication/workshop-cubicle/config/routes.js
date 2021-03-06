const { post: commentPost } = require('../controllers/comments');
const { isAuth } = require('../middlewares/guards');

const productController = require('../controllers/productController');
const accessoryController = require('../controllers/accessoryController');
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

module.exports = (app) => {
    app.get('/', );

    app.use('/products', productController);
    app.use('/accessory', accessoryController);
    app.use('/auth', authController);

    app.post('/comments/:cubeId/create', isAuth(), commentPost);
    
    app.use('/', homeController);

};