const Product = require('../../models/product.model');
const Category = require('../../models/category.model'); 

const productHelper = require('../../helpers/product.helper');
const categoryHelper = require('../../helpers/category.helper');

module.exports.index = async (req, res) => {
  if(res.locals.role.permissions.includes('product_view')) {
    // Xử lý tìm kiếm sản phẩm
    const keyword = req.query.keyword || '';

    // Phân trang
    const currentPage = req.query.page || '1';
    const countProduct = await Product.countDocuments({deleted: false, name: {$regex: keyword, $options: 'i'}});

    var limit = req.query.limit || '10';
    if(limit === 'all') {
      limit = countProduct;
    }

    const totalPage = Math.ceil(countProduct / limit);
    const pagination = {
      currentPage: parseInt(currentPage),
      limit: parseInt(limit),
      totalPage: parseInt(totalPage)
    }

    // Lấy ra danh sách sản phẩm
    const products = await Product.find({deleted: false, name: {$regex: keyword, $options: 'i'}}).limit(limit).skip(limit * (currentPage - 1)).sort({_id: -1});
    const categories = await Category.find({deleted: false});

    for(const product of products) {
      product.nameCategory = categoryHelper.getNameCategoryParent(product.category, categories);
    }

    res.render('admin/pages/product/index.pug', {
      title: 'Trang sản phẩm',
      products: products,
      pagination: pagination
    });
  } else {
    res.send('Bạn không có quyền xem danh sách sản phẩm');
  }
}

module.exports.create = async (req, res) => {
  var categories = await Category.find({deleted: false});
  categories = categoryHelper.findCategoryChild(categories);

  res.render('admin/pages/product/create.pug', {
    title: 'Thêm mới sản phẩm',
    categories: categories
  })
}

module.exports.createProduct = async (req, res) => {
  if(res.locals.role.permissions.includes('product_create')) {
    req.body = productHelper.convertAttribute(req);

    const product = new Product(req.body);
    
    try {
      await product.save();
      req.flash('success', 'Thêm sản phẩm thành công');
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('/admin/products');
  } else {
    res.send('Bạn không có quyền thêm mới sản phẩm')
  }
}

module.exports.detail = async (req, res) => {
  if(res.locals.role.permissions.includes('product_view')) {
    const id = req.params.id;
    const product = await Product.findOne({deleted: false, _id: id});

    res.render('admin/pages/product/detail.pug', {
      title: 'Chi tiết sản phẩm',
      product: product
    })
  } else {
    res.send('Bạn không có quyền xem chi tiết sản phẩm');
  }
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({deleted: false, _id: id});
  var categories = await Category.find({deleted: false});
  categories = categoryHelper.findCategoryChild(categories);

  res.render('admin/pages/product/edit.pug', {
    title: 'Chỉnh sửa sản phẩm',
    product: product,
    categories: categories
  })
}

module.exports.editProduct = async (req, res) => {
  if(res.locals.role.permissions.includes('product_edit')) {
    const id = req.params.id;
    const product = productHelper.convertAttribute(req);

    try {
      await Product.updateOne({_id: id}, product);
      req.flash('success', 'Cập nhật sản phẩm thành công');
    } catch {
      req.flash('error', error);
    }

    res.redirect('/admin/products');
  } else {
    res.send('Bạn không có quyền sửa sản phẩm');
  }
}

module.exports.delete = async (req, res) => {
  if(res.locals.role.permissions.includes('product_delete')) {
    const id = req.params.id;

    try {
      await Product.updateOne({_id: id}, {deleted: true});
      req.flash('success', 'Đã xóa sản phẩm thành công');
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('/admin/products');
  } else {
    res.send('Bạn không có quyền xóa sản phẩm')
  }
}