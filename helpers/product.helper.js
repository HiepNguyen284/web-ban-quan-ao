const Category = require('../models/category.model');

module.exports.convertAttribute = (req) => {
  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  if(req.body.featured) {
    req.body.featured = true;
  } else {
    req.body.featured = false;
  }

  try {
    req.body.sizes = req.body.sizes.map(size => {
      return {size: size, stock: req.body[`stock${size}`]};
    })
  } catch(error) {
    const size = req.body.sizes
    req.body.sizes = {size: size, stock: req.body[`stock${size}`]};
  }

  return req.body;
}

module.exports.addNewPrice = (product) => {
  const newPrice = product.price - (product.price*product.discount)/100;

  return newPrice
}

module.exports.getNameCategory = async (category_id) => {
  const category = await Category.findOne({_id: category_id});

  return category.name;
}