const Product = require('../../models/product.model');

const productHelper = require('../../helpers/product.helper');

module.exports.buyNow = async (req, res) => {
  const id = req.params.id;
  const size = req.params.size;
  const quantity = req.params.quantity;

  const product = await Product.findOne({_id: id});
  product.size = size;
  product.quantity = quantity;
  product.newPrice = productHelper.addNewPrice(product);


  res.render('client/pages/buy-now/index.pug', {
    title: 'Mua ngay',
    product: product
  })
}