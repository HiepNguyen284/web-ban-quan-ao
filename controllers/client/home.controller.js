const Product = require('../../models/product.model');
const productHelper = require('../../helpers/product.helper');

module.exports.index = async (req, res) => {

  // Danh sách sản phẩm nổi bật
  const productsFeatured = await Product.find({deleted: false, status: 'active', featured: true}).limit(8).sort({_id: -1});

  productsFeatured.forEach(product => {
    product.newPrice = productHelper.addNewPrice(product);
  })

  // Danh sách sản phẩm mới
  const productsNew = await Product.find({deleted: false, status: 'active'}).limit(8).sort({_id: -1});

  productsNew.forEach(product => {
    product.newPrice = productHelper.addNewPrice(product);
    product.isNew = true;
  })

  res.render('client/pages/home/index.pug', {
    title: 'Trang chủ',
    productsFeatured: productsFeatured,
    productsNew: productsNew
  })
}