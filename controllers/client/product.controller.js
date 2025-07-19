const Product = require('../../models/product.model');
const Category = require('../../models/category.model');

const productHelper = require('../../helpers/product.helper');
const categoryHelper = require('../../helpers/category.helper');

module.exports.index = async (req, res) => {
  // Xử lý lọc theo danh mục
  const category_slug = req.query.category;
  var list_category = [];
  var categories = await Category.find({deleted: false, status: 'active'});
  if(category_slug) {
    categories = categoryHelper.findCategoryChild(categories);
    let category = null;

    for (const item of categories) {

      const findChildren = (list_children) => {
        for (const children of list_children) {
          if (children.slug === category_slug) {
            category = children;
            return;
          }
          if (children.children && children.children.length > 0) {
            findChildren(children.children);
            if (category) return;
          }
        }
      };

      if (item.slug === category_slug) {
        category = item;
        break;
      }

      if (item.children && item.children.length > 0) {
        findChildren(item.children);
        if (category) break;
      }
    }

    if (category) {
      list_category.push(category.id);

      const getCategory = (list_children) => {
        for(const children of list_children) {
          list_category.push(children.id);
          if(children.children && children.children.length > 0) {
            getCategory(children.children);
          }
        }
      }
        
      if (category.children && category.children.length > 0) {
        category.children.forEach(children => {
          list_category.push(children.id);
          if(children.children && children.children.length > 0) {
            getCategory(children.children);
          }
        });
      }
    } else {
      console.warn("Category not found for slug:", category_slug);
    }
  } else {
    categories.forEach(category => {
      list_category.push(category.id);
    })
  }

  // Xử lý lọc theo giá
  var price = [];
  try {
    price = req.query.price.split('-');
  } catch(error) {
    price[0] = 0;
    price[1] = 10000000
  }

  // Xử lý tìm kiếm sản phẩm
  const keyword = req.query.keyword || '';

  // Xử lý chọn các option
  var option = req.query.option || 0;
  if(option) {
    if(option === 'sale') {
      option = 15;
    } else {
      // Lấy thông tin chi tiết các category từ list_category
      const filteredCategories = await Category.find({ _id: { $in: list_category }, gender: option });

      // Lấy lại danh sách id sau khi lọc
      list_category = filteredCategories.map(cat => cat.id);

      option = 0;
    }
  }

  // Tiêu chí sắp xếp
  var sort = {}
  const querySort = req.query.sort || '';
  if(querySort) {
    if(querySort === 'name') {
      sort = {
        name: 1
      }
    } else if(querySort === 'price-asc') {
      sort = {
        price: 1
      }
    } else if(querySort === 'price-desc') {
      sort = {
        price: -1
      }
    } else if(querySort === 'product-asc') {
      sort = {
        sold: -1
      }
    }
  }

  // Truy vấn
  const products = await Product.find({deleted: false, status: 'active', category: { $in: list_category }, price: { $gte: price[0], $lte: price[1] }, name: { $regex: keyword, $options: 'i' }, discount: { $gte: option }}).sort(sort);

  products.forEach(product => {
    product.newPrice = productHelper.addNewPrice(product);
  })

  res.render('client/pages/product/index.pug', {
    title: 'Trang sản phẩm',
    products: products
  })
}

module.exports.detail = async (req, res) => {
  const slug = req.params.slug;
  const product = await Product.findOne({deleted: false, status: 'active', slug: slug});
  product.newPrice = productHelper.addNewPrice(product);

  const sizeIndex = req.query.sizeIndex || 0;

  res.render('client/pages/product/detail.pug', {
    title: 'Chi tiết sản phẩm',
    product: product,
    sizeIndex: sizeIndex
  })
}
