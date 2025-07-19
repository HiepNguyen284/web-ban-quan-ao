const Product = require('../../models/product.model');

// Xử lý sản phẩm có số lượng không đủ hoặc đã hết hàng
module.exports.orderProducts = async (req, res, next) => {
  const cart = res.locals.cart;
  for(const productInCart of cart.products) {
    const product = await Product.findOne({_id: productInCart.product_id});
    for(const objectSize of product.sizes) {
      if(objectSize.size === productInCart.size) {
        if(objectSize.stock === 0) {
          req.flash('error', `Sản phẩm ${product.name}-${objectSize.size} đã hết hàng`);
          res.redirect('back');
          return ;
        } else if(objectSize.stock < productInCart.quantity) {
          req.flash('error', `Số lượng sản phẩm ${product.name}-${objectSize.size} chỉ còn ${objectSize.stock} cái`)
          res.redirect('back');
          return ;
        }
        break;
      }
    }
  }

  next();
}