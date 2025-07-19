const Product = require('../../models/product.model');

// Khi số lượng sản phẩm = 0 -> Không cho mua
module.exports.buyNowProduct = async (req, res, next) => {
  const id = req.params.id;
  const size = req.params.size;
  const quantity = req.params.quantity;

  const product = await Product.findOne({_id: id});
  for(const objectSize of product.sizes) {
    if(objectSize.size === size) {
      if(objectSize.stock === 0) {
        req.flash('error', 'Sản phẩm này đã hết');
        res.redirect('back');
        return ;
      } else if(objectSize.stock < quantity) {
        req.flash('error', 'Số lượng sản phẩm không đủ');
        res.redirect('back');
        return ;
      }
    }
  }

  next()
}

