const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route');
const categoryRoutes = require('./category.route');
const orderRoutes = require('./order.route');
const accountRoutes = require('./account.route');
const roleRoutes = require('./role.route');
const clientRoutes = require('./client.route');
const staffRoutes = require('./staff.route');
const contactRoutes = require('./contact.route');

const accountMiddlewares = require('../../middlewares/admin/auth.middleware');

module.exports = (app) => {
  app.use(accountMiddlewares.isLogin);

  app.use('/admin/dashboard', accountMiddlewares.authRequire, dashboardRoutes);
  app.use('/admin/products', accountMiddlewares.authRequire, productRoutes);
  app.use('/admin/categories', accountMiddlewares.authRequire, categoryRoutes);
  app.use('/admin/orders', accountMiddlewares.authRequire, orderRoutes);
  app.use('/admin/roles', accountMiddlewares.authRequire, roleRoutes);
  app.use('/admin/account', accountRoutes);
  app.use('/admin/clients', accountMiddlewares.authRequire, clientRoutes);
  app.use('/admin/staffs', accountMiddlewares.authRequire, staffRoutes);
  app.use('/admin/contacts', accountMiddlewares.authRequire, contactRoutes);
}