const Product = require('../../models/product.model');

// Khi số lượng sản phẩm = 0 -> Không cho thêm vào giỏ hàng
module.exports.addProductInCart = async (req, res, next) => {
  const product = await Product.findOne({_id: req.body.product_id});
  for(const objectSize of product.sizes) {
    if(objectSize.size === req.body.size) {
      if(objectSize.stock === 0) {
        req.flash('error', 'Sản phẩm này đã hết');
        res.redirect('back');
        return ;
      } else if(objectSize.stock < req.body.quantity) {
        req.flash('error', 'Số lượng sản phẩm không đủ');
        res.redirect('back');
        return ;
      }
    }
  }

  next()
}

