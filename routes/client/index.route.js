const homeRoutes = require('./home.route');
const productRoutes = require('./product.route');
const userRoutes = require('./user.route');
const cartRoutes = require('./cart.route');
const orderRoutes = require('./order.route');
const contactRoutes = require('./contact.route');
const buyNowRoutes = require('./buy-now.route');

const authMiddleware = require('../../middlewares/client/auth.middleware');
const categoryMiddleware = require('../../middlewares/client/category.middleware');

module.exports = (app) => {
  app.use(authMiddleware.isLogin);
  app.use(categoryMiddleware.getCategory);

  app.use('/', homeRoutes);
  app.use('/products', productRoutes);
  app.use('/users', userRoutes);
  app.use('/carts', authMiddleware.requireAuth, cartRoutes);
  app.use('/orders', authMiddleware.requireAuth, orderRoutes);
  app.use('/contact', contactRoutes);
  app.use('/buy-now', authMiddleware.requireAuth, buyNowRoutes);
}