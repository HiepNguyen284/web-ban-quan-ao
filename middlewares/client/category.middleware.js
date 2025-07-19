const Category = require('../../models/category.model');
const categoryHelper = require('../../helpers/category.helper');

module.exports.getCategory = async (req, res, next) => {
  const categories = await Category.find({deleted: false});

  res.locals.categories = categoryHelper.findCategoryChild(categories);

  next();
}