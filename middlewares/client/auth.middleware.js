const User = require('../../models/user.model');
const Cart = require('../../models/cart.model');

module.exports.requireAuth = async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser;

  if(tokenUser) {
    const user = await User.findOne({deleted: false, tokenUser: tokenUser});

    if(user) {
      res.locals.user = user;
    } else {
      res.redirect('/users/login');
      return ;
    }
  } else {
    res.redirect('/users/login');
    return ;
  }

  next();
}

module.exports.isLogin = async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser;
  if(tokenUser) {
    const user = await User.findOne({deleted: false, tokenUser: tokenUser});
    if(user) {
      res.locals.user = user;
      const cart = await Cart.findOne({user_id: user.id});
      res.locals.cart = cart;
      var totalProduct = 0;
      for(const product of cart.products) {
        totalProduct += product.quantity;
      }
      res.locals.totalProduct = totalProduct;
    }
  }

  next();
}